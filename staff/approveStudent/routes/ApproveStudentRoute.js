import express from "express";

import CreateApproveStudent from "../controllers/CreateApproveStudent.js";
import DeleteApproveStudent from "../controllers/DeleteApproveStudent.js";
import UpdateApproveStudent from "../controllers/UpdateApproveStudent.js";
import GetApproveStudents from "../controllers/GetApproveStudents.js";
import GetApproveStudentsById from "../controllers/GetApproveStudentsById.js";

const app = express();

app.get('/approve-student-list', GetApproveStudents);
app.get('/approve-student-list/:id', GetApproveStudentsById);
app.post('/approve-student-list', CreateApproveStudent);
app.patch('/approve-student-list/:id', UpdateApproveStudent);
app.delete('/approve-student-list/:id', DeleteApproveStudent);

export default app;