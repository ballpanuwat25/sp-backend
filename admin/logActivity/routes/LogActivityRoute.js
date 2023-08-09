import express from "express";

import CreateLogActivity from "../controllers/CreateLogActivity.js";
import DeleteLogActivity from "../controllers/DeleteLogActivity.js";
import UpdateLogActivity from "../controllers/UpdateLogActivity.js";
import GetLogActivity from "../controllers/GetLogActivity.js";
import GetLogActivityById from "../controllers/GetLogActivityById.js";

const app = express();

app.get('/log-activity', GetLogActivity);
app.get('/log-activity/:id', GetLogActivityById);
app.post('/log-activity', CreateLogActivity);
app.patch('/log-activity/:id', UpdateLogActivity);
app.delete('/log-activity/:id', DeleteLogActivity);

export default app;