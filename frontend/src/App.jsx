import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductList from "./pages/Product";
import Cart from "./pages/Cart";
import { CartProvider } from "./context/CartContext";
import Layout from "./components/Layout";
import Success from "./pages/Success";
import { ToastProvider } from "@heroui/react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <ProductList /> },
      { path: "/cart", element: <Cart /> },
      {path:"/success" , element: <Success />}
    ],
  },
]);

function App() {
  return (
      
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;
