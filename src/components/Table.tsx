// components/Table.tsx
import type { User } from "../pages/HomePage";
import { Link } from "react-router-dom";

interface TableProps {
  users: User[];
}

export default function Table({ users }: TableProps) {
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
    //See console for the default response of deletion.
  }

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
              {/* Edit Button Column (replaces Phone) */}
              <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider hidden md:table-cell">
                Edit
              </th>
              {/* Delete Button Column (replaces Company) */}
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
                  <Link to={`/user/${user.id}`}>{user.email}</Link>
                </td>

                {/* Edit Button */}
                <td className="py-4 px-6 hidden md:table-cell">
                  <button className="bg-amber-500 hover:bg-amber-600 cursor-pointer text-white font-medium text-sm py-2 px-4 rounded-lg transition shadow-sm">
                    Edit
                  </button>
                </td>

                {/* Delete Button */}
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

      {/* Mobile View - Cards with Edit & Delete Buttons */}
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
                <div className="text-sm text-gray-600">@{user.username}</div>
                <div className="text-sm text-blue-600 mt-1">{user.email}</div>
              </div>
              <div className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                ID: {user.id}
              </div>
            </div>

            {/* Action Buttons - Mobile */}
            <div className="flex gap-3 mt-5">
              <button className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-lg transition shadow">
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
    </>
  );
}
