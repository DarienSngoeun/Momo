import { NavLink } from "react-router-dom";
import { Home, CheckSquare, Calendar, Palette, Settings } from "lucide-react";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/tasks", icon: CheckSquare, label: "Tasks" },
  { to: "/calendar", icon: Calendar, label: "Calendar" },
  { to: "/customize", icon: Palette, label: "Customize" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

export function BottomNav() {
  return (
    <nav className="sticky bottom-0 bg-white border-t border-gray-200 shadow-lg z-40 mt-auto">
      <div className="flex justify-around items-center h-16 px-4">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center justify-center min-w-[44px] min-h-[44px] p-3 rounded-xl transition-colors ${
                isActive
                  ? "text-accent-warm bg-accent-warm bg-opacity-10"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`
            }
            aria-label={label}
          >
            {({ isActive }) => (
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
