import cloudinary from "../utils/cloudinary.js";
import fs from "fs";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Package } from "../models/Package.js";

// @desc    Create new package with image
// @route   POST /api/packages
// @access  Private
const createPackage = asyncHandler(async (req, res) => {
  const { title, description, externalTracking } = req.body;

  if (!req.file) {
    res.status(400);
    throw new Error("Please upload a package image");
  }

  // Upload to Cloudinary
  let result;
  try {
    result = await cloudinary.uploader.upload(req.file.path, {
      folder: "skyrush_packages",
      use_filename: true,
    });
    // Cleanup local file
    fs.unlinkSync(req.file.path);
  } catch (error) {
    // If upload fails, ensure we still clean up
    if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    res.status(500);
    throw new Error("Image upload failed");
  }

  const trackingNumber =
    "SR-" + Math.random().toString(36).substr(2, 9).toUpperCase();

  const newPackage = await Package.create({
    user: req.user.userId,
    title,
    description,
    externalTracking,
    trackingNumber,
    packageImage: {
      url: result.secure_url,
      public_id: result.public_id,
    },
    history: [
      {
        status: "Pending",
        location: "System",
        note: "Package registered in system",
      },
    ],
  });

  res.status(201).json(newPackage);
});

// @desc    Get user packages
// @route   GET /api/packages/my-packages
// @access  Private
const getUserPackages = asyncHandler(async (req, res) => {
  const packages = await Package.find({ user: req.user.userId }).sort({
    createdAt: -1,
  });
  res.status(200).json(packages);
});

// @desc    Track package public
// @route   GET /api/packages/track/:trackingNumber
// @access  Public
const trackPackage = asyncHandler(async (req, res) => {
  const pkg = await Package.findOne({
    trackingNumber: req.params.trackingNumber,
  }).select("-user");

  if (!pkg) {
    res.status(404);
    throw new Error("Tracking number not found");
  }

  res.status(200).json(pkg);
});

// @desc    Update package status (Admin)
// @route   PUT /api/packages/:id/status
// @access  Private (Admin)
const updatePackageStatus = asyncHandler(async (req, res) => {
  const { status, location, note } = req.body;

  const pkg = await Package.findById(req.params.id);

  if (!pkg) {
    res.status(404);
    throw new Error('Package not found');
  }

  // Update current status
  pkg.status = status;

  // Add to history timeline
  pkg.history.push({
    status,
    location,
    note,
    timestamp: Date.now()
  });

  await pkg.save();

  res.status(200).json(pkg);
});


export { createPackage, getUserPackages, trackPackage, updatePackageStatus };
