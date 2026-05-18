import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import JobRequest from '../models/JobRequest.js';

dotenv.config();

const jobs = [
  {
    title: 'Fix leaking kitchen faucet',
    description: 'Kitchen faucet drips continuously and needs repair or replacement.',
    category: 'Plumbing',
    location: 'Maple Street, Austin',
    contactName: 'Olivia Carter',
    contactEmail: 'olivia@example.com',
    status: 'Open'
  },
  {
    title: 'Paint two-bedroom apartment',
    description: 'Need interior walls painted in neutral colors before move-in.',
    category: 'Painting',
    location: 'Downtown Dallas',
    contactName: 'Marcus Lee',
    contactEmail: 'marcus@example.com',
    status: 'In Progress'
  },
  {
    title: 'Install ceiling fans',
    description: 'Three ceiling fans need to be installed in bedrooms.',
    category: 'Electrical',
    location: 'North Houston',
    contactName: 'Sarah Nguyen',
    contactEmail: 'sarah@example.com',
    status: 'Closed'
  }
];

const seed = async () => {
  try {
    await connectDB();
    await JobRequest.deleteMany();
    await JobRequest.insertMany(jobs);
    console.log('Seed data inserted');
    process.exit(0);
  } catch (error) {
    console.error(`Seed failed: ${error.message}`);
    process.exit(1);
  }
};

seed();