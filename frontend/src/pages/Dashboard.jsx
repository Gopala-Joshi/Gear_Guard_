import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  Users,
  Wrench,
  Clock,
} from "lucide-react";
import { useStore } from "../stores/useStore";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { equipment, technicians, requests } = useStore();

  const criticalEquipment = equipment.filter(
    (e) => e.health < 30
  ).length;

  const activeTechnicians = technicians.filter(
    (t) => t.active
  ).length;

  const openRequests = requests.filter(
    (r) => r.status === "New" || r.status === "In Progress"
  ).length;

  const dueThisWeek = requests.filter((r) => {
    const date = new Date(r.scheduledDate);
    const now = new Date();
    const week = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    return date >= now && date <= week;
  }).length;

  const recentRequests = requests.slice(0, 5);

  const stats = [
    {
      label: "Critical Equipment",
      value: criticalEquipment,
      icon: AlertTriangle,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      path: "/equipment",
    },
    {
      label: "Active Technicians",
      value: activeTechnicians,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
      path: "/technicians",
    },
    {
      label: "Open Requests",
      value: openRequests,
      icon: Wrench,
      color: "text-green-600",
      bg: "bg-green-50",
      path: "/requests",
    },
    {
      label: "Due This Week",
      value: dueThisWeek,
      icon: Clock,
      color: "text-purple-600",
      bg: "bg-purple-50",
      path: "/calendar",
    },
  ];

  const statusClass = (status) => {
    if (status === "New") return "badge badge-new";
    if (status === "In Progress") return "badge badge-progress";
    if (status === "Repaired") return "badge badge-success";
    return "badge";
  };

  return (
    <div className="page-container">
      {/* Header */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeUp}
        className="mb-8"
      >
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of maintenance operations
        </p>
      </motion.div>

      {/* KPI Cards */}
      <motion.div
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
      >
        {stats.map((item, idx) => (
          <motion.div
            key={item.label}
            variants={fadeUp}
            transition={{ delay: idx * 0.05 }}
            onClick={() => navigate(item.path)}
            className="card card-hover cursor-pointer p-5 flex items-center justify-between"
          >
            <div>
              <p className="text-sm text-muted-foreground">
                {item.label}
              </p>
              <p className="text-3xl font-semibold mt-1">
                {item.value}
              </p>
            </div>
            <div
              className={`p-3 rounded-lg ${item.bg}`}
            >
              <item.icon className={`w-6 h-6 ${item.color}`} />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Requests */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">
            Recent Maintenance Requests
          </h2>
          <button
            onClick={() => navigate("/requests")}
            className="text-sm text-primary hover:underline"
          >
            View all
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Equipment</th>
                <th>Technician</th>
                <th>Scheduled</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentRequests.map((r) => {
                const eq = equipment.find(
                  (e) => e.id === r.equipmentId
                );
                const tech = technicians.find(
                  (t) => t.id === r.technicianId
                );

                return (
                  <tr key={r.id}>
                    <td>{r.subject}</td>
                    <td>{eq?.name || "—"}</td>
                    <td>{tech?.name || "—"}</td>
                    <td>{r.scheduledDate}</td>
                    <td>
                      <span className={statusClass(r.status)}>
                        {r.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
