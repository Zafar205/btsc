import React, { useState } from 'react';

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
  const [jobs, setJobs] = useState<Job[]>([
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
  ]);

  // State for new job form
  const [newJob, setNewJob] = useState({
    clientName: '',
    callDateTime: '',
    maintenanceTeam: '',
    description: '',
    status: 'Dispatched' as Job['status']
  });

  // Maintenance teams (simulate fetch from Settings)
  const [maintenanceTeams] = useState<string[]>(['Team Alpha', 'Team Beta', 'Team Gamma']);

  // System/server time
  const [serverTime, setServerTime] = useState<string>(new Date().toLocaleString());
  React.useEffect(() => {
    // Simulate fetch from server
    const fetchTime = async () => {
      try {
        // Replace with actual API call if available
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
        
        const res = await fetch('https://worldtimeapi.org/api/timezone/Asia/Muscat', {
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        
        if (res.ok) {
          const data = await res.json();
          if (data.datetime) {
            setServerTime(new Date(data.datetime).toLocaleString());
          } else {
            setServerTime(new Date().toLocaleString());
          }
        } else {
          setServerTime(new Date().toLocaleString());
        }
      } catch (error) {
        console.log('Using local time as fallback:', error);
        setServerTime(new Date().toLocaleString());
      }
    };
    
    fetchTime();
    const interval = setInterval(() => {
      setServerTime(new Date().toLocaleString());
    }, 1000); // Update every second
    
    return () => clearInterval(interval);
  }, []);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [draggedJob, setDraggedJob] = useState<Job | null>(null);
  const [editingJob, setEditingJob] = useState<{ id: string; field: string } | null>(null);
  const [editingText, setEditingText] = useState('');

  // Add new job
  const addNewJob = () => {
    if (!newJob.clientName.trim() || !newJob.description.trim()) return;

    const updatedJobs = [...jobs];
    updatedJobs.push({
      id: Date.now().toString(),
      ...newJob,
      callDateTime: newJob.callDateTime || new Date().toLocaleString()
    });

    setJobs(updatedJobs);
    setNewJob({
      clientName: '',
      callDateTime: '',
      maintenanceTeam: '',
      description: '',
      status: 'Dispatched'
    });
    setShowAddForm(false);
  };

  // Remove job
  const removeJob = (jobId: string) => {
    const updatedJobs = jobs.filter(job => job.id !== jobId);
    setJobs(updatedJobs);
  };

  // Start editing
  const startEditing = (jobId: string, field: string, currentValue: string) => {
    setEditingJob({ id: jobId, field });
    setEditingText(currentValue);
  };

  // Save edited job
  const saveEditedJob = () => {
    if (!editingJob || editingText.trim() === '') return;

    const updatedJobs = jobs.map(job => {
      if (job.id === editingJob.id) {
        return {
          ...job,
          [editingJob.field]: editingText.trim()
        };
      }
      return job;
    });

    setJobs(updatedJobs);
    setEditingJob(null);
    setEditingText('');
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingJob(null);
    setEditingText('');
  };

  // Drag and drop handlers
  const handleDragStart = (job: Job) => {
    setDraggedJob(job);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, newStatus: Job['status']) => {
    e.preventDefault();
    if (!draggedJob || draggedJob.status === newStatus) return;

    const updatedJobs = jobs.map(job => {
      if (job.id === draggedJob.id) {
        return { ...job, status: newStatus };
      }
      return job;
    });

    setJobs(updatedJobs);
    setDraggedJob(null);
  };

  const getJobsByStatus = (status: Job['status']) => {
    return jobs.filter(job => job.status === status);
  };

  const getStatusColor = (status: Job['status']) => {
    switch (status) {
      case 'Dispatched':
        return 'bg-blue-200 border-blue-300';
      case 'Inspection':
        return 'bg-amber-200 border-amber-300';
      case 'Repairing':
        return 'bg-orange-200 border-orange-300';
      case 'Completed':
        return 'bg-green-200 border-green-300';
      default:
        return 'bg-gray-200 border-gray-300';
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
    <div 
      className={`p-4 rounded-lg border-2 mb-3 ${getStatusColor(job.status)} hover:shadow-md transition-shadow duration-200 cursor-move group`}
      draggable={!editingJob || editingJob.id !== job.id}
      onDragStart={() => handleDragStart(job)}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          {editingJob && editingJob.id === job.id && editingJob.field === 'clientName' ? (
            <input
              type="text"
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
              className="w-full p-1 bg-white border border-gray-300 rounded text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) => {
                if (e.key === 'Enter') saveEditedJob();
                if (e.key === 'Escape') cancelEditing();
              }}
              autoFocus
            />
          ) : (
            <h4 
              className="font-semibold text-gray-900 cursor-pointer hover:text-blue-600"
              onClick={() => startEditing(job.id, 'clientName', job.clientName)}
            >
              {job.clientName}
            </h4>
          )}
        </div>
        <div className="flex items-center gap-1 ml-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(job.status)}`}>
            {job.status}
          </span>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {editingJob && editingJob.id === job.id ? (
              <>
                <button
                  onClick={saveEditedJob}
                  className="text-green-600 hover:text-green-500 transition-colors duration-200 p-1"
                  title="Save changes"
                >
                  ✓
                </button>
                <button
                  onClick={cancelEditing}
                  className="text-red-600 hover:text-red-500 transition-colors duration-200 p-1"
                  title="Cancel editing"
                >
                  ✕
                </button>
              </>
            ) : (
              <button
                onClick={() => removeJob(job.id)}
                className="text-red-600 hover:text-red-500 transition-colors duration-200 p-1"
                title="Remove job"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>
      
      <div className="mb-2">
        {editingJob && editingJob.id === job.id && editingJob.field === 'description' ? (
          <textarea
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
            className="w-full p-1 bg-white border border-gray-300 rounded text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                saveEditedJob();
              }
              if (e.key === 'Escape') cancelEditing();
            }}
            autoFocus
          />
        ) : (
          <p 
            className="text-sm text-gray-600 cursor-pointer hover:text-blue-600"
            onClick={() => startEditing(job.id, 'description', job.description)}
          >
            {job.description}
          </p>
        )}
      </div>
      
      <div className="space-y-1">
        <p className="text-xs text-gray-500">
          <span className="font-medium">Call Time:</span> 
          {editingJob && editingJob.id === job.id && editingJob.field === 'callDateTime' ? (
            <input
              type="text"
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
              className="ml-1 p-1 bg-white border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) => {
                if (e.key === 'Enter') saveEditedJob();
                if (e.key === 'Escape') cancelEditing();
              }}
              autoFocus
            />
          ) : (
            <span 
              className="ml-1 cursor-pointer hover:text-blue-600"
              onClick={() => startEditing(job.id, 'callDateTime', job.callDateTime)}
            >
              {job.callDateTime}
            </span>
          )}
        </p>
        <p className="text-xs text-gray-500">
          <span className="font-medium">Team:</span> 
          {editingJob && editingJob.id === job.id && editingJob.field === 'maintenanceTeam' ? (
            <input
              type="text"
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
              className="ml-1 p-1 bg-white border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) => {
                if (e.key === 'Enter') saveEditedJob();
                if (e.key === 'Escape') cancelEditing();
              }}
              autoFocus
            />
          ) : (
            <span 
              className="ml-1 cursor-pointer hover:text-blue-600"
              onClick={() => startEditing(job.id, 'maintenanceTeam', job.maintenanceTeam)}
            >
              {job.maintenanceTeam}
            </span>
          )}
        </p>
      </div>
    </div>
  );

  const statuses: Job['status'][] = ['Dispatched', 'Inspection', 'Repairing', 'Completed'];

  return (
    // <Layout>
      <div className="bg-white">
        {/* System/server time display */}
        <div className="px-6 pt-4 pb-2 text-right text-xs text-gray-500">
          <span>System Time: {serverTime}</span>
        </div>
        {/* Stats Overview */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {statuses.map((status) => {
            const count = getJobsByStatus(status).length;
            return (
              <div key={status} className={`p-4 rounded-lg border ${getStatusColor(status)} relative`}
                style={{ borderRight: '3px dashed #cbd5e1' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{status}</p>
                    <p className="text-2xl font-bold text-gray-900">{count}</p>
                  </div>
                  <div className={`p-2 rounded-full ${getStatusBadgeColor(status)}`}>
                    {status === 'Dispatched' && (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11C5.84 5 5.28 5.42 5.08 6.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                      </svg>
                    )}
                    {status === 'Inspection' && (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M15.5 14h-.79l-.28-.27A6.5 6.5 0 1 0 13.16 15.28l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                      </svg>
                    )}

                    {status === 'Repairing' && (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5a3.5,3.5 0 0,1 3.5,3.5A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"/>
                      </svg>
                    )}
                    {status === 'Completed' && (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
                {/* <div className="absolute left-0 bottom-0 w-full text-center text-[10px] text-gray-400 pt-2">
                  <span>Drag jobs here to update status</span>
                </div> */}
              </div>
            );
          })}
        </div>

        {/* Add New Job Form */}
        {showAddForm && (
          <div className="mb-8 bg-white rounded-lg shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add New Job</h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                <input
                  type="text"
                  value={newJob.clientName}
                  onChange={(e) => setNewJob({ ...newJob, clientName: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter client name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Maintenance Team</label>
                <select
                  value={newJob.maintenanceTeam}
                  onChange={(e) => setNewJob({ ...newJob, maintenanceTeam: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select team</option>
                  {maintenanceTeams.map((team) => (
                    <option key={team} value={team}>{team}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Call Date & Time</label>
                <input
                  type="text"
                  value={newJob.callDateTime}
                  onChange={(e) => setNewJob({ ...newJob, callDateTime: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 2025-08-13 10:30 AM"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={newJob.status}
                  onChange={(e) => setNewJob({ ...newJob, status: e.target.value as Job['status'] })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newJob.description}
                  onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter job description"
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={addNewJob}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Add Job
              </button>
            </div>
          </div>
        )}

        {/* Add Job Button */}
        {!showAddForm && (
          <div className="mb-8 text-center">
            <button
              onClick={() => setShowAddForm(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Job
            </button>
          </div>
        )}

        {/* Kanban Board */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 ">
          {statuses.map((status) => (
            <div 
              key={status} 
              className="bg-gray-300 rounded-lg p-4"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, status)}
            >
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
