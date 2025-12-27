const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// --- CREATE REQUEST ---
exports.createRequest = async (req, res) => {
    const { subject, type, priority, companyId, equipmentId, workCenterId, teamId, technicianId, scheduledDate } = req.body;
    try {
        const request = await prisma.maintenanceRequest.create({
            data: {
                subject, type, 
                priority: parseInt(priority),
                companyId: parseInt(companyId),
                equipmentId: equipmentId ? parseInt(equipmentId) : null,
                workCenterId: workCenterId ? parseInt(workCenterId) : null,
                teamId: parseInt(teamId),
                technicianId: parseInt(technicianId),
                scheduledDate: scheduledDate ? new Date(scheduledDate) : null
            }
        });
        res.status(201).json(request);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error creating request" });
    }
};

// --- GET ALL REQUESTS (Kanban/List) ---
exports.getRequests = async (req, res) => {
    const { companyId } = req.query;
    try {
        const requests = await prisma.maintenanceRequest.findMany({
            where: { companyId: parseInt(companyId) },
            include: { equipment: true, workCenter: true, technician: { select: { name: true } } }
        });
        res.json(requests);
    } catch (err) {
        res.status(500).json({ msg: "Error fetching requests" });
    }
};

// --- UPDATE STAGE (Kanban Drag & Drop + Scrap Logic) ---
exports.updateStage = async (req, res) => {
    const { id } = req.params;
    const { stage } = req.body; // New, InProgress, Repaired, Scrap

    try {
        const updatedRequest = await prisma.$transaction(async (tx) => {
            const request = await tx.maintenanceRequest.update({
                where: { id: parseInt(id) },
                data: { stage }
            });

            // SCRAP LOGIC: Agar stage 'Scrap' hai aur equipment linked hai
            if (stage === 'Scrap' && request.equipmentId) {
                await tx.equipment.update({
                    where: { id: request.equipmentId },
                    data: { isUsable: false }
                });
            }
            return request;
        });

        res.json(updatedRequest);
    } catch (err) {
        res.status(500).json({ msg: "Error updating stage" });
    }
};