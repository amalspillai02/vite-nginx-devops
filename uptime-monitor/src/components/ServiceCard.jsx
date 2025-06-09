import React from 'react';

function ServiceCard({ service }) {
  return (
    <div className="border p-4 mb-2 rounded shadow">
      <h2 className="text-xl font-semibold">{service.name}</h2>
      <p>Status: <span className={service.status === 'Up' ? 'text-green-600' : 'text-red-600'}>{service.status}</span></p>
      <p>Response Time: {service.time} ms</p>
      <p>Last Checked: {service.lastChecked}</p>
    </div>
  );
}

export default ServiceCard;
