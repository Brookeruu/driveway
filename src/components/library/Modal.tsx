import { UserAppointment } from 'server/index';
import SuccessIcon from '../../assets/success-icon.svg';
import Button from './Button';
import './Modal.css';

type Props = {
  closeModal: any,
  userInfo?: UserAppointment
}

const Modal = ({ closeModal, userInfo }: Props) => {
  const details = {...userInfo};
  const dateSanitizer = (date: string) => {
    const newDate = new Date(date);
    const sanitizedDate = newDate.toLocaleDateString(undefined,  { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    return sanitizedDate;
  };
  return (
    <div className='modal-container'>
      <div className='modal'>
        <header className="modal--header">
          <img className="modal--image" src={SuccessIcon} alt="" />
          <h3 className="heading">Your
          Appointment is Confirmed!</h3>
        </header>
        <div>
          <p><span>Service:</span> {details.serviceName}</p>
          <p><span>Confirmation number:</span> {details.id}</p>
          <p><span>Start:</span> {details.start ? dateSanitizer(details.start) : ''}</p>
          <p><span>Duration:</span> {Math.ceil(Number(details.duration) / 60)} Minutes</p>
          <p><span>Name:</span> {details.customerName}</p>
          <p><span>Vehicle Make:</span> {details.make}</p>
          <p><span>Vehicle Model:</span> {details.model}</p>
          <p><span>Vehicle Year:</span> {details.modelYear}</p>
        </div>
        <Button onClick={() => closeModal()}>
          Close
        </Button>
      </div>

    </div>
  );
};

export default Modal;
