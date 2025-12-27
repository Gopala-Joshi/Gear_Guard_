export default function Select({ 
  label, 
  value, 
  onChange, 
  options, 
  placeholder = 'Select...', 
  required = false,
  className = '',
  disabled = false
}) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-foreground mb-1.5">
          {label} {required && <span className="text-destructive">*</span>}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className="w-full px-3 py-2 bg-background border border-input rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
