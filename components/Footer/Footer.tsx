import Link from "next/link"

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
        <li><Link href="/products" className="hover:underline">Browse Books</Link></li>
        <li><Link href="/cart" className="hover:underline">Cart</Link></li>
        <li><Link href="/orders" className="hover:underline">Orders</Link></li>
      </ul>
    </div>

    <div>
      <h3 className="font-semibold mb-2">Help</h3>
      <ul className="text-sm space-y-1">
        <li><Link href="/seller" className="hover:underline">Become a seller</Link></li>
      </ul>
    </div>

    <div>
      <h3 className="font-semibold mb-2">Contact</h3>
      <p className="text-sm">support@vedam.in</p>
      <p className="text-sm">+91 99999 99999</p>
      <div className="flex space-x-3 mt-3">
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