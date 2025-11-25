export default function Footer() {
  return (
    <footer className="bg-white border-t py-10 mt-10">
      <div className="max-w-7xl mx-auto px-4">

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Logo & About */}
          <div>
            <h2 className="text-2xl font-bold">EshopPro</h2>
            <p className="text-gray-600 mt-3">
              Your trusted marketplace for quality products at the best prices.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="hover:text-black">Home</li>
              <li className="hover:text-black">Categories</li>
              <li className="hover:text-black">About Us</li>
              <li className="hover:text-black">Contact</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="hover:text-black">FAQs</li>
              <li className="hover:text-black">Privacy Policy</li>
              <li className="hover:text-black">Terms & Conditions</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-3">Follow Us</h3>
            <div className="flex gap-4 text-2xl">
              <span className="cursor-pointer hover:scale-110">👍</span>
              <span className="cursor-pointer hover:scale-110">🐦</span>
              <span className="cursor-pointer hover:scale-110">📸</span>
            </div>
          </div>

        </div>

        {/* Bottom Text */}
        <div className="text-center text-gray-500 mt-10 pt-5 border-t">
          © {new Date().getFullYear()} EshopPro — All rights reserved.
        </div>

      </div>
    </footer>
  );
}
