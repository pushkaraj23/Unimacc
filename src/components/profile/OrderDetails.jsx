import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchOrder } from "../../api/userApi";
import { FaArrowLeft } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: order,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orderDetails", id],
    queryFn: () => fetchOrder(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="p-10">
        <p className="text-gray-500">Loading order details...</p>
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="p-10">
        <p className="text-red-500">Failed to load order details.</p>
      </div>
    );
  }

  return (
    <div className="pt-28 p-10 max-sm:pt-24 max-sm:px-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-primary mb-4 hover:text-theme transition"
      >
        <FaArrowLeft className="text-lg" />
        <span className="font-medium">Back to Orders</span>
      </button>

      <div className="flex max-sm:flex-col mb-3 max-sm:gap-3 justify-between">
        <h1 className="text-3xl font-semibold">Order Details • #{order.id}</h1>
        <button
          onClick={() => generateInvoice(order)}
          className="bg-primary text-white px-5 w-fit py-3 rounded-lg text-sm font-medium hover:bg-primary/80 mb-4"
        >
          Download Invoice
        </button>
      </div>

      {/* Order Summary */}
      <div className="grid grid-cols-2 gap-4 mb-6 bg-white p-6 rounded-xl shadow-sm border">
        <div>
          <p className="text-gray-500 text-sm">Order Date</p>
          <p className="font-medium">
            {new Date(order.orderdate).toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Payment Status</p>
          <p className="font-medium text-theme">{order.paymentstatus}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Delivery Address</p>
          <p className="font-medium">{order.deliveryaddress}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Amount Paid</p>
          <p className="font-medium text-primary">₹{order.payableamount}</p>
        </div>
      </div>

      {/* Order Items */}
      <h3 className="text-xl font-semibold mb-3 text-theme">Items</h3>
      <div className="bg-white p-5 rounded-xl shadow-sm border space-y-4">
        {order.items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b pb-3 last:pb-0 last:border-none"
          >
            <div className="flex items-center gap-4">
              {item.color && (
                <img
                  src={item.color}
                  alt={item.productname}
                  className="w-14 h-14 rounded-lg border object-cover"
                />
              )}
              <div>
                <p className="font-medium">{item.productname}</p>
                <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
              </div>
            </div>

            <p className="font-semibold text-primary">
              ₹{Number(item.totalprice).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Payment Details */}
      <h3 className="text-xl font-semibold mt-8 mb-3 text-theme">
        Payment Details
      </h3>

      <div className="bg-white p-6 rounded-xl shadow-sm border space-y-2">
        {order.payments.map((pay) => (
          <div key={pay.id} className="p-3 border rounded-lg bg-theme/5">
            <p className="text-sm">Method: {pay.paymentmethod}</p>
            <p className="text-sm">Amount: ₹{pay.amount}</p>
            <p className="text-sm">Status: {pay.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetails;

const LOGO_URL = "https://unimacc.com/logo.svg";
const COLORS = {
  theme: "#ef790b",
  primary: "#263243",
  mute: "#e8e4de",
};

export const generateInvoice = async (order) => {
  const doc = new jsPDF("p", "pt", "a4");

  // ============================================================
  // 1️⃣ LOAD SVG LOGO
  // ============================================================
  try {
    const svgData = await fetch(LOGO_URL).then((r) => r.text());
    const svgBase64 = "data:image/svg+xml;base64," + btoa(svgData);
    doc.addImage(svgBase64, "SVG", 40, 30, 140, 55);
  } catch (err) {
    console.log("SVG Logo failed:", err);
  }

  // ============================================================
  // 2️⃣ HEADER — BRAND COLORS
  // ============================================================
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(COLORS.primary);
  doc.text("TAX INVOICE", 40, 115);

  // Company Info — UNIMACC
  doc.setFont("Helvetica", "normal");
  doc.setFontSize(11);
  doc.text("UNIMACC", 40, 145);
  doc.text("Pune, Maharashtra", 40, 160);
  doc.text("Email: support@unimacc.in", 40, 175);
  doc.text("Phone: +91 8624991341", 40, 190);

  // Invoice meta section on right
  doc.setTextColor(COLORS.primary);
  doc.text(`Invoice No: INV-${order.id}`, 350, 145);
  doc.text(
    `Order Date: ${new Date(order.orderdate).toLocaleDateString()}`,
    350,
    160
  );
  doc.text(`Payment Status: ${order.paymentstatus}`, 350, 175);

  if (order.tracking_id)
    doc.text(`Tracking ID: ${order.tracking_id}`, 350, 190);

  // ============================================================
  // 3️⃣ BILLING DETAILS (primary color title)
  // ============================================================
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(COLORS.primary);
  doc.text("Billing Details", 40, 230);

  // Details
  doc.setFontSize(11);
  doc.setFont("Helvetica", "normal");
  doc.setTextColor("#000");
  doc.text(order.customername || "-", 40, 250);
  doc.text(order.deliveryaddress || "-", 40, 265);
  doc.text(`Mobile: ${order.mobile}`, 40, 280);

  // ============================================================
  // 4️⃣ ITEMS TABLE
  // ============================================================
  const itemsBody = order.items.map((item) => [
    item.productname,
    item.quantity,
    `${Number(item.price).toLocaleString()} INR.`,
    `${Number(item.totalprice).toLocaleString()} INR.`,
  ]);

  autoTable(doc, {
    startY: 310,
    head: [["Item", "Qty", "Price", "Total"]],
    body: itemsBody,
    theme: "grid",
    headStyles: {
      fillColor: COLORS.primary,
      textColor: "#fff",
      fontSize: 12,
      halign: "center",
    },
    styles: { font: "Helvetica", fontSize: 11 },
    columnStyles: {
      0: { cellWidth: 230 },
      1: { halign: "center" },
      2: { halign: "right" },
      3: { halign: "right" },
    },
  });

  // ============================================================
  // 5️⃣ TOTAL SUMMARY BOX — BRAND COLORS
  // ============================================================
  const y = doc.lastAutoTable.finalY + 30;

  // Light gray box
  doc.setDrawColor(COLORS.primary);
  doc.setFillColor(COLORS.mute);
  doc.roundedRect(300, y, 250, 150, 8, 8, "FD");

  let lineY = y + 30;

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(COLORS.primary);

  doc.text("Subtotal:", 320, lineY);
  doc.text(`${order.totalamount} INR.`, 530, lineY, { align: "right" });

  lineY += 25;

  doc.text("Discount:", 320, lineY);
  doc.text(`${order.discountamount} INR.`, 530, lineY, { align: "right" });

  lineY += 25;

  doc.text("Delivery Fee:", 320, lineY);
  doc.text(`${order.deliveryfee} INR.`, 530, lineY, { align: "right" });

  // GRAND TOTAL
  lineY += 35;

  doc.setFont("Helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(COLORS.theme);
  doc.text("Grand Total:", 320, lineY);
  doc.text(`${order.payableamount} INR.`, 530, lineY, { align: "right" });

  // ============================================================
  // 6️⃣ FOOTER
  // ============================================================
  doc.setFont("Helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor("#555");
  doc.text(
    "Thank you for choosing UNIMACC. We deliver premium bathroom fittings with trust.",
    40,
    820
  );

  // ============================================================
  // 7️⃣ DOWNLOAD PDF
  // ============================================================
  doc.save(`Invoice_${order.id}.pdf`);
};
