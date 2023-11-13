import express from "express";

import CreateEquipmentCategory from "../controllers/CreateEquipmentCategory.js";
import DeleteEquipmentCategory from "../controllers/DeleteEquipmentCategory.js";
import GetEquipmentsCategory from "../controllers/GetEquipmentsCategory.js";
import GetEquipmentsCategoryById from "../controllers/GetEquipmentsCategoryById.js";
import UpdateEquipmentCategory from "../controllers/UpdateEquipment.js";

const app = express();

app.get('/equipmentCategory-list', GetEquipmentsCategory);
app.get('/equipmentCategory-list/:id', GetEquipmentsCategoryById);
app.post('/equipmentCategory-list', CreateEquipmentCategory);
app.patch('/equipmentCategory-list/:id', UpdateEquipmentCategory);
app.delete('/equipmentCategory-list/:id', DeleteEquipmentCategory);

export default app;