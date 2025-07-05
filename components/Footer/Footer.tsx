const Footer = () => {
  return (
    <footer className="bg-amber-100 dark:bg-neutral-900 text-black dark:text-white px-6 pt-10 pb-5">
  <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
    <div>
      <h2 className="text-xl font-bold mb-3">Vedam</h2>
      <p className="text-sm">Giving stories a second life. Empowering communities through books.</p>
    </div>

    <div>
      <h3 className="font-semibold mb-2">Quick Links</h3>
      <ul className="text-sm space-y-1">
        <li><a href="/products" className="hover:underline">Browse Books</a></li>
        <li><a href="/cart" className="hover:underline">Cart</a></li>
        <li><a href="/orders" className="hover:underline">Orders</a></li>
      </ul>
    </div>

    <div>
      <h3 className="font-semibold mb-2">Help</h3>
      <ul className="text-sm space-y-1">
        <li><a href="/about" className="hover:underline">About Us</a></li>
        <li><a href="/faq" className="hover:underline">FAQ</a></li>
        <li><a href="/terms" className="hover:underline">Terms & Conditions</a></li>
      </ul>
    </div>

    <div>
      <h3 className="font-semibold mb-2">Contact</h3>
      <p className="text-sm">support@vedam.in</p>
      <p className="text-sm">+91 99999 99999</p>
      <div className="flex space-x-3 mt-3">
        {/* Icons go here (lucide or heroicons) */}
      </div>
    </div>
  </div>

  <div className="mt-8 text-center text-xs text-zinc-500">
    © {new Date().getFullYear()} Vedam. All rights reserved.
  </div>
</footer>

  )
}

export default Footer