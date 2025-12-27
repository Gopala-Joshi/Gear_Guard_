const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createCategory = async (req, res) => {
    const { name, companyId } = req.body;
    try {
        const category = await prisma.equipmentCategory.create({
            data: { name, companyId: parseInt(companyId) }
        });
        res.status(201).json(category);
    } catch (err) {
        res.status(500).json({ msg: "Error creating category" });
    }
};

exports.getCategories = async (req, res) => {
    const { companyId } = req.query;
    try {
        const categories = await prisma.equipmentCategory.findMany({
            where: { companyId: parseInt(companyId) }
        });
        res.json(categories);
    } catch (err) {
        res.status(500).json({ msg: "Error fetching categories" });
    }
};