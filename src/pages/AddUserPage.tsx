// pages/AddUserPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddUserPage() {
  const navigate = useNavigate();

  // States for handling loading, error, success and formData.
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  //This handleSubmit funciton simulates the user's addition through a post request to the endpoint.

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("Network error");

      const newUser = await response.json();
      console.log("Simulated new user:", newUser);

      setSuccess(true);
      setTimeout(() => {
        navigate("/"); // Home navigation
      }, 1800);
    } catch (err) {
      setError(`Failed to add user. Please try again. ${err}`);
    } finally {
      setLoading(false);
    }
  };

  // UI for Adding user.
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800">Add New User</h1>
        </div>

        {success && (
          <div className="mb-6 p-5 bg-green-100 border-2 border-green-500 text-green-800 rounded-xl text-center font-semibold animate-bounce">
            User added successfully!
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Full Name..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter Username..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition"
                disabled={loading}
              />
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-300 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading} //Made the button disable after a single click
                className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold shadow-lg hover:from-blue-700 hover:to-indigo-700 transition flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    Adding...
                  </>
                ) : (
                  "Add User"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
