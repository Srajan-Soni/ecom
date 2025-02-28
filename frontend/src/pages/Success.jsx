import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardBody, Button } from "@heroui/react";

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderDetails = location.state;

  if (!orderDetails) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">No order details available.</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <Card className="w-full max-w-lg p-6 shadow-lg">
        <CardHeader className="text-center pb-4">
          <h2 className="text-2xl font-bold text-green-600">Order Placed Successfully!</h2>
        </CardHeader>
        <CardBody>
          <h3 className="text-lg font-bold mb-2">Customer Details:</h3>
          <p><strong>Name:</strong> {orderDetails.firstName} {orderDetails.lastName}</p>
          <p><strong>Address:</strong> {orderDetails.address}</p>

          <h3 className="text-lg font-bold mt-4 mb-2">Products Ordered:</h3>
          {orderDetails.cart.map((item, index) => (
            <div key={index} className="p-2 border-b flex justify-between">
              <span>{item.name}</span>
              <span>${item.price} x {item.quantity}</span>
            </div>
          ))}

          <h3 className="text-lg font-bold mt-4">
            Total: ${orderDetails.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
          </h3>

          <Button
            className="w-full mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg"
            onPress={() => navigate("/")}
          >
            Back to Home
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default Success;
