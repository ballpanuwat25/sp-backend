import express from "express";

import CreateStaff from "../controllers/CreateStaff.js";
import DeleteStaff from "../controllers/DeleteStaff.js";
import UpdateStaff from "../controllers/UpdateStaff.js";
import GetStaffs from "../controllers/GetStaffs.js";
import GetStaffsById from "../controllers/GetStaffsById.js";

const app = express();

app.get('/staff-list', GetStaffs);
app.get('/staff-list/:id', GetStaffsById);
app.post('/staff-list', CreateStaff);
app.patch('/staff-list/:id', UpdateStaff);
app.delete('/staff-list/:id', DeleteStaff);

export default app;