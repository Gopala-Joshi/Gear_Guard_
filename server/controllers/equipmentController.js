const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// --- CREATE EQUIPMENT ---
exports.createEquipment = async (req, res) => {
    const { name, serialNumber, categoryId, companyId, maintenanceTeamId, defaultTechId } = req.body;
    try {
        const equipment = await prisma.equipment.create({
            data: {
                name,
                serialNumber,
                categoryId: parseInt(categoryId),
                companyId: parseInt(companyId),
                maintenanceTeamId: parseInt(maintenanceTeamId),
                defaultTechId: parseInt(defaultTechId)
            }
        });
        res.status(201).json(equipment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error creating equipment" });
    }
};

// --- GET ALL EQUIPMENT ---
exports.getAllEquipment = async (req, res) => {
    const { companyId } = req.query;
    try {
        const equipment = await prisma.equipment.findMany({
            where: { companyId: parseInt(companyId) },
            include: { category: true, maintenanceTeam: true, defaultTech: { select: { name: true } } }
        });
        res.json(equipment);
    } catch (err) {
        res.status(500).json({ msg: "Error fetching equipment" });
    }
};

// --- GET EQUIPMENT BY ID (For Smart Auto-fill) ---
exports.getEquipmentById = async (req, res) => {
    const { id } = req.params;
    try {
        const item = await prisma.equipment.findUnique({
            where: { id: parseInt(id) },
            include: { category: true, maintenanceTeam: true, defaultTech: true }
        });
        if (!item) return res.status(404).json({ msg: "Equipment not found" });
        res.json(item);
    } catch (err) {
        res.status(500).json({ msg: "Error fetching equipment details" });
    }
};