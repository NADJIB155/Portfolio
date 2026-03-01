const express = require('express');
const router = express.Router();
const { 
    getProjects, 
    createProject, 
    updateProject, 
    deleteProject 
} = require('../controller/projectController');

// We import the 'protect' middleware to lock specific routes
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(getProjects)                 // Public: Anyone can view
    .post(protect, createProject);    // Protected: Only Admin can add

router.route('/:id')                  // This handles /api/projects/ID_NUMBER_HERE
    .put(protect, updateProject)      // Protected: Edit
    .delete(protect, deleteProject);  // Protected: Delete

module.exports = router;