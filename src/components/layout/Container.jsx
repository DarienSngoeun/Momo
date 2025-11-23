export function Container({ children, className = '' }) {
  return (
    <div className={`max-w-2xl mx-auto px-4 ${className}`}>
      {children}
    </div>
  );
}

