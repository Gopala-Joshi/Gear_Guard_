import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Users } from 'lucide-react'
import { useStore } from '../stores/useStore'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import Input from '../components/ui/Input'

export default function Teams() {
  const { teams, technicians, addTeam, updateTeam, deleteTeam } = useStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTeam, setEditingTeam] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    technicianIds: []
  })

  const handleOpenModal = (team = null) => {
    if (team) {
      setEditingTeam(team)
      setFormData(team)
    } else {
      setEditingTeam(null)
      setFormData({ name: '', technicianIds: [] })
    }
    setIsModalOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingTeam) {
      updateTeam(editingTeam.id, formData)
    } else {
      addTeam(formData)
    }
    setIsModalOpen(false)
  }

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this team?')) {
      deleteTeam(id)
    }
  }

  const toggleTechnician = (techId) => {
    setFormData(prev => ({
      ...prev,
      technicianIds: prev.technicianIds.includes(techId)
        ? prev.technicianIds.filter(id => id !== techId)
        : [...prev.technicianIds, techId]
    }))
  }

  return (
    <div className="min-h-screen p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">Teams</h1>
          <p className="text-muted-foreground mt-1">Organize technicians into teams</p>
        </div>
        <Button onClick={() => handleOpenModal()} variant="primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Team
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {teams.map((team) => {
          const teamTechs = technicians.filter(t => team.technicianIds.includes(t.id))
          return (
            <Card key={team.id} hover className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{team.name}</h3>
                    <p className="text-sm text-muted-foreground">{teamTechs.length} members</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenModal(team)}
                    className="p-2 text-primary hover:bg-primary/10 rounded-md transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(team.id)}
                    className="p-2 text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                {teamTechs.map(tech => (
                  <div key={tech.id} className="flex items-center gap-2 text-sm text-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {tech.name}
                  </div>
                ))}
                {teamTechs.length === 0 && (
                  <p className="text-sm text-muted-foreground">No members assigned</p>
                )}
              </div>
            </Card>
          )
        })}
      </motion.div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTeam ? 'Edit Team' : 'Add Team'}
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              {editingTeam ? 'Update' : 'Create'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Team Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Electrical Team"
            required
          />
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Team Members
            </label>
            <div className="space-y-2 max-h-60 overflow-y-auto scrollbar-thin p-2 border border-border rounded-md">
              {technicians.map(tech => (
                <label key={tech.id} className="flex items-center gap-2 cursor-pointer hover:bg-secondary/50 p-2 rounded-md transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.technicianIds.includes(tech.id)}
                    onChange={() => toggleTechnician(tech.id)}
                    className="w-4 h-4 rounded border-input bg-background text-primary focus:ring-2 focus:ring-ring"
                  />
                  <span className="text-sm text-foreground">{tech.name}</span>
                  <span className="text-xs text-muted-foreground">({tech.role})</span>
                </label>
              ))}
            </div>
          </div>
        </form>
      </Modal>
    </div>
  )
}
