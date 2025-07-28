import Image from "next/image";
import Link from "next/link";
import SignOut from "../SignOut";
import { ModeToggle } from "../ui/darkMode";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LayoutDashboard, Package, ShoppingCart } from "lucide-react";

export default function Sidebar({
  mode,
}: {
  mode: "dashboard" | "products" | "orders";
}) {
  const navItems = [
    {
      href: "/seller",
      label: "Dashboard",
      icon: LayoutDashboard,
      active: mode === "dashboard",
    },
    {
      href: "/seller/products",
      label: "Products",
      icon: Package,
      active: mode === "products",
    },
    {
      href: "/seller/orders",
      label: "Orders",
      icon: ShoppingCart,
      active: mode === "orders",
    },
  ];

  return (
    <>
      {/* Desktop Sidebar - Fixed Position */}
      <div className="hidden md:block md:w-1/5 lg:w-[15%]">
        <div className="fixed top-0 left-0 h-screen md:w-1/5 lg:w-[15%] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-40">
          <div className="flex flex-col h-full">
            {/* Logo Section */}
            <div className="p-6 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Image
                  src={"/Logo.png"}
                  height={80}
                  width={80}
                  alt="Vedum Logo"
                  className="h-10 w-auto object-contain dark:filter dark:brightness-0 dark:invert"
                />
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group
                      ${
                        item.active
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-l-4 border-blue-600"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
                      }
                    `}
                  >
                    <Icon 
                      className={`w-5 h-5 transition-colors duration-200 ${
                        item.active 
                          ? "text-blue-600 dark:text-blue-400" 
                          : "text-gray-500 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300"
                      }`} 
                    />
                    <span className="font-medium text-sm">
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* Bottom Section */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-800 space-y-3">
              <div className="flex items-center justify-between px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Theme</span>
                <ModeToggle />
              </div>
              <SignOut />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Fixed at Top */}
      <div className="md:hidden fixed top-0 left-0 w-full p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-50">
        <Sheet>
          <SheetTrigger className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200">
            <Menu className="w-5 h-5" />
            <span className="font-medium text-sm">Menu</span>
          </SheetTrigger>
          <SheetContent 
            side="left" 
            className="w-[280px] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-0"
          >
            <div className="flex flex-col h-full">
              {/* Mobile Logo */}
              <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Image
                    src={"/Logo.png"}
                    height={80}
                    width={80}
                    alt="Vedum Logo"
                    className="h-10 w-auto object-contain dark:filter dark:brightness-0 dark:invert"
                  />
                </div>
              </div>

              {/* Mobile Navigation */}
              <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group
                        ${
                          item.active
                            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-l-4 border-blue-600"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
                        }
                      `}
                    >
                      <Icon 
                        className={`w-5 h-5 transition-colors duration-200 ${
                          item.active 
                            ? "text-blue-600 dark:text-blue-400" 
                            : "text-gray-500 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300"
                        }`} 
                      />
                      <span className="font-medium text-sm">
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </nav>

              {/* Mobile Bottom Section */}
              <div className="p-4 border-t border-gray-100 dark:border-gray-800 space-y-3">
                <div className="flex items-center justify-between px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Theme</span>
                  <ModeToggle />
                </div>
                <SignOut />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}