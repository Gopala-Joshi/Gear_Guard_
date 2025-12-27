import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, FolderOpen } from "lucide-react";
import { useStore } from "../stores/useStore";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";

export default function Categories() {
  const {
    categories,
    technicians,
    addCategory,
    updateCategory,
    deleteCategory,
  } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    responsibleTechnicianId: "",
  });

  const openModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData(category);
    } else {
      setEditingCategory(null);
      setFormData({ name: "", responsibleTechnicianId: "" });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editingCategory
      ? updateCategory(editingCategory.id, formData)
      : addCategory(formData);
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (confirm("Delete this category?")) deleteCategory(id);
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
          <h1 className="text-2xl font-semibold">Categories</h1>
          <p className="text-muted-foreground mt-1">
            Manage equipment categories and responsibility
          </p>
        </div>

        <Button
          onClick={() => openModal()}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </Button>
      </motion.div>

      {/* Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {categories.map((category) => {
          const tech = technicians.find(
            (t) => t.id === category.responsibleTechnicianId
          );

          return (
            <div
              key={category.id}
              className="card card-hover p-6 flex items-start justify-between"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-md bg-primary/10 text-primary">
                  <FolderOpen className="w-5 h-5" />
                </div>

                <div>
                  <h3 className="font-medium">{category.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Responsible:{" "}
                    <span className="text-foreground">
                      {tech?.name || "Unassigned"}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex gap-1">
                <button
                  onClick={() => openModal(category)}
                  className="p-1.5 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="p-1.5 rounded-md text-red-500 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCategory ? "Edit Category" : "Add Category"}
        footer={
          <>
            <Button
              className="btn-secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button className="btn-primary" onClick={handleSubmit}>
              {editingCategory ? "Update" : "Create"}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Category Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
          />

          <Select
            label="Responsible Technician"
            value={formData.responsibleTechnicianId}
            onChange={(e) =>
              setFormData({
                ...formData,
                responsibleTechnicianId: e.target.value,
              })
            }
            options={technicians.map((t) => ({
              value: t.id,
              label: `${t.name} (${t.role})`,
            }))}
            placeholder="Select a technician"
          />
        </form>
      </Modal>
    </div>
  );
}
