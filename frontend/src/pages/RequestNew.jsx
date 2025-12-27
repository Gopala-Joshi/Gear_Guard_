import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, Save } from 'lucide-react'
import { useStore } from '../stores/useStore'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Select from '../components/ui/Select'
import Textarea from '../components/ui/Textarea'

export default function RequestNew() {
  const navigate = useNavigate()
  const location = useLocation()
  const { 
    equipment, 
    categories, 
    teams, 
    technicians, 
    workCenters,
    addRequest,
    getEquipmentById,
    getTechniciansByTeam
  } = useStore()

  const [formData, setFormData] = useState({
    subject: '',
    equipmentId: '',
    workCenter: '',
    categoryId: '',
    teamId: '',
    technicianId: '',
    scheduledDate: '',
    notes: '',
    instructions: '',
    workSummary: ''
  })

  // Pre-fill if coming from equipment detail page
  useEffect(() => {
    if (location.state?.equipmentId) {
      const equip = getEquipmentById(location.state.equipmentId)
      if (equip) {
        setFormData(prev => ({
          ...prev,
          equipmentId: equip.id,
          categoryId: equip.categoryId || '',
          teamId: equip.teamId || '',
          technicianId: equip.technicianId || ''
        }))
      }
    }
  }, [location.state])

  // Auto-fill when equipment is selected
  const handleEquipmentChange = (e) => {
    const equipId = e.target.value
    setFormData(prev => ({ ...prev, equipmentId: equipId, workCenter: '' }))

    if (equipId) {
      const equip = getEquipmentById(equipId)
      if (equip) {
        setFormData(prev => ({
          ...prev,
          categoryId: equip.categoryId || '',
          teamId: equip.teamId || '',
          technicianId: equip.technicianId || ''
        }))
      }
    } else {
      setFormData(prev => ({
        ...prev,
        categoryId: '',
        teamId: '',
        technicianId: ''
      }))
    }
  }

  // Clear equipment when work center is selected
  const handleWorkCenterChange = (e) => {
    const workCenter = e.target.value
    setFormData(prev => ({ ...prev, workCenter, equipmentId: '' }))
  }

  // Update technician list when team changes
  const handleTeamChange = (e) => {
    const teamId = e.target.value
    setFormData(prev => ({ ...prev, teamId, technicianId: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Creating new request:', formData)
    addRequest(formData)
    navigate('/requests')
  }

  const activeEquipment = equipment.filter(e => e.status === 'Active')
  const filteredTechnicians = formData.teamId
    ? getTechniciansByTeam(formData.teamId)
    : technicians.filter(t => t.active)

  return (
    <div className="min-h-screen p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Button variant="ghost" onClick={() => navigate('/requests')} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Requests
        </Button>
        <h1 className="text-3xl font-bold text-foreground">New Maintenance Request</h1>
        <p className="text-muted-foreground mt-1">Create a new maintenance work order</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6 max-w-4xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Describe the maintenance request"
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Equipment"
                value={formData.equipmentId}
                onChange={handleEquipmentChange}
                options={activeEquipment.map(e => ({ value: e.id, label: `${e.name} (${e.serialNumber})` }))}
                placeholder="Select equipment"
                disabled={!!formData.workCenter}
              />

              <Select
                label="Work Center"
                value={formData.workCenter}
                onChange={handleWorkCenterChange}
                options={workCenters.map(w => ({ value: w.name, label: w.name }))}
                placeholder="Or select work center"
                disabled={!!formData.equipmentId}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select
                label="Category"
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                options={categories.map(c => ({ value: c.id, label: c.name }))}
                placeholder="Select category"
              />

              <Select
                label="Team"
                value={formData.teamId}
                onChange={handleTeamChange}
                options={teams.map(t => ({ value: t.id, label: t.name }))}
                placeholder="Select team"
                required
              />

              <Select
                label="Technician"
                value={formData.technicianId}
                onChange={(e) => setFormData({ ...formData, technicianId: e.target.value })}
                options={filteredTechnicians.map(t => ({ value: t.id, label: t.name }))}
                placeholder="Select technician"
                disabled={!formData.teamId}
                required
              />
            </div>

            <Input
              label="Scheduled Date"
              type="date"
              value={formData.scheduledDate}
              onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
              required
            />

            <Textarea
              label="Instructions"
              value={formData.instructions}
              onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
              placeholder="Enter maintenance instructions"
              rows={3}
            />

            <Textarea
              label="Notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Additional notes"
              rows={2}
            />

            <div className="flex items-center justify-end gap-3 pt-4">
              <Button variant="ghost" onClick={() => navigate('/requests')}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                <Save className="w-4 h-4 mr-2" />
                Create Request
              </Button>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  )
}
