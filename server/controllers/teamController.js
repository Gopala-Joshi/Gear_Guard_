const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// --- CREATE TEAM ---
exports.createTeam = async (req, res) => {
    const { name, companyId, technicianIds } = req.body; // technicianIds ek array hoga [1, 2, 3]

    try {
        const team = await prisma.team.create({
            data: {
                name,
                companyId: parseInt(companyId),
                members: {
                    connect: technicianIds.map(id => ({ id: parseInt(id) }))
                }
            },
            include: { members: true }
        });
        res.status(201).json(team);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error creating team" });
    }
};

// --- GET ALL TEAMS ---
exports.getTeams = async (req, res) => {
    const { companyId } = req.query;

    try {
        const teams = await prisma.team.findMany({
            where: { companyId: parseInt(companyId) },
            include: {
                members: {
                    select: { id: true, name: true, role: true }
                }
            }
        });
        res.json(teams);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error fetching teams" });
    }
};