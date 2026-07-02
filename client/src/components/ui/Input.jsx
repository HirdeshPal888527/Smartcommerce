function Input({
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    name,
}) {
    return (
        <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-700">
                {label}
            </label>

            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
        </div>
    );
}

export default Input;