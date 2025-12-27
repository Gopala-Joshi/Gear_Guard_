export default function Textarea({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  rows = 4,
  required = false,
  className = ''
}) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-foreground mb-1.5">
          {label} {required && <span className="text-destructive">*</span>}
        </label>
      )}
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
        className="w-full px-3 py-2 bg-background border border-input rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
      />
    </div>
  )
}
