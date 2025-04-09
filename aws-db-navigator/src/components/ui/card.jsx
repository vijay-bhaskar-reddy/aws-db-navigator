export function Card({ children, ...props }) {
  return (
    <div className="bg-white border rounded-xl shadow-sm hover:shadow-md transition" {...props}>
      {children}
    </div>
  );
}

export function CardContent({ children, className }) {
  return (
    <div className={`p-4 ${className}`}>{children}</div>
  );
}
