const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// --- SIGNUP LOGIC (Creates Company + Admin User) ---
exports.signup = async (req, res) => {
    const { name, email, password, companyName } = req.body;

    try {
        // 1. Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ msg: "User with this email already exists" });
        }

        // 2. Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Database Transaction: Dono kaam ek saath honge (Atomicity)
        const result = await prisma.$transaction(async (tx) => {
            // Create Company first
            const company = await tx.company.create({
                data: { name: companyName }
            });

            // Create User and link to that Company
            const user = await tx.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    companyId: company.id,
                    role: 'admin' // First user is always admin
                }
            });

            return { user, company };
        });

        res.status(201).json({ 
            msg: "Signup successful", 
            user: { 
                id: result.user.id, 
                name: result.user.name, 
                email: result.user.email 
            },
            company: result.company.name 
        });

    } catch (err) {
        console.error("Signup Error:", err);
        res.status(500).json({ msg: "Server Error during signup" });
    }
};

// --- LOGIN LOGIC (Verify & Generate Token) ---
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Find user and include company info
        const user = await prisma.user.findUnique({ 
            where: { email },
            include: { company: true } 
        });
        
        // Security Tip: Generic "Invalid Credentials" message is better for production
        if (!user) {
            return res.status(400).json({ msg: "Invalid Credentials (User not found)" });
        }

        // 2. Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid Credentials (Wrong password)" });
        }

        // 3. Create JWT Token Payload
        const payload = { 
            userId: user.id, 
            companyId: user.companyId, 
            role: user.role 
        };

        // 4. Sign Token (Expires in 1 day)
        const token = jwt.sign(
            payload, 
            process.env.JWT_SECRET, 
            { expiresIn: '1d' }
        );

        // 5. Send complete response for Frontend (useStore me save karne ke liye)
        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                companyId: user.companyId,
                companyName: user.company.name
            }
        });

    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ msg: "Server Error during login" });
    }
};