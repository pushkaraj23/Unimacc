import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { editUser } from "../../api/userApi";

const ProfileDetails = ({ user, refetch }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstname: user.firstname || "",
    lastname: user.lastname || "",
    dob: user.dob || "",
    email: user.email || "",
    mobile: user.mobile || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const mutation = useMutation({
    mutationFn: async () =>
      editUser(user.id, {
        ...formData,
        roleId: [6],
        usertypeid: 3,
      }),
    onSuccess: () => {
      alert("✅ Profile updated successfully!");
      setIsEditing(false);
      if (refetch) refetch(); // Refresh parent data
    },
    onError: (err) => {
      alert("❌ Failed to update user: " + err.message);
    },
  });

  // ✅ Helper: Format DOB as DD/MM/YYYY
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB"); // DD/MM/YYYY
  };

  return (
    <div className="bg-theme/10 rounded-2xl shadow-sm border border-theme backdrop-blur-md p-6 h-fit relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Personal Details</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm text-theme font-medium hover:underline"
          >
            ✏️ Edit
          </button>
        )}
      </div>

      {!isEditing ? (
        // ✅ Display Mode
        <div className="space-y-4">
          <div>
            <p className="text-primary/80 text-sm">Full Name</p>
            <p className="font-medium text-lg">
              {user.firstname} {user.lastname}
            </p>
          </div>
          <div>
            <p className="text-primary/80 text-sm">Email</p>
            <p className="font-medium text-lg">{user.email}</p>
          </div>
          <div>
            <p className="text-primary/80 text-sm">Phone Number</p>
            <p className="font-medium text-lg">{user.mobile}</p>
          </div>
          <div>
            <p className="text-primary/80 text-sm">Date of Birth</p>
            <p className="font-medium text-lg">{formatDate(user.dob)}</p>
          </div>
        </div>
      ) : (
        // ✅ Edit Mode
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate();
          }}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-primary/70">First Name</label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-theme"
              />
            </div>
            <div>
              <label className="text-sm text-primary/70">Last Name</label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-theme"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-primary/70">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-theme"
            />
          </div>

          <div>
            <label className="text-sm text-primary/70">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-theme"
            />
          </div>

          <div>
            <label className="text-sm text-primary/70">Mobile</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-theme"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={mutation.isPending}
              className={`px-6 py-2 rounded-md text-sm font-medium text-white ${
                mutation.isPending
                  ? "bg-theme/40 cursor-not-allowed"
                  : "bg-theme hover:bg-theme/80"
              }`}
            >
              {mutation.isPending ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-6 py-2 rounded-md text-sm font-medium text-primary border border-primary hover:bg-primary hover:text-white transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProfileDetails;
