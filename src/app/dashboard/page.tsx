import { loadAndMergeData } from '../../utils/dataLoader';
import Link from 'next/link';

export default async function DashboardPage() {
  // Load data server-side
  const agencies = await loadAndMergeData();

  return (
    <div>
      <h1>All Agencies</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>State</th>
            <th>Type</th>
            <th>Total Students</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {agencies.map((agency) => (
            <tr key={agency.id}>
              <td>{agency.name}</td>
              <td>{agency.state}</td>
              <td>{agency.type}</td>
              <td>{agency.total_students}</td>
              <td>
                <Link href={`/dashboard/agency/${agency.id}`}>
                  <button>View Contacts</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}