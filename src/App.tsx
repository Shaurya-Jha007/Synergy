import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddUserPage from "./pages/AddUserPage";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/add-user", element: <AddUserPage /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
