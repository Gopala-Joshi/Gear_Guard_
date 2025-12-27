const express = require('express');
const cors = require('cors');
require('dotenv').config();

const auth = require('./middleware/auth');

const authRoutes = require('./routes/authRoutes');
const technicianRoutes = require('./routes/technicianRoutes');
const teamRoutes = require('./routes/teamRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const equipmentRoutes = require('./routes/equipmentRoutes');
const requestRoutes = require('./routes/requestRoutes');
const workCenterRoutes = require('./routes/workCenterRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/technicians', auth, technicianRoutes);
app.use('/api/teams', auth, teamRoutes);
app.use('/api/categories', auth, categoryRoutes);
app.use('/api/equipment', auth, equipmentRoutes);
app.use('/api/requests', auth, requestRoutes);
app.use('/api/workcenters', auth, workCenterRoutes); 

app.get('/', (req, res) => res.send('🚀 GearGuard Engine is Online!'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
