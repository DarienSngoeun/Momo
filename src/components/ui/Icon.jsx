// Simple wrapper for Lucide icons with consistent sizing
export function Icon({ icon: IconComponent, size = 24, className = '', ...props }) {
  return <IconComponent size={size} className={className} {...props} />;
}

