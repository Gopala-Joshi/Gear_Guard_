import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../stores/useStore'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'

export default function Calendar() {
  const navigate = useNavigate()
  const { requests, equipment, technicians } = useStore()
  const [currentDate, setCurrentDate] = useState(new Date())

  const getWeekDates = () => {
    const week = []
    const startOfWeek = new Date(currentDate)
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      week.push(date)
    }
    return week
  }

  const previousWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() - 7)
    setCurrentDate(newDate)
  }

  const nextWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() + 7)
    setCurrentDate(newDate)
  }

  const formatDate = (date) => {
    return date.toISOString().split('T')[0]
  }

  const getRequestsForDate = (date) => {
    const dateStr = formatDate(date)
    return requests.filter(r => r.scheduledDate === dateStr)
  }

  const weekDates = getWeekDates()
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

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
    <div className="min-h-screen p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-foreground">Maintenance Calendar</h1>
        <p className="text-muted-foreground mt-1">Schedule and track preventive maintenance</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={previousWeek}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                Today
              </Button>
              <Button variant="outline" size="sm" onClick={nextWeek}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-4">
            {weekDates.map((date, index) => {
              const dayRequests = getRequestsForDate(date)
              const isToday = formatDate(new Date()) === formatDate(date)
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`
                    p-4 rounded-lg border min-h-[200px]
                    ${isToday ? 'border-primary bg-primary/5' : 'border-border bg-secondary/20'}
                  `}
                >
                  <div className="mb-3">
                    <p className="text-xs text-muted-foreground">{days[date.getDay()]}</p>
                    <p className={`text-lg font-semibold ${isToday ? 'text-primary' : 'text-foreground'}`}>
                      {date.getDate()}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    {dayRequests.map(request => {
                      const equipmentItem = equipment.find(e => e.id === request.equipmentId)
                      const tech = technicians.find(t => t.id === request.technicianId)
                      
                      return (
                        <div
                          key={request.id}
                          className="p-2 bg-card border border-border rounded text-xs cursor-pointer hover:border-primary transition-colors"
                          onClick={() => navigate('/requests')}
                        >
                          <p className="font-medium text-foreground mb-1 line-clamp-2">
                            {request.subject}
                          </p>
                          <p className="text-muted-foreground text-xs mb-1">
                            {equipmentItem?.name || request.workCenter}
                          </p>
                          <Badge variant={getStatusBadge(request.status)} className="text-xs">
                            {request.status}
                          </Badge>
                        </div>
                      )
                    })}
                    
                    <button
                      onClick={() => navigate('/requests/new')}
                      className="w-full p-2 border border-dashed border-border rounded hover:border-primary hover:bg-primary/5 transition-colors flex items-center justify-center gap-1 text-muted-foreground hover:text-primary"
                    >
                      <Plus className="w-3 h-3" />
                      <span className="text-xs">Add</span>
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
