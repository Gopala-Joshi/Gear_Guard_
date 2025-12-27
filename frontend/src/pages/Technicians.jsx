import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, UserCheck, UserX } from "lucide-react";
import { useStore } from "../stores/useStore";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";

export default function Technicians() {
  const {
    technicians,
    teams,
    addTechnician,
    updateTechnician,
    deleteTechnician,
  } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTechnician, setEditingTechnician] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Technician",
    teamId: "",
    active: true,
  });

  const openModal = (tech = null) => {
    if (tech) {
      setEditingTechnician(tech);
      setFormData(tech);
    } else {
      setEditingTechnician(null);
      setFormData({
        name: "",
        email: "",
        role: "Technician",
        teamId: "",
        active: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editingTechnician
      ? updateTechnician(editingTechnician.id, formData)
      : addTechnician(formData);
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (confirm("Delete this technician?")) deleteTechnician(id);
  };

  return (
    <div className="page-container">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-2xl font-semibold">Technicians</h1>
          <p className="text-muted-foreground mt-1">
            Manage technicians and their assignments
          </p>
        </div>

        <Button
          onClick={() => openModal()}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Technician
        </Button>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-0 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Team</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {technicians.map((tech) => {
                const team = teams.find((t) => t.id === tech.teamId);

                return (
                  <tr key={tech.id}>
                    <td className="font-medium">{tech.name}</td>
                    <td className="text-muted-foreground">{tech.email}</td>
                    <td>{tech.role}</td>
                    <td>{team?.name || "Unassigned"}</td>
                    <td>
                      <span
                        className={
                          tech.active
                            ? "badge badge-success"
                            : "badge"
                        }
                      >
                        {tech.active ? (
                          <span className="inline-flex items-center gap-1">
                            <UserCheck className="w-3 h-3" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1">
                            <UserX className="w-3 h-3" />
                            Inactive
                          </span>
                        )}
                      </span>
                    </td>
                    <td className="text-right">
                      <div className="inline-flex gap-1">
                        <button
                          onClick={() => openModal(tech)}
                          className="p-1.5 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(tech.id)}
                          className="p-1.5 rounded-md text-red-500 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTechnician ? "Edit Technician" : "Add Technician"}
        footer={
          <>
            <Button
              className="btn-secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button className="btn-primary" onClick={handleSubmit}>
              {editingTechnician ? "Update" : "Create"}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
          />

          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />

          <Select
            label="Role"
            value={formData.role}
            onChange={(e) =>
              setFormData({ ...formData, role: e.target.value })
            }
            options={[
              { value: "Technician", label: "Technician" },
              { value: "Manager", label: "Manager" },
            ]}
            required
          />

          <Select
            label="Team"
            value={formData.teamId}
            onChange={(e) =>
              setFormData({ ...formData, teamId: e.target.value })
            }
            options={teams.map((t) => ({
              value: t.id,
              label: t.name,
            }))}
            placeholder="Select a team"
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="active"
              checked={formData.active}
              onChange={(e) =>
                setFormData({ ...formData, active: e.target.checked })
              }
              className="w-4 h-4 rounded border-input text-primary focus:ring-ring"
            />
            <label htmlFor="active" className="text-sm">
              Active
            </label>
          </div>
        </form>
      </Modal>
    </div>
  );
}
