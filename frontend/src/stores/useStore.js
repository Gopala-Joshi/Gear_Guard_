import { create } from 'zustand'

const generateId = () => Math.random().toString(36).substr(2, 9)

const initialTechnicians = [
  { id: '1', name: 'John Smith', email: 'john.smith@gearguard.com', role: 'Technician', teamId: '1', active: true },
  { id: '2', name: 'Sarah Johnson', email: 'sarah.j@gearguard.com', role: 'Manager', teamId: '1', active: true },
  { id: '3', name: 'Mike Wilson', email: 'mike.w@gearguard.com', role: 'Technician', teamId: '2', active: true },
  { id: '4', name: 'Emily Davis', email: 'emily.d@gearguard.com', role: 'Technician', teamId: '2', active: true },
  { id: '5', name: 'Robert Brown', email: 'robert.b@gearguard.com', role: 'Manager', teamId: '3', active: true },
]

const initialTeams = [
  { id: '1', name: 'Electrical Team', technicianIds: ['1', '2'] },
  { id: '2', name: 'Mechanical Team', technicianIds: ['3', '4'] },
  { id: '3', name: 'HVAC Team', technicianIds: ['5'] },
]

const initialCategories = [
  { id: '1', name: 'Electrical Equipment', responsibleTechnicianId: '2' },
  { id: '2', name: 'Mechanical Equipment', responsibleTechnicianId: '3' },
  { id: '3', name: 'HVAC Systems', responsibleTechnicianId: '5' },
  { id: '4', name: 'Safety Equipment', responsibleTechnicianId: '1' },
]

const initialEquipment = [
  { 
    id: '1', 
    name: 'Industrial Generator A1', 
    serialNumber: 'GEN-2024-001', 
    categoryId: '1', 
    teamId: '1', 
    technicianId: '2',
    usedBy: 'Manufacturing Floor A',
    status: 'Active'
  },
  { 
    id: '2', 
    name: 'Hydraulic Press B2', 
    serialNumber: 'HYD-2024-002', 
    categoryId: '2', 
    teamId: '2', 
    technicianId: '3',
    usedBy: 'Production Line B',
    status: 'Active'
  },
  { 
    id: '3', 
    name: 'Air Conditioning Unit C3', 
    serialNumber: 'HVAC-2024-003', 
    categoryId: '3', 
    teamId: '3', 
    technicianId: '5',
    usedBy: 'Building C - Floor 2',
    status: 'Active'
  },
  { 
    id: '4', 
    name: 'Emergency Lighting System', 
    serialNumber: 'SAF-2024-004', 
    categoryId: '4', 
    teamId: '1', 
    technicianId: '1',
    usedBy: 'All Buildings',
    status: 'Active'
  },
  { 
    id: '5', 
    name: 'Old Compressor Unit', 
    serialNumber: 'COMP-2020-005', 
    categoryId: '2', 
    teamId: '2', 
    technicianId: '4',
    usedBy: 'Warehouse',
    status: 'Scrapped'
  },
]

const initialRequests = [
  {
    id: '1',
    subject: 'Quarterly Generator Inspection',
    equipmentId: '1',
    workCenter: null,
    categoryId: '1',
    teamId: '1',
    technicianId: '2',
    scheduledDate: '2025-01-05',
    status: 'New',
    notes: '',
    instructions: 'Perform standard quarterly inspection',
    workSummary: ''
  },
  {
    id: '2',
    subject: 'Hydraulic Press Oil Change',
    equipmentId: '2',
    workCenter: null,
    categoryId: '2',
    teamId: '2',
    technicianId: '3',
    scheduledDate: '2025-01-10',
    status: 'In Progress',
    notes: 'Oil filters ordered',
    instructions: 'Replace hydraulic oil and filters',
    workSummary: 'Draining old oil completed'
  },
  {
    id: '3',
    subject: 'AC Filter Replacement',
    equipmentId: '3',
    workCenter: null,
    categoryId: '3',
    teamId: '3',
    technicianId: '5',
    scheduledDate: '2025-01-15',
    status: 'Repaired',
    notes: 'Completed successfully',
    instructions: 'Replace air filters',
    workSummary: 'All filters replaced, system tested'
  },
]

