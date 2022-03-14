import React from 'react';
import { Service, Appointment } from '../../server/index';
import OilChangeIcon from '../../assets/oil-change-icon.svg';
import TiresIcon from '../../assets/tires-icon.svg';
import DetailIcon from '../../assets/detail-icon.svg';
import Form from './Form';
import './Card.css';

type Props = {
  service: Service,
  appointments: Appointment[],
  handleUpdateAppointments: any
};

const Card = ({ service, appointments, handleUpdateAppointments }: Props) => {
  const setIcon = (id: number) => {
    switch(id) {
      case 1:
        return OilChangeIcon;
      case 2:
        return TiresIcon;
      case 3:
        return TiresIcon;
      case 4:
        return DetailIcon;
      default:
        return DetailIcon;
    }
  }
  return (
    <div className='service-card' key={service.id}>
      <span className="service-card__header">
        {service.id && (
          <img className="image--icon" src={setIcon(service.id)} alt="" />
          )
        }
        <h2 className='heading'>{service.name}</h2>
      </span>
      <Form
        service={service}
        appointments={appointments}
        handleUpdateAppointments={handleUpdateAppointments}
      />
    </div>
  )
}

export default Card;
