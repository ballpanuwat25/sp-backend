import express from "express";

import CreateEquipmentRequest from "../controllers/CreateEquipmentRequest.js";
import DeleteEquipmentRequest from "../controllers/DeleteEquipmentRequest.js";
import GetEquipmentRequest from "../controllers/GetEquipmentRequest.js";
import GetEquipmentRequestById from "../controllers/GetEquipmentRequestById.js";
import UpdateEquipmentRequest from "../controllers/UpdateEquipmentRequest.js";

const app = express();

app.get('/equipment-request-list', GetEquipmentRequest);
app.get('/equipment-request-list/:id', GetEquipmentRequestById);
app.post('/equipment-request-list', CreateEquipmentRequest);
app.patch('/equipment-request-list/:id', UpdateEquipmentRequest);
app.delete('/equipment-request-list/:id', DeleteEquipmentRequest);

export default app;