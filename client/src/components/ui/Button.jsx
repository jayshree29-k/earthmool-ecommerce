function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
}) {
  const baseClasses =
    "px-6 py-3 rounded-lg font-medium transition-all duration-300";

  const variants = {
    primary: "bg-green-800 text-white hover:bg-green-900",
    outline: "border border-green-800 text-green-800 hover:bg-green-800 hover:text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;