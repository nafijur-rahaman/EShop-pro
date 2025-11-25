import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Star, ShoppingCart, Minus, Plus, ChevronRight, Truck, ShieldCheck, RefreshCcw } from "lucide-react";
import { useAuth } from "../hook/useAuth";
import { useCart } from "../Context/CartContext";
import { useApi } from "../hook/useApi";

export default function ProductDetails() {
  const { id } = useParams(); // Get product ID from URL
  const { get } = useApi();
  const { user } = useAuth();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await get(`/products/${id}/`);
        setProduct(data);
        setSelectedImage(0);
        setSelectedColor(data.colors?.[0]?.name || "black");
        setSelectedSize(data.sizes?.[0] || "M");
      } catch (err) {
        console.error("Failed to fetch product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec" && quantity > 1) setQuantity(quantity - 1);
    if (type === "inc") setQuantity(quantity + 1);
  };

  const handleAddToCart = async () => {
    if (!user) {
      alert("Please log in first.");
      return;
    }
    try {
      await addToCart(product.id, quantity);
      alert(`Added "${product.name}" to cart!`);
    } catch (err) {
      console.error(err);
      alert("Failed to add to cart.");
    }
  };

  const handleBuyNow = () => {
    if (!user) {
      alert("Please log in first.");
      return;
    }
    // Redirect to checkout with product ID
    window.location.href = `/checkout?product=${product.id}&quantity=${quantity}`;
  };

  if (loading) return <p className="text-center mt-20">Loading product...</p>;
  if (!product) return <p className="text-center mt-20">Product not found.</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex text-sm text-gray-500 mb-8">
          <span className="hover:text-gray-900 cursor-pointer">{product.category_name}</span>
          <ChevronRight size={16} className="mx-2" />
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-start">
          {/* Left: Image gallery */}
          <div className="flex flex-col-reverse">
            {/* Thumbnails */}
            {product.images.length > 0 && (
              <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
                <div className="grid grid-cols-4 gap-6">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white hover:bg-gray-50 ${
                        selectedImage === index ? "ring-2 ring-indigo-500" : ""
                      }`}
                    >
                      <img src={img.image} alt="thumbnail" className="h-full w-full object-cover rounded-md" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Main Image */}
            <div className="w-full aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden sm:aspect-w-2 sm:aspect-h-3">
              <img
                src={product.images[selectedImage]?.image || "https://via.placeholder.com/600"}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* Right: Product info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.name}</h1>

            {/* Stock & sold info */}
            <div className="flex gap-2 mt-3">
              <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">Stock: {product.stock_unit}</span>
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">Sold: {product.sold}</span>
            </div>

            <div className="mt-6">
              <p className="text-3xl text-gray-900">₹{product.price}</p>
            </div>

            <div className="mt-6">
              <p className="text-base text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Quantity & actions */}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded-md w-max">
                <button onClick={() => handleQuantity("dec")} className="p-3 hover:bg-gray-100 rounded-l-md">
                  <Minus size={16} />
                </button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <button onClick={() => handleQuantity("inc")} className="p-3 hover:bg-gray-100 rounded-r-md">
                  <Plus size={16} />
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-2xl font-semibold shadow-md hover:shadow-xl transition-all text-sm"
              >
                Buy Now
              </button>
              <button
                onClick={handleAddToCart}
                className="flex-1 border border-gray-300 py-3 rounded-2xl font-semibold hover:bg-gray-50 transition-all text-sm"
              >
                Add to Cart
              </button>
            </div>

            {/* Features */}
            <div className="mt-10 grid grid-cols-1 gap-y-4 sm:grid-cols-3 sm:gap-x-4 border-t border-gray-200 pt-8">
              <div className="flex flex-col items-center text-center">
                <Truck className="h-6 w-6 text-gray-400 mb-2" />
                <span className="text-xs font-medium text-gray-900">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <RefreshCcw className="h-6 w-6 text-gray-400 mb-2" />
                <span className="text-xs font-medium text-gray-900">Free Returns</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <ShieldCheck className="h-6 w-6 text-gray-400 mb-2" />
                <span className="text-xs font-medium text-gray-900">2 Year Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
