
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import { cn } from "@/lib/utils";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
        document.documentElement.style.setProperty('--navbar-height', '60px');
      } else {
        setScrolled(false);
        document.documentElement.style.setProperty('--navbar-height', '76px');
      }
    };

    // Set initial navbar height
    document.documentElement.style.setProperty('--navbar-height', scrolled ? '60px' : '76px');

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  // Close mobile menu when path changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={cn(
        "fixed w-full z-50 transition-all duration-300 px-3 sm:px-4 lg:px-8",
        scrolled
          ? "py-2 sm:py-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-md"
          : "py-3 sm:py-5 bg-transparent"
      )}
      style={{
        width: '100%'
      }}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <div className="bg-white rounded-lg p-1 flex items-center justify-center">
            <img
              src="/wws logo.png"
              alt="WebZ Wave Solutions Logo"
              className="logo-small"
              loading="eager"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "px-3 lg:px-4 py-2 rounded-md font-medium text-sm transition-all hover:text-brand-purple",
                  location.pathname === item.path
                    ? "text-brand-purple font-semibold"
                    : "text-gray-700 dark:text-gray-200"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="ml-2 lg:ml-4 flex items-center space-x-2">
            <Button
              asChild
              className="bg-brand-purple hover:bg-brand-purple/90 rounded-md font-medium text-sm px-3 lg:px-4 h-9"
            >
              <Link to="/contact">Get Started</Link>
            </Button>
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 ml-2 text-gray-700 dark:text-gray-200 flex items-center justify-center"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={cn(
            "md:hidden fixed top-[calc(var(--navbar-height,60px))] left-0 right-0 bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out overflow-hidden",
            isOpen
              ? "max-h-[calc(100vh-var(--navbar-height,60px))] opacity-100 z-40"
              : "max-h-0 opacity-0 -z-10"
          )}
          style={{ width: '100%', maxWidth: '100%' }}
        >
          <div className="flex flex-col space-y-2 p-4 max-w-full">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "px-4 py-3 rounded-md font-medium transition-all hover:bg-gray-100 dark:hover:bg-gray-800 text-center sm:text-left",
                  location.pathname === item.path
                    ? "text-brand-purple bg-gray-100 dark:bg-gray-800 font-semibold"
                    : "text-gray-700 dark:text-gray-200"
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Button
              asChild
              className="bg-brand-purple hover:bg-brand-purple/90 mt-2 w-full h-11 font-medium"
            >
              <Link to="/contact" onClick={() => setIsOpen(false)}>Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
