import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddUserPage from "./pages/AddUserPage";
import IndividualUserPage from "./pages/IndividualUserPage";

//Enabled routing through react-router-dom.

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/add-user", element: <AddUserPage /> },
  { path: "/user/:userId", element: <IndividualUserPage /> },
  //Click on email in the table, to get redirected to individual user page
]);

export default function App() {
  return <RouterProvider router={router} />;
}
