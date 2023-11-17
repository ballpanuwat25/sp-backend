import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';

import AdminRoute from './src/admin/AdminRoute.js';
import AdminCrudRoute from './src/admin/adminCrud/routes/AdminCrudRoute.js';
import StaffCrudRoute from './src/admin/staffCrud/routes/StaffCrudRoute.js';
import TeacherCrudRoute from './src/admin/teacherCrud/routes/TeacherCrudRoute.js';

import ChemicalsRoute from './src/staff/chemicals/routes/ChemicalsRoute.js';
import ChemicalsDetailRoute from './src/staff/chemicalsDetails/routes/ChemicalsDetailRoute.js';

import EquipmentRoute from './src/staff/equipment/routes/EquipmentRoute.js';
import EquipmentCategoryRoute from './src/staff/equipmentCategory/routes/EquipmentCategoryRoute.js';

import StudentRoute from './src/student/StudentRoute.js'
import ApproveStudentRoute from './src/staff/approveStudent/routes/ApproveStudentRoute.js'

import ChemicalsRequestRoute from './src/student/studentChemicalsRequest/routes/ChemicalsRequestRoute.js';
import EquipmentRequestRoute from './src/student/studentEquipmentRequest/routes/EquipmentRequestRoute.js';

import LogActivityRoute from './src/admin/logActivity/routes/LogActivityRoute.js';

import BundleRequestRoute from './src/teacher/bundle/routes/BundleRequestRoute.js';

import TeacherRoute from './src/teacher/TeacherRoute.js'
import StaffRoute from './src/staff/StaffRoute.js'

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors({
    origin: ["http://158.108.194.8:3000"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true
}));
app.use(cookieParser());
app.use(AdminRoute)
app.use(AdminCrudRoute)
app.use(StaffCrudRoute)
app.use(TeacherCrudRoute)

app.use(ChemicalsRoute)
app.use(ChemicalsDetailRoute)

app.use(EquipmentRoute)
app.use(EquipmentCategoryRoute)

app.use(ApproveStudentRoute)

app.use(StudentRoute)
app.use(ChemicalsRequestRoute)
app.use(EquipmentRequestRoute)

app.use(LogActivityRoute)
app.use(BundleRequestRoute)

app.use(TeacherRoute)
app.use(StaffRoute)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});