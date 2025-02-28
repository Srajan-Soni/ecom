import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { Input, Button, Card, CardHeader, CardBody } from "@heroui/react";

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);
  const [form, setForm] = useState({ firstName: "", lastName: "", address: "" });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const placeOrder = () => {
    if (!form.firstName || !form.lastName || !form.address) {
      alert("All fields are required.");
      return;
    }

    const orderDetails = { ...form, cart };

    axios.post("http://localhost:5000/api/order", orderDetails)
      .then(() => {
        setCart([]); 
        navigate("/success", { state: orderDetails }); 
      })
      .catch((err) => alert("Error placing order",err));
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <Card className="w-full max-w-4xl p-6 shadow-lg flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2">
          <CardHeader className="pb-4">
            <h2 className="text-2xl font-bold">Your Cart</h2>
          </CardHeader>
          <CardBody>
            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              <>
                {cart.map((item) => (
                  <div key={item.id} className="p-2 border-b flex justify-between items-center">
                    <span>{item.name}</span>
                    <span>${item.price} x {item.quantity}</span>
                    <Button
                      className="bg-red-500 hover:bg-red-400 cursor-pointer text-white px-2 py-1 rounded-lg ml-4"
                      onPress={() => removeFromCart(item.id)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <h3 className="text-lg font-bold mt-4">
                  Total: ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
                </h3>
              </>
            )}
          </CardBody>
        </div>

        <div className="w-full md:w-1/2">
          <CardHeader className="pb-4">
            <h2 className="text-2xl font-bold">Shipping Details</h2>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input label="First Name" name="firstName" type="text" placeholder="Enter your first name" onChange={handleInputChange} />
            <Input label="Last Name" name="lastName" type="text" placeholder="Enter your last name" onChange={handleInputChange} />
            <Input label="Address" name="address" type="text" placeholder="Enter your address" onChange={handleInputChange} />

            <Button
              className="w-full mt-4 bg-green-500 hover:bg-green-800 cursor-pointer text-white px-4 py-2 rounded-lg"
              onPress={placeOrder}
              disabled={cart.length === 0}
            >
              Place Order
            </Button>
          </CardBody>
        </div>
      </Card>
    </div>
  );
};

export default Cart;
