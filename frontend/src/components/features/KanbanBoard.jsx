import { useState } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '../../stores/useStore'
import Badge from '../ui/Badge'

const columns = [
  { id: 'New', label: 'New', color: 'bg-blue-500/20 border-blue-500/30' },
  { id: 'In Progress', label: 'In Progress', color: 'bg-yellow-500/20 border-yellow-500/30' },
  { id: 'Repaired', label: 'Repaired', color: 'bg-green-500/20 border-green-500/30' },
  { id: 'Scrap', label: 'Scrap', color: 'bg-red-500/20 border-red-500/30' }
]

export default function KanbanBoard() {
  const { requests, equipment, technicians, updateRequest, updateEquipment } = useStore()
  const [draggedItem, setDraggedItem] = useState(null)

  const handleDragStart = (request) => {
    setDraggedItem(request)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (status) => {
    if (draggedItem) {
      console.log(`Moving request ${draggedItem.id} to ${status}`)
      updateRequest(draggedItem.id, { status })
      
      // If moved to Scrap, update equipment status
      if (status === 'Scrap' && draggedItem.equipmentId) {
        const equip = equipment.find(e => e.id === draggedItem.equipmentId)
        if (equip) {
          console.log(`Scrapping equipment ${equip.id}`)
          updateEquipment(equip.id, { status: 'Scrapped' })
        }
      }
      
      setDraggedItem(null)
    }
  }

  const getStatusBadge = (status) => {
    const variants = {
      'New': 'info',
      'In Progress': 'warning',
      'Repaired': 'success',
      'Scrap': 'danger'
    }
    return variants[status] || 'default'
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {columns.map((column) => {
        const columnRequests = requests.filter(r => r.status === column.id)
        
        return (
          <div
            key={column.id}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(column.id)}
            className={`rounded-lg border ${column.color} p-4 min-h-[500px]`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">{column.label}</h3>
              <span className="text-sm text-muted-foreground">{columnRequests.length}</span>
            </div>
            
            <div className="space-y-3">
              {columnRequests.map((request) => {
                const equipmentItem = equipment.find(e => e.id === request.equipmentId)
                const tech = technicians.find(t => t.id === request.technicianId)
                
                return (
                  <motion.div
                    key={request.id}
                    draggable
                    onDragStart={() => handleDragStart(request)}
                    layout
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-card border border-border rounded-lg p-4 cursor-move hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-foreground text-sm">{request.subject}</h4>
                      <Badge variant={getStatusBadge(request.status)} className="text-xs">
                        {request.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p>
                        <span className="font-medium">Equipment:</span> {equipmentItem?.name || request.workCenter || 'N/A'}
                      </p>
                      <p>
                        <span className="font-medium">Technician:</span> {tech?.name || 'N/A'}
                      </p>
                      <p>
                        <span className="font-medium">Scheduled:</span> {request.scheduledDate}
                      </p>
                    </div>
                    
                    {request.notes && (
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                        {request.notes}
                      </p>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
