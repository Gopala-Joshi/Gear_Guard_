export default function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-secondary text-secondary-foreground',
    primary: 'bg-primary text-primary-foreground',
    success: 'bg-green-500/20 text-green-400 border border-green-500/30',
    warning: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
    danger: 'bg-red-500/20 text-red-400 border border-red-500/30',
    info: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
  }

  return (
    <span className={`status-badge ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
