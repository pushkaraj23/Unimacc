import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  fetchUserAddresses,
  addCustomerAddress,
  deleteCustomerAddress,
  editCustomerAddress,
} from "../../api/userApi";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";

const ProfileAddresses = ({ userid }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const initialForm = {
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
    userid: userid,
  };

  const [formData, setFormData] = useState(initialForm);

  const { data: addresses = [], refetch } = useQuery({
    queryKey: ["userAddresses", userid],
    queryFn: () => fetchUserAddresses(userid),
    enabled: !!userid,
  });

  const addMutation = useMutation({
    mutationFn: (payload) => addCustomerAddress(payload),
    onSuccess: () => {
      alert("✅ Address added successfully!");
      setShowModal(false);
      refetch();
    },
    onError: (err) => alert("❌ Failed to add address: " + err.message),
  });

  const editMutation = useMutation({
    mutationFn: ({ id, payload }) => editCustomerAddress(id, payload),
    onSuccess: () => {
      alert("✅ Address updated successfully!");
      setShowModal(false);
      setEditingAddress(null);
      refetch();
    },
    onError: (err) => alert("❌ Failed to update address: " + err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteCustomerAddress(id),
    onSuccess: () => {
      alert("🗑️ Address deleted!");
      refetch();
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAdd = () => {
    setEditingAddress(null);
    setFormData(initialForm);
    setShowModal(true);
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    setFormData({ ...address, userid });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingAddress) {
      editMutation.mutate({ id: editingAddress.id, payload: formData });
    } else {
      addMutation.mutate(formData);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 relative">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Saved Addresses</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-theme text-white text-sm px-4 py-2 rounded-md shadow hover:bg-theme/80 transition-all"
        >
          <FiPlus className="text-white" size={16} /> Add Address
        </button>
      </div>

      {/* ADDRESS LIST */}
      {addresses.length === 0 ? (
        <p className="text-gray-500">No addresses added yet.</p>
      ) : (
        <div className="space-y-4">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className="p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex justify-between items-start bg-primary/5"
            >
              <div className="text-gray-800">
                <p className="font-semibold text-base">{addr.addresslineone}</p>
                <p className="text-sm text-gray-600">
                  {addr.addresslinetwo && `${addr.addresslinetwo}, `}
                  {addr.city}, {addr.state} - {addr.postalcode}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  📍 {addr.landmark || "-"} | {addr.addresstype}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  👤 {addr.deliveredtopersonname} (
                  {addr.deliveredtopersonmobileno})
                </p>
                {addr.isdefault && (
                  <span className="inline-block mt-2 px-2 py-1 text-xs rounded bg-theme/10 text-theme font-medium">
                    Default
                  </span>
                )}
              </div>

              {/* ICON BUTTONS */}
              <div className="flex flex-col gap-3 items-end">
                <button
                  onClick={() => handleEdit(addr)}
                  className="text-gray-500 hover:text-theme transition-all"
                  title="Edit Address"
                >
                  <FiEdit2 size={18} />
                </button>
                <button
                  onClick={() => deleteMutation.mutate(addr.id)}
                  className="text-gray-400 hover:text-red-500 transition-all"
                  title="Delete Address"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white w-[90%] sm:w-[600px] rounded-2xl shadow-lg p-6 relative animate-fadeIn">
            {/* CLOSE BUTTON */}
            <button
              onClick={() => {
                setShowModal(false);
                setEditingAddress(null);
              }}
              className="absolute top-3 right-4 text-gray-400 text-xl hover:text-primary"
            >
              ×
            </button>

            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              {editingAddress ? "Edit Address" : "Add New Address"}
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  name="deliveredtopersonname"
                  value={formData.deliveredtopersonname}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-theme focus:border-theme"
                />
                <input
                  type="text"
                  name="deliveredtopersonmobileno"
                  value={formData.deliveredtopersonmobileno}
                  onChange={handleChange}
                  placeholder="Mobile Number"
                  required
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-theme focus:border-theme"
                />
              </div>

              <input
                type="text"
                name="addresslineone"
                value={formData.addresslineone}
                onChange={handleChange}
                placeholder="Address Line 1"
                required
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-theme focus:border-theme"
              />
              <input
                type="text"
                name="addresslinetwo"
                value={formData.addresslinetwo}
                onChange={handleChange}
                placeholder="Address Line 2"
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-theme focus:border-theme"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleChange}
                  placeholder="Landmark"
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-theme focus:border-theme"
                />
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  required
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-theme focus:border-theme"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                  required
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-theme focus:border-theme"
                />
                <input
                  type="text"
                  name="postalcode"
                  value={formData.postalcode}
                  onChange={handleChange}
                  placeholder="Postal Code"
                  required
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-theme focus:border-theme"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <select
                  name="addresstype"
                  value={formData.addresstype}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-theme focus:border-theme"
                >
                  <option value="Home">Home</option>
                  <option value="Work">Work</option>
                  <option value="Other">Other</option>
                </select>

                <label className="flex items-center gap-2 text-sm text-primary">
                  <input
                    type="checkbox"
                    name="isdefault"
                    checked={formData.isdefault}
                    onChange={handleChange}
                    className="accent-theme"
                  />
                  Set as default
                </label>
              </div>

              <div className="flex justify-end gap-3 mt-5">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingAddress(null);
                  }}
                  className="px-5 py-2 text-sm rounded-md border border-primary text-primary hover:bg-primary hover:text-white transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addMutation.isPending || editMutation.isPending}
                  className="px-6 py-2 text-sm rounded-md bg-theme text-white hover:bg-theme/80 transition-all"
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
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileAddresses;
