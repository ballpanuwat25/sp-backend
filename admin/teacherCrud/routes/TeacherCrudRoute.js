import express from "express";

import CreateTeacher from "../controllers/CreateTeacher.js";
import DeleteTeacher from "../controllers/DeleteTeacher.js";
import UpdateTeacher from "../controllers/UpdateTeacher.js";
import GetTeachers from "../controllers/GetTeachers.js";
import GetTeachersById from "../controllers/GetTeachersById.js";

const app = express();

app.get('/teacher-list', GetTeachers);
app.get('/teacher-list/:id', GetTeachersById);
app.post('/teacher-list', CreateTeacher);
app.patch('/teacher-list/:id', UpdateTeacher);
app.delete('/teacher-list/:id', DeleteTeacher);

export default app;