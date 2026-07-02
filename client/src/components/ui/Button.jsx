function Button({
    children,
    type = "button",
    onClick,
    disabled = false,
    className = "",
    variant = "primary",
    ...props
}) {
    const baseStyles =
        "rounded-lg px-5 py-3 font-medium transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-green-600 hover:bg-green-700 text-white",
        secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
        danger: "bg-red-600 hover:bg-red-700 text-white",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;