function Input({
    label,
    className = "",
    ...props
}) {
    return (
        <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-700">
                {label}
            </label>

            <input
                {...props}
                className={`
                    border
                    rounded-lg
                    px-4
                    py-3
                    outline-none
                    focus:ring-2
                    focus:ring-green-500
                    ${className}
                `}
            />
        </div>
    );
}
export default Input;