const initialWorkCenters = [
  { id: '1', name: 'Production Floor A', description: 'Main manufacturing area' },
  { id: '2', name: 'Warehouse Section B', description: 'Storage and logistics' },
  { id: '3', name: 'Office Building C', description: 'Administrative offices' },
]

export const useStore = create((set, get) => ({
  user: null,
  company: null,
  technicians: initialTechnicians,
  teams: initialTeams,
  categories: initialCategories,
  equipment: initialEquipment,
  requests: initialRequests,
  workCenters: initialWorkCenters,

  // Auth actions
  login: (email, password) => {
    set({
      user: { id: '1', name: 'Admin User', email },
      company: { id: '1', name: 'GearGuardPro Industries', logo: null }
    })
  },
  logout: () => {
    set({ user: null, company: null })
  },

  // Technician actions
  addTechnician: (technician) => {
    set((state) => ({
      technicians: [...state.technicians, { ...technician, id: generateId() }]
    }))
  },
  updateTechnician: (id, updates) => {
    set((state) => ({
      technicians: state.technicians.map((t) => t.id === id ? { ...t, ...updates } : t)
    }))
  },
  deleteTechnician: (id) => {
    set((state) => ({
      technicians: state.technicians.filter((t) => t.id !== id)
    }))
  },

  // Team actions
  addTeam: (team) => {
    set((state) => ({
      teams: [...state.teams, { ...team, id: generateId() }]
    }))
  },
  updateTeam: (id, updates) => {
    set((state) => ({
      teams: state.teams.map((t) => t.id === id ? { ...t, ...updates } : t)
    }))
  },
  deleteTeam: (id) => {
    set((state) => ({
      teams: state.teams.filter((t) => t.id !== id)
    }))
  },

  // Category actions
  addCategory: (category) => {
    set((state) => ({
      categories: [...state.categories, { ...category, id: generateId() }]
    }))
  },
  updateCategory: (id, updates) => {
    set((state) => ({
      categories: state.categories.map((c) => c.id === id ? { ...c, ...updates } : c)
    }))
  },
  deleteCategory: (id) => {
    set((state) => ({
      categories: state.categories.filter((c) => c.id !== id)
    }))
  },

  // Equipment actions
  addEquipment: (equipment) => {
    set((state) => ({
      equipment: [...state.equipment, { ...equipment, id: generateId() }]
    }))
  },
  updateEquipment: (id, updates) => {
    set((state) => ({
      equipment: state.equipment.map((e) => e.id === id ? { ...e, ...updates } : e)
    }))
  },
  deleteEquipment: (id) => {
    set((state) => ({
      equipment: state.equipment.filter((e) => e.id !== id)
    }))
  },

  // Request actions
  addRequest: (request) => {
    set((state) => ({
      requests: [...state.requests, { ...request, id: generateId(), status: 'New' }]
    }))
  },
  updateRequest: (id, updates) => {
    set((state) => ({
      requests: state.requests.map((r) => r.id === id ? { ...r, ...updates } : r)
    }))
  },
  deleteRequest: (id) => {
    set((state) => ({
      requests: state.requests.filter((r) => r.id !== id)
    }))
  },

  // Helper functions for auto-fill logic
  getEquipmentById: (id) => {
    return get().equipment.find((e) => e.id === id)
  },
  getCategoryById: (id) => {
    return get().categories.find((c) => c.id === id)
  },
  getTeamById: (id) => {
    return get().teams.find((t) => t.id === id)
  },
  getTechnicianById: (id) => {
    return get().technicians.find((t) => t.id === id)
  },
  getTechniciansByTeam: (teamId) => {
    return get().technicians.filter((t) => t.teamId === teamId && t.active)
  },
  getActiveEquipment: () => {
    return get().equipment.filter((e) => e.status === 'Active')
  },
  getRequestsByEquipment: (equipmentId) => {
    return get().requests.filter((r) => r.equipmentId === equipmentId)
  },

  // Work Center actions
  addWorkCenter: (workCenter) => {
    set((state) => ({
      workCenters: [...state.workCenters, { ...workCenter, id: generateId() }]
    }))
  },
  updateWorkCenter: (id, updates) => {
    set((state) => ({
      workCenters: state.workCenters.map((w) => w.id === id ? { ...w, ...updates } : w)
    }))
  },
  deleteWorkCenter: (id) => {
    set((state) => ({
      workCenters: state.workCenters.filter((w) => w.id !== id)
    }))
  },
}))
