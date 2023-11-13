import express from 'express';

import CreateAdmin from '../controllers/CreateAdmin.js';
import DeleteAdmin from '../controllers/DeleteAdmin.js';
import UpdateAdmin from '../controllers/UpdateAdmin.js';
import GetAdmins from '../controllers/GetAdmins.js';
import GetAdminsById from '../controllers/GetAdminsById.js';

const app = express();

app.get('/admin-list', GetAdmins);
app.get('/admin-list/:id', GetAdminsById);
app.post('/admin-list', CreateAdmin);
app.patch('/admin-list/:id', UpdateAdmin);
app.delete('/admin-list/:id', DeleteAdmin);

export default app;