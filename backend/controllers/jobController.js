import { validationResult } from 'express-validator';
import mongoose from 'mongoose';
import JobRequest from '../models/JobRequest.js';

const throwValidationError = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed');
    error.statusCode = 400;
    error.details = errors.array();
    throw error;
  }
};

export const getJobs = async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const jobs = await JobRequest.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: jobs.length, data: jobs });
  } catch (error) {
    next(error);
  }
};

export const getJobById = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid job id' });
    }

    const job = await JobRequest.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job request not found' });
    }

    res.status(200).json({ success: true, data: job });
  } catch (error) {
    next(error);
  }
};

export const createJob = async (req, res, next) => {
  try {
    throwValidationError(req);
    const job = await JobRequest.create(req.body);
    res.status(201).json({ success: true, message: 'Job request created successfully', data: job });
  } catch (error) {
    next(error);
  }
};

export const updateJobStatus = async (req, res, next) => {
  try {
    throwValidationError(req);
    const { status } = req.body;

    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid job id' });
    }

    const job = await JobRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job request not found' });
    }

    res.status(200).json({ success: true, message: 'Status updated successfully', data: job });
  } catch (error) {
    next(error);
  }
};

export const deleteJob = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid job id' });
    }

    const job = await JobRequest.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job request not found' });
    }

    res.status(200).json({ success: true, message: 'Job request deleted successfully' });
  } catch (error) {
    next(error);
  }
};