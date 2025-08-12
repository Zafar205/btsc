import React from 'react';

interface Job {
  id: string;
  clientName: string;
  callDateTime: string;
  maintenanceTeam: string;
  description: string;
  status: 'Dispatched' | 'Inspection' | 'Repairing' | 'Completed';
}

const Dashboard: React.FC = () => {
  // Sample data for demonstration
  const jobs: Job[] = [
    {
      id: '1',
      clientName: 'Al Manar Transport',
      callDateTime: '2025-08-12 09:30 AM',
      maintenanceTeam: 'Team Alpha',
      description: 'AC compressor issue in truck #MT-001',
      status: 'Dispatched'
    },
    {
      id: '2',
      clientName: 'Oman Logistics Co.',
      callDateTime: '2025-08-12 08:15 AM',
      maintenanceTeam: 'Team Beta',
      description: 'Refrigeration unit temperature control',
      status: 'Inspection'
    },
    {
      id: '3',
      clientName: 'Fresh Food Delivery',
      callDateTime: '2025-08-11 02:45 PM',
      maintenanceTeam: 'Team Gamma',
      description: 'Condenser fan replacement',
      status: 'Repairing'
    },
    {
      id: '4',
      clientName: 'Gulf Transport Services',
      callDateTime: '2025-08-11 11:20 AM',
      maintenanceTeam: 'Team Alpha',
      description: 'Regular maintenance check',
      status: 'Completed'
    },
    {
      id: '5',
      clientName: 'Muscat Cold Chain',
      callDateTime: '2025-08-12 10:00 AM',
      maintenanceTeam: 'Team Beta',
      description: 'Emergency AC repair',
      status: 'Dispatched'
    },
    {
      id: '6',
      clientName: 'Desert Rose Logistics',
      callDateTime: '2025-08-11 04:30 PM',
      maintenanceTeam: 'Team Gamma',
      description: 'Thermostat calibration',
      status: 'Completed'
    }
  ];

  const getJobsByStatus = (status: Job['status']) => {
    return jobs.filter(job => job.status === status);
  };

  const getStatusColor = (status: Job['status']) => {
    switch (status) {
      case 'Dispatched':
        return 'bg-blue-50 border-blue-200';
      case 'Inspection':
        return 'bg-amber-50 border-amber-200';
      case 'Repairing':
        return 'bg-orange-50 border-orange-200';
      case 'Completed':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getStatusBadgeColor = (status: Job['status']) => {
    switch (status) {
      case 'Dispatched':
        return 'bg-blue-100 text-blue-800';
      case 'Inspection':
        return 'bg-amber-100 text-amber-800';
      case 'Repairing':
        return 'bg-orange-100 text-orange-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const JobCard: React.FC<{ job: Job }> = ({ job }) => (
    <div className={`p-4 rounded-lg border-2 mb-3 ${getStatusColor(job.status)} hover:shadow-md transition-shadow duration-200`}>
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-gray-900">{job.clientName}</h4>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(job.status)}`}>
          {job.status}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-2">{job.description}</p>
      <div className="space-y-1">
        <p className="text-xs text-gray-500">
          <span className="font-medium">Call Time:</span> {job.callDateTime}
        </p>
        <p className="text-xs text-gray-500">
          <span className="font-medium">Team:</span> {job.maintenanceTeam}
        </p>
      </div>
    </div>
  );

  const statuses: Job['status'][] = ['Dispatched', 'Inspection', 'Repairing', 'Completed'];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src="/logo.png" alt="BSTC Logo" className="h-10 w-auto" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">BSTC Dashboard</h1>
              <p className="text-sm text-gray-600">Breakdown Maintenance Service</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Muscat, Oman</p>
            <p className="text-sm text-gray-500">{new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {statuses.map((status) => {
            const count = getJobsByStatus(status).length;
            return (
              <div key={status} className={`p-4 rounded-lg border ${getStatusColor(status)}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{status}</p>
                    <p className="text-2xl font-bold text-gray-900">{count}</p>
                  </div>
                  <div className={`p-2 rounded-full ${getStatusBadgeColor(status)}`}>
                    {status === 'Dispatched' && (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                      </svg>
                    )}
                    {status === 'Inspection' && (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    {status === 'Repairing' && (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    )}
                    {status === 'Completed' && (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {statuses.map((status) => (
            <div key={status} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">{status}</h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(status)}`}>
                  {getJobsByStatus(status).length}
                </span>
              </div>
              <div className="space-y-3">
                {getJobsByStatus(status).map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
                {getJobsByStatus(status).length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <p className="text-sm">No jobs in this status</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
