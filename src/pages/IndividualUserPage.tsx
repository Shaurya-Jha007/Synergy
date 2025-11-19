import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";

//Defined UserDetails data-type.

interface UserDetails {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
  };
  address: {
    city: string;
    street: string;
    suite: string;
  };
}

export default function IndividualUserPage() {
  const [details, setDetails] = useState<UserDetails | null>();
  const { userId } = useParams<{ userId: string }>();
  console.log(userId);

  useEffect(() => {
    async function fetchUser(userId: string | undefined) {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );
      if (!response.ok) {
        throw new Error(
          `Unable to fetch user details! Error code : ${response.status}`
        );
      }
      const userData = await response.json();
      setDetails(userData);
    }
    fetchUser(userId);
  }, [userId]);

  //Renders UI for individual user.
  if (details) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          {/* User Card */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <div className="bg-blue-600 text-white p-6 text-center">
              <h1 className="text-3xl font-bold">{details.name}</h1>
              <p className="text-blue-100 mt-2">@{details.username}</p>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-lg font-medium text-blue-600">
                    <a href={`mailto:${details.email}`}>{details.email}</a>
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-lg font-medium">{details.phone}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Website</p>
                  <p className="text-lg font-medium text-blue-600">
                    <a
                      href={`https://${details.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {details.website}
                    </a>
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Company</p>
                  <p className="text-lg font-medium">{details.company.name}</p>
                </div>

                <div className="sm:col-span-2">
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="text-lg font-medium">
                    {details.address.suite}, {details.address.street}
                    <br />
                    {details.address.city}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4 text-center text-sm text-gray-500">
                User ID:{" "}
                <span className="font-mono font-bold">{details.id}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  //Simulates loading state.
  return <Loader />;
}
