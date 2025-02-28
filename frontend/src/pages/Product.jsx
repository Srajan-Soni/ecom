import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { Card, CardHeader, CardBody, Button, Image } from "@heroui/react";
import Toast from "../components/Toast";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setToastMessage(`${product.name} added to cart`);
    setShowToast(true);
  };

  return (
    <div className="p-6 grid grid-cols-3 gap-6">
      <Toast
        message={toastMessage}
        show={showToast}
        onClose={() => setShowToast(false)}
      />

      {products.map((product) => (
        <Card key={product.id} className="py-4 shadow-lg">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
            <img
              className="object-cover rounded-xl w-full h-auto max-w-xs sm:max-w-md md:max-w-lg aspect-[4/3]"
              src={product.image}
              alt={product.name}
            />
          </CardHeader>
          <CardBody className="overflow-visible py-2 flex flex-col items-center">
            <h4 className="font-bold text-large">{product.name}</h4>
            <p className="text-default-500">{product.description}</p>
            <p className="text-tiny uppercase font-bold text-blue-600">
              ${product.price}
            </p>
            <Button
              className="mt-4 bg-blue-500 cursor-pointer hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              onPress={() => handleAddToCart(product)}
            >
              Add to Cart
            </Button>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default ProductList;
