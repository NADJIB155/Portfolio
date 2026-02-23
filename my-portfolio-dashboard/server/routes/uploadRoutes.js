const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { protect } = require('../middleware/authMiddleware');

// 1. Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// 2. Configure Multer (Temporary storage)
const storage = multer.diskStorage({});
const upload = multer({ storage });

// 3. The Upload Route
router.post('/', protect, upload.single('file'), async (req, res) => {
  try {
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'portfolio', // Folder name in Cloudinary
      resource_type: 'auto' // Auto-detect (Image or Video)
    });

    // Send back the secure URL
    res.status(200).json(result.secure_url);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Upload failed' });
  }
});

module.exports = router;