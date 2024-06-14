import { TextFieldProps } from "../types";

function TextField({
  label,
  name,
  value,
  error,
  onChange,
  onBlur,
}: TextFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-white">
        {label}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          name={name}
          value={value || ""}
          onChange={onChange}
          onBlur={onBlur}
          type="text"
          placeholder={name === "costoTotalDeCompra" ? "0.00" : ""}
          className="block w-full pr-5 pl-7 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg text-neutral-600 dark:text-white bg-gray-50 dark:bg-slate-900 focus:outline-none focus:border-transparent focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700"
        />
      </div>

      {error && <p className="text-brand text-xs my-1">{error}</p>}
    </div>
  );
}

export default TextField;

