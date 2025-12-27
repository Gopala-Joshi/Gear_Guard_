import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, Building2, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useStore } from "../../stores/useStore";

const navLinks = [
  { path: "/dashboard", label: "Dashboard" },
  {
    label: "Teams",
    dropdown: [
      { path: "/teams", label: "Teams" },
      { path: "/technicians", label: "Technicians" },
    ],
  },
  {
    label: "Equipment",
    dropdown: [
      { path: "/equipment", label: "Equipment" },
      { path: "/categories", label: "Categories" },
      { path: "/workcenters", label: "Work Centers" },
    ],
  },
  { path: "/requests", label: "Requests" },
  { path: "/calendar", label: "Calendar" },
  { path: "/reports", label: "Reports" },
];

function NavDropdown({ label, items, currentPath }) {
  const [open, setOpen] = useState(false);

  const active = items.some(
    (i) => currentPath === i.path || currentPath.startsWith(i.path + "/")
  );

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className={`px-3 py-1.5 text-sm rounded-md flex items-center gap-1 transition 
        ${active ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"}`}
      >
        {label}
        <ChevronDown
          className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-1 bg-white border border-slate-200 rounded-md shadow-lg min-w-[180px] z-50"
          >
            {items.map((item) => {
              const isActive =
                currentPath === item.path ||
                currentPath.startsWith(item.path + "/");
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-4 py-2 text-sm transition
                  ${
                    isActive
                      ? "bg-slate-100 text-slate-900 font-medium"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, company, logout } = useStore();

  return (
    <motion.header
      initial={{ y: -40 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200"
    >
      <div className="h-14 max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-slate-900 text-white flex items-center justify-center font-semibold text-sm">
            GG
          </div>
          <span className="font-semibold text-slate-900 tracking-tight">
            GearGuardPro
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          {navLinks.map((link) =>
            link.dropdown ? (
              <NavDropdown
                key={link.label}
                label={link.label}
                items={link.dropdown}
                currentPath={location.pathname}
              />
            ) : (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-1.5 text-sm rounded-md transition
                ${
                  location.pathname === link.path ||
                  location.pathname.startsWith(link.path + "/")
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* User / Company */}
        <div className="flex items-center gap-4 text-sm">
          {company && (
            <div className="flex items-center gap-1 text-slate-500 max-w-[160px] truncate">
              <Building2 className="w-4 h-4" />
              {/* {company.name} */}
            </div>
          )}

          <div className="h-5 w-px bg-slate-200" />

          <div className="flex items-center gap-2">
            <span className="text-slate-600 max-w-[140px] truncate">
              {user?.email}
            </span>
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="p-1.5 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
