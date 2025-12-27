import { motion } from 'framer-motion'

export default function Card({ children, className = '', hover = false, onClick }) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.3)' } : {}}
      onClick={onClick}
      className={`
        bg-card border border-border rounded-lg
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  )
}
