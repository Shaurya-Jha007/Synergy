// pages/HomePage.tsx or components/HomePage.tsx
import useFetch from "../hooks/useFetch";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
  };
}

export default function HomePage() {
  const {
    data: users,
    loading,
    error,
  } = useFetch<User[]>("https://jsonplaceholder.typicode.com/users");

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 text-xl font-bold mt-10">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
        Users Directory
      </h1>

      {/* Responsive Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-linear-to-r from-blue-600 to-blue-800 text-white">
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
                Phone
              </th>
              <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider hidden lg:table-cell">
                Company
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users?.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 transition duration-200 cursor-pointer"
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
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td className="py-4 px-6 text-sm text-gray-600 hidden md:table-cell">
                  {user.phone}
                </td>
                <td className="py-4 px-6 text-sm text-gray-700 hidden lg:table-cell">
                  {user.company.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View (fallback for very small screens) */}
      <div className="mt-8 sm:hidden">
        {users?.map((user) => (
          <div
            key={user.id}
            className="bg-white p-5 mb-4 rounded-lg shadow border border-gray-200"
          >
            <div className="font-bold text-lg text-gray-800">{user.name}</div>
            <div className="text-sm text-gray-600">@{user.username}</div>
            <div className="text-sm text-blue-600 mt-2">{user.email}</div>
            <div className="text-xs text-gray-500 mt-3">
              Company: {user.company.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
