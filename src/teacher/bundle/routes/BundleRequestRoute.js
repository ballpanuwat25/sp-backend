import express from "express";

import CreateBundleRequest from "../controllers/CreateBundleRequest.js";
import DeleteBundleRequest from "../controllers/DeleteBundleRequest.js";
import GetBundleRequest from "../controllers/GetBundleRequest.js";
import GetBundleRequestById from "../controllers/GetBundleRequestById.js";
import UpdateBundleRequest from "../controllers/UpdateBundleRequest.js";

const app = express();

app.get('/bundle-list', GetBundleRequest);
app.get('/bundle-list/:id', GetBundleRequestById);
app.post('/bundle-list', CreateBundleRequest);
app.patch('/bundle-list/:id', UpdateBundleRequest);
app.delete('/bundle-list/:id', DeleteBundleRequest);

export default app;