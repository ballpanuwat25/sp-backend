import express from "express";

import CreateEquipment from "../controllers/CreateEquipment.js";
import DeleteEquipment from "../controllers/DeleteEquipment.js";
import GetEquipments from "../controllers/GetEquipments.js";
import GetEquipmentsById from "../controllers/GetEquipmentsById.js";
import UpdateEquipment from "../controllers/UpdateEquipment.js";

const app = express();

app.get('/equipment-list', GetEquipments);
app.get('/equipment-list/:id', GetEquipmentsById);
app.post('/equipment-list', CreateEquipment);
app.patch('/equipment-list/:id', UpdateEquipment);
app.delete('/equipment-list/:id', DeleteEquipment);

export default app;