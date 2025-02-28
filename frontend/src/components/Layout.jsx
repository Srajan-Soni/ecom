import { Outlet, Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Badge, Avatar } from "@heroui/react";
import { CartIcon } from "../icons/CartIcon";

function Layout() {
  const { cart } = useContext(CartContext);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div>
      <div className="p-4 flex justify-between bg-gray-800 text-white items-center">
 
        <Link to="/">
          <h1 className="text-xl font-bold">E-Commerce</h1>
        </Link>

        <Link to="/cart" className="flex items-center">
        <div className="relative inline-block">
  <CartIcon size={30} className="" />

  {totalItems > 0 && (
    <span className="absolute -top-2 -left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
      {totalItems}
    </span>
  )}
</div>

        </Link>
      </div>

      <Outlet />
    </div>
  );
}

export default Layout;
