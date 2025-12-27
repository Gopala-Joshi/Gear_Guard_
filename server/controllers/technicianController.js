const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// --- CREATE TECHNICIAN ---
exports.createTechnician = async (req, res) => {
    const { name, email, role, companyId } = req.body;

    try {
        // Email check (Duplicate prevent karne ke liye)
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) return res.status(400).json({ msg: "Technician with this email already exists" });

        // Note: Production mein password random generate karke email karna chahiye, 
        // par abhi development ke liye hum ek default password 'tech123' rakh rahe hain.
        const technician = await prisma.user.create({
            data: {
                name,
                email,
                password: 'tech123', // Default password
                role: role || 'technician',
                companyId: parseInt(companyId)
            }
        });

        res.status(201).json(technician);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error creating technician" });
    }
};

// --- GET ALL TECHNICIANS (Company Specific) ---
exports.getTechnicians = async (req, res) => {
    const { companyId } = req.query; // Query parameter se companyId lenge

    try {
        const technicians = await prisma.user.findMany({
            where: { 
                companyId: parseInt(companyId),
                role: 'technician' // Sirf technicians dikhane ke liye
            },
            include: {
                teams: true // Saath mein unki teams bhi fetch ho jayengi
            }
        });
        res.json(technicians);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error fetching technicians" });
    }
};