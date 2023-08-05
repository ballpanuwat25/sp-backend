import express from "express";

import CreateChemicals from "../controllers/CreateChemicals.js";
import DeleteChemicals from "../controllers/DeleteChemicals.js";
import GetChemicals from "../controllers/GetChemicals.js";
import GetChemicalsById from "../controllers/GetChemicalsById.js";
import UpdateChemicals from "../controllers/UpdateChemicals.js";

const app = express();

app.get('/chemicals-list', GetChemicals);
app.get('/chemicals-list/:id', GetChemicalsById);
app.post('/chemicals-list', CreateChemicals);
app.patch('/chemicals-list/:id', UpdateChemicals);
app.delete('/chemicals-list/:id', DeleteChemicals);

export default app;