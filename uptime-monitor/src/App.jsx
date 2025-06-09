import React, { useState, useEffect } from 'react';
import ServiceCard from './components/ServiceCard';

const services = [
  { name: 'Auth Service', url: 'http://192.168.1.9:8001/health' },
  { name: 'Product Service', url: 'http://192.168.1.9:8002/health' },
  { name: 'Order Service', url: 'http://192.168.1.9:8003/health' },
];

function App() {
  const [statuses, setStatuses] = useState([]);

  const checkServices = async () => {
    const checks = await Promise.all(services.map(async (service) => {
      const start = Date.now();
      try {
        const res = await fetch(service.url);
        const time = Date.now() - start;
        return { ...service, status: res.ok ? 'Up' : 'Down', time, lastChecked: new Date().toLocaleTimeString() };
      } catch {
        return { ...service, status: 'Down', time: '-', lastChecked: new Date().toLocaleTimeString() };
      }
    }));
    setStatuses(checks);
  };

  useEffect(() => {
    checkServices();
    const interval = setInterval(checkServices, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Service Uptime Monitor</h1>
      {statuses.map((service, i) => (
        <ServiceCard key={i} service={service} />
      ))}
    </div>
  );
}

export default App;
