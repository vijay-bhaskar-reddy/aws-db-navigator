export function Button({ children, onClick, variant = "default" }) {
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
    secondary: "bg-gray-200 text-black hover:bg-gray-300"
  };
  return (
    <button
      className={`px-4 py-2 rounded-md font-semibold ${variants[variant]} transition`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
