import express from 'express';
import {
  createJob,
  deleteJob,
  getJobById,
  getJobs,
  updateJobStatus
} from '../controllers/jobController.js';
import { validateCreateJob, validateIdParam, validateStatusUpdate } from '../middleware/validateJob.js';
import validateRequest from '../middleware/validateRequest.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getJobs);
router.get('/:id', validateIdParam, validateRequest, getJobById);
router.post('/', validateCreateJob, validateRequest, protect, createJob);
router.patch('/:id', validateStatusUpdate, validateRequest, protect, updateJobStatus);
router.delete('/:id', validateIdParam, validateRequest, protect, deleteJob);

export default router;