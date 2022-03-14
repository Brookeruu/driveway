import { useState,useEffect } from 'react';
import ServiceCard from './library/Card';
import './Services.css';

const Services = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);

  const handleUpdateAppointments = (appointmentId: string) => {
    setAppointments(appointments.filter((appointment) => appointment.id !== appointmentId));
  };
  
  useEffect(() => {
    fetch('/services')
      .then((res) => {
        return res.json();
      })
        .then((data) => {
          setServices(data);
        })
          .catch((error) => console.log('There was an error! ', error));
  }, []);

  useEffect(() => {
    fetch('/appointments')
    .then((res) => {
      return res.json();
    })
      .then((data) => {
        setAppointments(data);
      })
        .catch((error) => console.log('There was an error! ', error));
  }, []);

  return (
    <div className="scheduler">
      <h1 className="heading">Select a Service</h1>
        {
          services && (
            services.map((service) => (
              <ServiceCard
                service={service}
                key={service.id}
                appointments={appointments.filter((appointment) => appointment.serviceId === service.id)}
                handleUpdateAppointments={handleUpdateAppointments}
              />
            ))
          )
        }
    </div>
  );
};

export default Services;
