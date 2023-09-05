import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';

import AdminRoute from './admin/AdminRoute.js';
import StaffRoute from './admin/staffCrud/routes/StaffRoute.js';
import TeacherRoute from './admin/teacherCrud/routes/TeacherRoute.js';

import ChemicalsRoute from './staff/chemicals/routes/ChemicalsRoute.js';
import ChemicalsDetailRoute from './staff/chemicalsDetails/routes/ChemicalsDetailRoute.js';

import EquipmentRoute from './staff/equipment/routes/EquipmentRoute.js';
import EquipmentCategoryRoute from './staff/equipmentCategory/routes/EquipmentCategoryRoute.js';

import StudentRoute from './student/studentRoute/StudentRoute.js'

import ChemicalsRequestRoute from './student/studentChemicalsRequest/routes/ChemicalsRequestRoute.js';
import EquipmentRequestRoute from './student/studentEquipmentRequest/routes/EquipmentRequestRoute.js';

import LogActivityRoute from './admin/logActivity/routes/LogActivityRoute.js';

import BundleRequestRoute from './teacher/routes/BundleRequestRoute.js';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true
}));
app.use(cookieParser());
app.use(AdminRoute)
app.use(StaffRoute)
app.use(TeacherRoute)

app.use(ChemicalsRoute)
app.use(ChemicalsDetailRoute)

app.use(EquipmentRoute)
app.use(EquipmentCategoryRoute)

app.use(StudentRoute)
app.use(ChemicalsRequestRoute)
app.use(EquipmentRequestRoute)

app.use(LogActivityRoute)
app.use(BundleRequestRoute)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});