import useFetch from "../hooks/useFetch";
import Table from "../components/Table";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

// Defined user data-type by manually typing data-type by with the help of response from api.
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

  //Manages loading state and renders a loader

  if (loading) {
    return <Loader />;
  }

  //Exception handling in case of errors.

  if (error) {
    return (
      <div className="text-center text-red-600 text-xl font-bold mt-10">
        Error: {error}
      </div>
    );
  }

  //Render's the landing page
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
