export default function Input({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required = false,
  optionalLabel = false,
  icon,
  name,
  ...rest
}) {
  return (
    <div className="flex flex-col gap-space-xs">
      {label && (
        <div className="flex items-center justify-between">
          <label
            htmlFor={id}
            className="font-label-lg text-label-lg text-on-surface flex items-center gap-1"
          >
            {label}
            {required && <span className="text-error">*</span>}
          </label>
          {required && (
            <span className="font-body-sm text-body-sm text-outline">Required</span>
          )}
          {optionalLabel && !required && (
            <span className="font-body-sm text-body-sm text-outline">Optional</span>
          )}
        </div>
      )}

      <div className="relative flex items-center">
        {icon && (
          <span className="material-symbols-outlined absolute left-3 text-outline pointer-events-none text-lg">
            {icon}
          </span>
        )}
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full h-11 ${
            icon ? 'pl-10' : 'pl-space-md'
          } pr-space-md rounded-lg bg-surface-container-low text-on-surface placeholder:text-outline font-body-md text-body-md transition-all outline-none focus:bg-surface-container-lowest focus:shadow-md ${
            error ? 'ring-2 ring-error/40' : ''
          }`}
          {...rest}
        />
      </div>

      {error && (
        <p className="font-body-sm text-body-sm text-error flex items-center gap-1 mt-0.5">
          <span className="material-symbols-outlined text-[14px]">error</span>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}