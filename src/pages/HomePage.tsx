import useFetch from "../hooks/useFetch";
import Table from "../components/Table";
import { Link } from "react-router-dom";

export interface User {
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
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Users Directory
        </h1>
        <Link
          to="/add-user"
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 px-8 rounded-xl shadow-xl transition transform hover:scale-105"
        >
          Add New User
        </Link>
      </div>

      <Table users={users as User[]} />
    </div>
  );
}
