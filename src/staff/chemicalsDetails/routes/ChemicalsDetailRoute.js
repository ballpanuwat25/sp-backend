import express from "express";

import CreateChemicalsDetail from "../controllers/CreateChemicalsDetail.js";
import GetChemicalsDetail from "../controllers/GetChemicalsDetail.js";
import GetChemicalsDetailById from "../controllers/GetChemicalsDetailById.js";
import UpdateChemicalsDetail from "../controllers/UpdateChemicalsDetail.js";
import DeleteChemicalsDetail from "../controllers/DeleteChemicalsDetail.js";

const app = express();

app.get('/chemicalsDetail-list', GetChemicalsDetail);
app.get('/chemicalsDetail-list/:id', GetChemicalsDetailById);
app.post('/chemicalsDetail-list', CreateChemicalsDetail);
app.patch('/chemicalsDetail-list/:id', UpdateChemicalsDetail);
app.delete('/chemicalsDetail-list/:id', DeleteChemicalsDetail);

export default app;