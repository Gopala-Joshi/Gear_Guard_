import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, MapPin } from 'lucide-react'
import { useStore } from '../stores/useStore'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import Input from '../components/ui/Input'

export default function WorkCenters() {
  const { workCenters, addWorkCenter, updateWorkCenter, deleteWorkCenter } = useStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingWorkCenter, setEditingWorkCenter] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  })

  const handleOpenModal = (workCenter = null) => {
    if (workCenter) {
      setEditingWorkCenter(workCenter)
      setFormData(workCenter)
    } else {
      setEditingWorkCenter(null)
      setFormData({ name: '', description: '' })
    }
    setIsModalOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingWorkCenter) {
      updateWorkCenter(editingWorkCenter.id, formData)
    } else {
      addWorkCenter(formData)
    }
    setIsModalOpen(false)
  }

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this work center?')) {
      deleteWorkCenter(id)
    }
  }

  return (
    <div className="min-h-screen p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">Work Centers</h1>
          <p className="text-muted-foreground mt-1">Manage work center locations</p>
        </div>
        <Button onClick={() => handleOpenModal()} variant="primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Work Center
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {workCenters.map((workCenter) => {
          return (
            <Card key={workCenter.id} hover className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/20 rounded-lg">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{workCenter.name}</h3>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenModal(workCenter)}
                    className="p-2 text-primary hover:bg-primary/10 rounded-md transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(workCenter.id)}
                    className="p-2 text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {workCenter.description && (
                <p className="text-sm text-muted-foreground">{workCenter.description}</p>
              )}
            </Card>
          )
        })}
      </motion.div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingWorkCenter ? 'Edit Work Center' : 'Add Work Center'}
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              {editingWorkCenter ? 'Update' : 'Create'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Work Center Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Production Floor A"
            required
          />
          <Input
            label="Description"
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Main production area"
          />
        </form>
      </Modal>
    </div>
  )
}
