import React, { useState }from 'react';
import { Service, Appointment, UserAppointment } from '../../server/index';
import Button from './Button';
import Modal from './Modal';
import './Form.css';

type Props = {
  service: Service,
  appointments: Appointment[],
  handleUpdateAppointments: any
};

const Form = ({ service, appointments, handleUpdateAppointments }: Props) => {
  const [checkedId, setCheckedId] = useState('');
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState({});
  const [displayModal, setDisplayModal] = useState<boolean>(false);
  const [apptDetails, setApptDetails] = useState<UserAppointment>();
  
  const dateSanitizer = (date: string) => {
    const newDate = new Date(date);
    const sanitizedDate = newDate.toLocaleDateString(undefined,  { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    return sanitizedDate;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedId(e.target.value);
    setIsChecked(true);
  };
  
  const handleUserInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value }  = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userInfo)
    }

    fetch(`/appointments/${checkedId}`, requestOptions)
      .then(res => res.json())
        .then((data) => {
          handleUpdateAppointments(checkedId);
          setIsChecked(false);
          setUserInfo({});
          setDisplayModal(true);
          setApptDetails(data);
      });
  };

  const closeModal = () => {
    setDisplayModal(false);
  }

  const nestedForm = (
    <div className="nested-form">
      <p>A few more details...</p>
      <div className="input">
        <label>Email</label>
        <input type="text" name="email" onChange={(e) => handleUserInfo(e)}/>
      </div>
      <div className="input">
        <label>Name</label>
        <input type="text" name="customerName" onChange={(e) => handleUserInfo(e)}/>
      </div>
      <div className="input">
        <label>Vehicle Make</label>
        <input type="text" name="make" onChange={(e) => handleUserInfo(e)}/>
      </div>
      <div className="input">
        <label>Vehicle Model</label>
        <input type="text" name="model" onChange={(e) => handleUserInfo(e)}/>
      </div>
      <div className="input">
        <label>Vehicle Model Year</label>
        <input type="text" name="modelYear" onChange={(e) => handleUserInfo(e)}/>
      </div>
    </div>
  );

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <fieldset className="fieldset">
          <legend className="legend">Available Appointments</legend>
          {
            appointments && (
              appointments.map((appointment: any) => (
                <div className="input" key={appointment.id}>
                  <input
                    type='radio'
                    name={service.name}
                    value={appointment.id}
                    id={appointment.id}
                    onChange={(e) => handleChange(e)}
                  />
                  <label>{dateSanitizer(appointment.start)}</label>
                </div>
              ))
            )
          }
          { isChecked && nestedForm }
        </fieldset>
        <Button disabled={!isChecked}>
          Book Now
        </Button>
      </form>
      {
        displayModal && <Modal closeModal={closeModal} userInfo={apptDetails} />
      }
    </div>
  )
}

export default Form;
