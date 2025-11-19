// components/Table.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import type { User } from "../pages/HomePage";

interface TableProps {
  users: User[];
}

export default function Table({ users }: TableProps) {
  //This handle delete simulates user deletion.
  async function handleDelete(id: number) {
    const deleteResponse = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      {
        method: "DELETE",
      }
    );
    if (!deleteResponse.ok) {
      throw new Error("Something went wrong! User wasn't deleted.");
    }
    const responseData = await deleteResponse.json();
    console.log("Deleted user :", responseData);
  }

  //This handleUpdate fuction simulates user data updation.

  async function handleUpdate(
    id: number,
    name: string,
    username: string,
    email: string
  ) {
    try {
      const updateResponse = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, name, username, email }),
        }
      );

      if (!updateResponse.ok) {
        throw new Error(
          `${updateResponse.status}, ${updateResponse.statusText}`
        );
      }

      const updatedData = await updateResponse.json();
      console.log(updatedData);
    } catch (e) {
      console.error(e);
    }
  }

  //The two are the modal states, controlling visibility of modal and the selectedUser

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const openModal = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <>
      {/* Desktop & Tablet Table */}
      <div className="hidden sm:block overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <tr>
              <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                ID
              </th>
              <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                Name
              </th>
              <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider hidden sm:table-cell">
                Username
              </th>
              <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                Email
              </th>
              <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider hidden md:table-cell">
                Edit
              </th>
              <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider hidden lg:table-cell">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users?.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 transition duration-200"
              >
                <td className="py-4 px-6 text-sm font-medium text-gray-900">
                  {user.id}
                </td>
                <td className="py-4 px-6 text-sm font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="py-4 px-6 text-sm text-gray-600 hidden sm:table-cell">
                  {user.username}
                </td>
                <td className="py-4 px-6 text-sm text-blue-600 underline">
                  <Link to={`/user/${user.id}`}>{user.email}</Link>{" "}
                  {/* Click on email, to be redirected to individual user page */}
                </td>

                {/* Edit Button */}
                <td className="py-4 px-6 hidden md:table-cell">
                  <button
                    onClick={() => openModal(user)}
                    className="bg-amber-500 hover:bg-amber-600 cursor-pointer text-white font-medium text-sm py-2 px-4 rounded-lg transition shadow-sm"
                  >
                    Edit
                  </button>
                </td>

                {/* Delete Button - Your original function preserved */}
                <td className="py-4 px-6 hidden lg:table-cell">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 hover:bg-red-600 cursor-pointer text-white font-medium text-sm py-2 px-4 rounded-lg transition shadow-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View in the form of cards instead of table */}
      <div className="block mt-8 sm:hidden space-y-5">
        {users?.map((user) => (
          <div
            key={user.id}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="font-bold text-lg text-gray-800">
                  {user.name}
                </div>
                <div className="text-sm text-gray-600">{user.username}</div>
                <div className="text-sm text-blue-600 mt-1">
                  <Link to={`/user/${user.id}`}>{user.email}</Link>
                </div>
              </div>
              <div className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                ID: {user.id}
              </div>
            </div>

            {/* Action buttons for mobile */}
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => openModal(user)}
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-lg transition shadow"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition shadow"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal UI */}
      {isModalOpen && selectedUser && (
        <form
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-screen overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl">
              <h2 className="text-2xl font-bold">Edit User</h2>
              <p className="text-blue-100">ID: {selectedUser.id}</p>
            </div>

            {/* Form - Pre-filled, read-only for now */}
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  defaultValue={selectedUser.name}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  defaultValue={selectedUser.username}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue={selectedUser.email}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 font-medium transition"
                >
                  Cancel
                </button>
                {/* handleUpdate funciton gets used up on the Save Changes button below */}
                <button
                  onClick={() =>
                    handleUpdate(
                      selectedUser.id,
                      selectedUser.name,
                      selectedUser.username,
                      selectedUser.email
                    )
                  }
                  type="button"
                  className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow transition"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
