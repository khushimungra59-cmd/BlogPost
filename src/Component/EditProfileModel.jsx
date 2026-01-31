import { useContext, useEffect, useState } from "react";
import "./EditProfileModel.css";
import { toast } from "react-toastify";
import { ModeContext } from "../Context/ModeContext";

export const EditProfileModel = ({ onClose, userId }) => {
  const [formData, setFormData] = useState({
    fullname: "",
    mobile: "",
    role: "",
    otp: "",
  });

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
         const ctx= useContext(ModeContext);
  

  // input change
  const handleChange = (field, value) => {
    setError((e) => ({ ...e, [field]: "" }));
    setFormData({ ...formData, [field]: value });
  };

  // fetch user
  useEffect(() => {
    if (userId) {
      fetchUserById();
    }
  }, [userId]);

  const fetchUserById = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://696b49ac624d7ddccaa0b2d9.mockapi.io/users/${userId}`,
      );
      const data = await res.json();

      setFormData({
        fullname: data?.name || "",
        mobile: data?.mobile || "",
        role: data?.role || "",
        otp: data?.otp || "",
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // save edit
  const handleSave = async (e) => {
    e.preventDefault();

    const newError = {};
    if (!formData.fullname.trim()) newError.fullname = "Full name required";
    if (!formData.mobile.trim()) newError.mobile = "Mobile required";
    if (!formData.role.trim()) newError.role = "Role required";
    if (!formData.otp.trim()) newError.otp = "OTP required";

    setError(newError);
    if (Object.keys(newError).length > 0) return;

    try {
      setSaving(true);

      const payload = {
        name: formData.fullname,
        mobile: formData.mobile,
      };

      const res = await fetch(
        `https://696b49ac624d7ddccaa0b2d9.mockapi.io/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (!res.ok) {
        toast.error("Update Failed ❌");
        return;
      }

      const updatedUser = await res.json();
      localStorage.setItem("lognData", JSON.stringify(updatedUser));

      toast.success("Profile updated successfully ✅");
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="edit-profile">
      <form className={`form1 ${ctx.mode}`} onSubmit={handleSave}>
        <h3 className={`title ${ctx.mode}`}>Edit Profile</h3>

        <input
          type="text"
          className="input-fielld"
          placeholder="Full Name"
          value={formData.fullname}
          onChange={(e) => handleChange("fullname", e.target.value)}
        />
        {error.fullname && <span className="error">{error.fullname}</span>}

        <input
          type="text"
          className="input-fielld"
          placeholder="Mobile No."
          maxLength={10}
          value={formData.mobile}
          onChange={(e) => handleChange("mobile", e.target.value)}
        />
        {error.mobile && <span className="error">{error.mobile}</span>}

        <select
          className="input-fielld"
          value={formData.role}
          onChange={(e) => handleChange("role", e.target.value)}
          disabled
        >
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>
        {error.role && <span className="error">{error.role}</span>}

        <input
          type="text"
          className="input-fielld"
          placeholder="Enter OTP"
          value={formData.otp}
          disabled
          onChange={(e) => handleChange("otp", e.target.value)}
        />
        {error.otp && <span className="error">{error.otp}</span>}

        <div className="button-group1">
          <button type="button" className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="save-button" disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};
