import express from 'express';
import { getCustomer, getRates } from '../controllers/shipStationController.js';

const router = express.Router();

// Route: GET /api/shipstation/customer?email=...&phone=...
router.get('/customer', getCustomer);

// Route: POST /api/shipstation/rates
router.post('/rates', getRates);

export default router;