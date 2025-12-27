import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../stores/useStore";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";

export default function Equipment() {
  const navigate = useNavigate();
  const {
    equipment,
    categories,
    teams,
    technicians,
    addEquipment,
    updateEquipment,
    deleteEquipment,
  } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    serialNumber: "",
    categoryId: "",
    teamId: "",
    technicianId: "",
    usedBy: "",
    status: "Active",
  });

  const openModal = (equip = null) => {
    if (equip) {
      setEditingEquipment(equip);
      setFormData(equip);
    } else {
      setEditingEquipment(null);
      setFormData({
        name: "",
        serialNumber: "",
        categoryId: "",
        teamId: "",
        technicianId: "",
        usedBy: "",
        status: "Active",
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editingEquipment
      ? updateEquipment(editingEquipment.id, formData)
      : addEquipment(formData);
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (confirm("Delete this equipment?")) deleteEquipment(id);
  };

  const filteredTechnicians = formData.teamId
    ? technicians.filter((t) => t.teamId === formData.teamId)
    : technicians;

  return (
    <div className="page-container">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-2xl font-semibold">Equipment</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track all equipment assets
          </p>
        </div>

        <Button
          onClick={() => openModal()}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Equipment
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
                <th>Serial</th>
                <th>Category</th>
                <th>Team</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {equipment.map((equip) => {
                const category = categories.find(
                  (c) => c.id === equip.categoryId
                );
                const team = teams.find((t) => t.id === equip.teamId);

                return (
                  <tr key={equip.id}>
                    <td className="font-medium">{equip.name}</td>
                    <td className="text-muted-foreground font-mono">
                      {equip.serialNumber}
                    </td>
                    <td>{category?.name || "—"}</td>
                    <td>{team?.name || "—"}</td>
                    <td>
                      <span
                        className={
                          equip.status === "Active"
                            ? "badge badge-success"
                            : "badge"
                        }
                      >
                        {equip.status}
                      </span>
                    </td>
                    <td className="text-right">
                      <div className="inline-flex gap-1">
                        <button
                          onClick={() =>
                            navigate(`/equipment/${equip.id}`)
                          }
                          className="p-1.5 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openModal(equip)}
                          className="p-1.5 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(equip.id)}
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
        title={editingEquipment ? "Edit Equipment" : "Add Equipment"}
        footer={
          <>
            <Button
              className="btn-secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button className="btn-primary" onClick={handleSubmit}>
              {editingEquipment ? "Update" : "Create"}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Equipment Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
          />

          <Input
            label="Serial Number"
            value={formData.serialNumber}
            onChange={(e) =>
              setFormData({ ...formData, serialNumber: e.target.value })
            }
            required
          />

          <Select
            label="Category"
            value={formData.categoryId}
            onChange={(e) =>
              setFormData({ ...formData, categoryId: e.target.value })
            }
            options={categories.map((c) => ({
              value: c.id,
              label: c.name,
            }))}
            required
          />

          <Select
            label="Assigned Team"
            value={formData.teamId}
            onChange={(e) =>
              setFormData({
                ...formData,
                teamId: e.target.value,
                technicianId: "",
              })
            }
            options={teams.map((t) => ({
              value: t.id,
              label: t.name,
            }))}
            required
          />

          <Select
            label="Default Technician"
            value={formData.technicianId}
            onChange={(e) =>
              setFormData({ ...formData, technicianId: e.target.value })
            }
            options={filteredTechnicians.map((t) => ({
              value: t.id,
              label: t.name,
            }))}
            disabled={!formData.teamId}
            required
          />

          <Input
            label="Used By"
            value={formData.usedBy}
            onChange={(e) =>
              setFormData({ ...formData, usedBy: e.target.value })
            }
          />

          <Select
            label="Status"
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
            options={[
              { value: "Active", label: "Active" },
              { value: "Scrapped", label: "Scrapped" },
            ]}
            required
          />
        </form>
      </Modal>
    </div>
  );
}
