import { notFound } from 'next/navigation';
import JobDetail from '../../../components/JobDetail';

function isValidObjectId(value) {
  return typeof value === 'string' && /^[a-fA-F0-9]{24}$/.test(value);
}

export default async function JobDetailPage({ params }) {
  const resolvedParams = await params;
  const jobId = resolvedParams?.id;

  if (!jobId || !isValidObjectId(jobId)) {
    notFound();
  }

  return <JobDetail id={jobId} />;
}