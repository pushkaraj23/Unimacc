import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  addCustomerAddress,
  fetchUserAddresses,
  editCustomerAddress,
  deleteCustomerAddress,
} from "../../api/userApi";
import { FiEdit2, FiTrash2, FiPlus, FiX } from "react-icons/fi";

const CheckoutAddresses = ({
  selectedAddress,
  setSelectedAddress,
  setIsAuthenticated,
  showTempMessage,
}) => {
  const [userid, setUserid] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    deliveredtopersonname: "",
    deliveredtopersonmobileno: "",
    addresslineone: "",
    addresslinetwo: "",
    landmark: "",
    city: "",
    state: "",
    postalcode: "",
    addresstype: "Home",
    isdefault: false,
  });

  // ✅ Load userid from localStorage
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("user"));
      if (stored?.userid) setUserid(stored.userid);
    } catch (err) {
      console.error("Failed to load user:", err);
    }
  }, []);

  // ✅ Fetch addresses
  const {
    data: addresses = [],
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userAddresses", userid],
    queryFn: () => fetchUserAddresses(userid),
    enabled: !!userid,
    onError: () => showTempMessage("❌ Failed to fetch addresses."),
    onSuccess: (data) => {
      if (data.length === 0) setFormVisible(true);
    },
  });

  // ✅ Add Address
  const addMutation = useMutation({
    mutationFn: addCustomerAddress,
    onSuccess: () => {
      showTempMessage("✅ Address added successfully!");
      setFormVisible(false);
      resetForm();
      refetch();
    },
    onError: () => showTempMessage("❌ Failed to add address."),
  });

  // ✅ Edit Address
  const editMutation = useMutation({
    mutationFn: ({ id, payload }) => editCustomerAddress(id, payload),
    onSuccess: () => {
      showTempMessage("✅ Address updated successfully!");
      setEditingAddress(null);
      setFormVisible(false);
      resetForm();
      refetch();
    },
    onError: () => showTempMessage("❌ Failed to update address."),
  });

  // ✅ Delete Address
  const deleteMutation = useMutation({
    mutationFn: deleteCustomerAddress,
    onSuccess: () => {
      showTempMessage("🗑️ Address deleted successfully!");
      refetch();
    },
    onError: () => showTempMessage("❌ Failed to delete address."),
  });

  const resetForm = () => {
    setFormData({
      deliveredtopersonname: "",
      deliveredtopersonmobileno: "",
      addresslineone: "",
      addresslinetwo: "",
      landmark: "",
      city: "",
      state: "",
      postalcode: "",
      addresstype: "Home",
      isdefault: false,
    });
  };

  // ✅ Validators
  const isValidPhone = (phone) => /^[6-9]\d{9}$/.test(phone);
  const isValidPincode = (pin) => /^[1-9]\d{5}$/.test(pin);
  const isValidName = (name) => /^[A-Za-z ]{3,}$/.test(name.trim());

  const handleSubmit = () => {
    const {
      deliveredtopersonname,
      deliveredtopersonmobileno,
      addresslineone,
      city,
      state,
      postalcode,
    } = formData;

    if (!isValidName(deliveredtopersonname))
      return showTempMessage("⚠️ Enter a valid full name");
    if (!isValidPhone(deliveredtopersonmobileno))
      return showTempMessage("⚠️ Enter valid 10-digit mobile number");
    if (!addresslineone.trim())
      return showTempMessage("⚠️ Address Line 1 cannot be empty");
    if (!city.trim()) return showTempMessage("⚠️ Enter city");
    if (!state.trim()) return showTempMessage("⚠️ Enter state");
    if (!isValidPincode(postalcode))
      return showTempMessage("⚠️ Enter valid 6-digit PIN code");

    const payload = { ...formData, userid };

    if (editingAddress) {
      editMutation.mutate({ id: editingAddress.id, payload });
    } else {
      addMutation.mutate(payload);
    }
  };

  if (!userid)
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border text-gray-500">
        Please log in to manage your addresses.
      </div>
    );

  if (isLoading)
    return (
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-gray-500">
        Loading your addresses...
      </div>
    );

  if (isError)
    return (
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-red-500">
        Failed to load addresses.
      </div>
    );

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border h-fit sticky top-5 border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-primary">Delivery Address</h2>
        {addresses.length > 0 && (
          <button
            onClick={() => {
              setEditingAddress(null);
              resetForm();
              setFormVisible(!formVisible);
            }}
            className="flex items-center gap-2 bg-theme text-white text-sm px-4 py-2 rounded-md hover:bg-theme/80"
          >
            {formVisible ? (
              <>
                <FiX className="text-base" /> Close
              </>
            ) : (
              <>
                <FiPlus className="text-base" /> Add Address
              </>
            )}
          </button>
        )}
      </div>

      {/* Existing Addresses */}
      {addresses.length === 0 ? (
        <p className="text-gray-500 text-sm mb-4">No saved addresses yet.</p>
      ) : (
        addresses.map((addr, i) => (
          <div
            key={addr.id || i}
            className={`border p-4 rounded-lg mb-3 cursor-pointer transition-all relative ${
              selectedAddress?.id === addr?.id
                ? "border-theme bg-theme/10"
                : "border-gray-200 hover:border-gray-400"
            }`}
            onClick={() => {
              setSelectedAddress(addr);
              setIsAuthenticated(true);
            }}
          >
            <div className="absolute right-3 top-3 flex gap-2 opacity-90">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingAddress(addr);
                  setFormData({ ...addr });
                  setFormVisible(true);
                }}
                className="p-1 text-gray-600 hover:text-theme"
              >
                <FiEdit2 />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (
                    window.confirm(
                      "Are you sure you want to delete this address?"
                    )
                  ) {
                    deleteMutation.mutate(addr.id);
                  }
                }}
                className="p-1 text-gray-600 hover:text-red-500"
              >
                <FiTrash2 />
              </button>
            </div>

            <p className="font-semibold text-primary">
              {addr.deliveredtopersonname}
            </p>
            <p className="text-gray-600 text-sm">
              {addr.deliveredtopersonmobileno}
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              {addr.addresslineone}, {addr.addresslinetwo}, {addr.city},{" "}
              {addr.state} - {addr.postalcode}
            </p>
            {addr.landmark && (
              <p className="text-gray-500 text-xs mt-1">
                Landmark: {addr.landmark}
              </p>
            )}
          </div>
        ))
      )}

      {/* Add/Edit Address Form */}
      {formVisible && (
        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-semibold text-primary mb-3">
            {editingAddress ? "Edit Address" : "Add New Address"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.deliveredtopersonname}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  deliveredtopersonname: e.target.value,
                })
              }
              className="border border-gray-300 text-sm rounded-md px-4 py-2"
            />
            <input
              type="text"
              placeholder="Mobile Number"
              value={formData.deliveredtopersonmobileno}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  deliveredtopersonmobileno: e.target.value,
                })
              }
              className="border border-gray-300 text-sm rounded-md px-4 py-2"
            />
          </div>

          <input
            type="text"
            placeholder="Address Line 1"
            value={formData.addresslineone}
            onChange={(e) =>
              setFormData({ ...formData, addresslineone: e.target.value })
            }
            className="border border-gray-300 text-sm rounded-md px-4 py-2 mb-2 w-full"
          />
          <input
            type="text"
            placeholder="Address Line 2"
            value={formData.addresslinetwo}
            onChange={(e) =>
              setFormData({ ...formData, addresslinetwo: e.target.value })
            }
            className="border border-gray-300 text-sm rounded-md px-4 py-2 mb-2 w-full"
          />

          <div className="grid grid-cols-2 gap-4 mb-2">
            <input
              type="text"
              placeholder="City"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              className="border border-gray-300 text-sm rounded-md px-4 py-2"
            />
            <input
              type="text"
              placeholder="State"
              value={formData.state}
              onChange={(e) =>
                setFormData({ ...formData, state: e.target.value })
              }
              className="border border-gray-300 text-sm rounded-md px-4 py-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-2">
            <input
              type="text"
              placeholder="Postal Code"
              value={formData.postalcode}
              onChange={(e) =>
                setFormData({ ...formData, postalcode: e.target.value })
              }
              className="border border-gray-300 text-sm rounded-md px-4 py-2"
            />
            <input
              type="text"
              placeholder="Landmark"
              value={formData.landmark}
              onChange={(e) =>
                setFormData({ ...formData, landmark: e.target.value })
              }
              className="border border-gray-300 text-sm rounded-md px-4 py-2"
            />
          </div>

          <div className="flex justify-end mt-3">
            <button
              onClick={handleSubmit}
              disabled={addMutation.isPending || editMutation.isPending}
              className="bg-theme text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-theme/80"
            >
              {editingAddress
                ? editMutation.isPending
                  ? "Saving..."
                  : "Save Changes"
                : addMutation.isPending
                ? "Adding..."
                : "Add Address"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutAddresses;
