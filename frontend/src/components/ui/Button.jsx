import { motion } from 'framer-motion'

export default function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  disabled = false,
  type = 'button'
}) {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    ghost: 'hover:bg-secondary text-foreground',
    outline: 'border border-border bg-transparent hover:bg-secondary text-foreground'
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  }

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        rounded-md font-medium
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-all duration-200
        ${className}
      `}
    >
      {children}
    </motion.button>
  )
}
