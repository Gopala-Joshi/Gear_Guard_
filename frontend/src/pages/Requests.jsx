import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import KanbanBoard from "../components/features/KanbanBoard";

export default function Requests() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-2xl font-semibold">
            Maintenance Requests
          </h1>
          <p className="text-muted-foreground mt-1">
            Track and manage all maintenance requests
          </p>
        </div>

        <Button
          onClick={() => navigate("/requests/new")}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Request
        </Button>
      </motion.div>

      {/* Kanban Board */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-4"
      >
        <KanbanBoard />
      </motion.div>
    </div>
  );
}
