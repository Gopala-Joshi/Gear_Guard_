import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Wrench, Package } from "lucide-react";
import { useStore } from "../stores/useStore";
import Button from "../components/ui/Button";

export default function EquipmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { equipment, categories, teams, technicians, requests } = useStore();

  const equipmentItem = equipment.find((e) => e.id === id);
  const category = categories.find((c) => c.id === equipmentItem?.categoryId);
  const team = teams.find((t) => t.id === equipmentItem?.teamId);
  const tech = technicians.find((t) => t.id === equipmentItem?.technicianId);
  const equipmentRequests = requests.filter((r) => r.equipmentId === id);

  if (!equipmentItem) {
    return (
      <div className="page-container py-20 text-center">
        <h1 className="text-xl font-semibold mb-4">Equipment not found</h1>
        <Button className="btn-primary" onClick={() => navigate("/equipment")}>
          Back to Equipment
        </Button>
      </div>
    );
  }

  const statusBadgeClass =
    equipmentItem.status === "Active" ? "badge-success" : "badge-danger";

  const requestStatusBadge = (status) => {
    switch (status) {
      case "New":
        return "badge-new";
      case "In Progress":
        return "badge-progress";
      case "Repaired":
        return "badge-success";
      case "Scrap":
        return "badge-danger";
      default:
        return "badge-new";
    }
  };

  return (
    <div className="page-container">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Button
          className="btn-secondary mb-4"
          onClick={() => navigate("/equipment")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Equipment
        </Button>

        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-xl bg-primary/10 text-primary">
              <Package className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">{equipmentItem.name}</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Serial: {equipmentItem.serialNumber}
              </p>
            </div>
          </div>

          <span className={`badge ${statusBadgeClass}`}>
            {equipmentItem.status}
          </span>
        </div>
      </motion.div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Equipment Info */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="card p-6"
        >
          <h2 className="font-medium mb-4">Equipment Details</h2>

          <div className="space-y-3 text-sm">
            <div>
              <p className="text-muted-foreground">Category</p>
              <p className="font-medium">{category?.name || "N/A"}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Assigned Team</p>
              <p className="font-medium">{team?.name || "N/A"}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Default Technician</p>
              <p className="font-medium">{tech?.name || "N/A"}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Used By</p>
              <p className="font-medium">
                {equipmentItem.usedBy || "N/A"}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Maintenance History */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium">Maintenance History</h2>
            <Button
              className="btn-primary"
              onClick={() =>
                navigate("/requests/new", { state: { equipmentId: id } })
              }
            >
              <Wrench className="w-4 h-4 mr-2" />
              New Request
            </Button>
          </div>

          <div className="space-y-3">
            {equipmentRequests.length > 0 ? (
              equipmentRequests.map((request) => {
                const requestTech = technicians.find(
                  (t) => t.id === request.technicianId
                );

                return (
                  <div
                    key={request.id}
                    className="p-4 rounded-lg border border-border bg-secondary/40"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium">{request.subject}</h3>
                      <span
                        className={`badge ${requestStatusBadge(
                          request.status
                        )}`}
                      >
                        {request.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">
                          Technician:
                        </span>
                        <span className="ml-2">
                          {requestTech?.name || "N/A"}
                        </span>
                      </div>

                      <div>
                        <span className="text-muted-foreground">
                          Scheduled:
                        </span>
                        <span className="ml-2">
                          {request.scheduledDate}
                        </span>
                      </div>
                    </div>

                    {request.notes && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {request.notes}
                      </p>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">
                No maintenance history available
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
