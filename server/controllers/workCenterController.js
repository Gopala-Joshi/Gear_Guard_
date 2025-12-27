const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createWorkCenter = async (req, res) => {
    const { name, code, costPerHour, capacity, oeeTarget, companyId } = req.body;
    try {
        const wc = await prisma.workCenter.create({
            data: { 
                name, code, 
                costPerHour: parseFloat(costPerHour), 
                capacity: parseFloat(capacity), 
                oeeTarget: parseFloat(oeeTarget),
                companyId: parseInt(companyId) 
            }
        });
        res.status(201).json(wc);
    } catch (err) {
        res.status(500).json({ msg: "Error creating Work Center" });
    }
};

exports.getWorkCenters = async (req, res) => {
    const { companyId } = req.query;
    try {
        const wcs = await prisma.workCenter.findMany({
            where: { companyId: parseInt(companyId) }
        });
        res.json(wcs);
    } catch (err) {
        res.status(500).json({ msg: "Error fetching Work Centers" });
    }
};