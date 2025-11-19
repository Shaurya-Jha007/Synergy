import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddUserPage from "./pages/AddUserPage";
import IndividualUserPage from "./pages/IndividualUserPage";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/add-user", element: <AddUserPage /> },
  { path: "/user/:userId", element: <IndividualUserPage /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
