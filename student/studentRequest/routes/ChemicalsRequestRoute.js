import express from "express";

import CreateChemicalsRequest from "../controllers/CreateChemicalsRequest.js";
import DeleteChemicalsRequest from "../controllers/DeleteChemicalsRequest.js";
import GetChemicalsRequest from "../controllers/GetChemicalsRequest.js";
import GetChemicalsRequestById from "../controllers/GetChemicalsRequestById.js";
import UpdateChemicalsRequest from "../controllers/UpdateChemicalsRequest.js";

const app = express();

app.get('/chemicals-request-list', GetChemicalsRequest);
app.get('/chemicals-request-list/:id', GetChemicalsRequestById);
app.post('/chemicals-request-list', CreateChemicalsRequest);
app.patch('/chemicals-request-list/:id', UpdateChemicalsRequest);
app.delete('/chemicals-request-list/:id', DeleteChemicalsRequest);

export default app;