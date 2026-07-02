function Button({
    children,
    type = "button",
    onClick,
    className = "",
    disabled = false,
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
                bg-green-600
                hover:bg-green-700
                text-white
                rounded-lg
                px-5
                py-3
                font-medium
                transition
                disabled:opacity-50
                ${className}
            `}
        >
            {children}
        </button>
    );
}

export default Button;