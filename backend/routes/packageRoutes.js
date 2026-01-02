import express from 'express';
import upload from '../middleware/multer.js';
import { 
  createPackage, 
  getUserPackages, 
  trackPackage, 
  updatePackageStatus 
} from '../controllers/packageController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected Routes (User must be logged in)
// 'image' is the key you must use in your frontend FormData
router.post('/', protect, upload.single('image'), createPackage); 
router.get('/my-packages', protect, getUserPackages);

// Public Route
router.get('/track/:trackingNumber', trackPackage);

// Admin Route (Add admin check middleware in real app)
router.put('/:id/status', protect, updatePackageStatus);

export default router;