import React, { useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import type { ControllerRenderProps } from 'react-hook-form';
import '../styles/modal.scss';
import CalendarIcon from '../icon/calendar.svg';

interface ContractFormData {
  name?: string;
  number: string;
  company: string;
  dateCreated: Date;
  startDate: Date;
  expiryDate: Date;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: SubmitHandler<ContractFormData>;
}

const schema = yup.object().shape({
  name: yup.string().optional(),
  number: yup.string().required('Contract number is required'),
  company: yup.string().required('Company is required'),
  dateCreated: yup.date().required('Date created is required'),
  startDate: yup.date().required('Start date is required'),
  expiryDate: yup
    .date()
    .required('Expiry date is required')
    .min(yup.ref('startDate'), 'Expiry date must be after start date'),
});

const Modal: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ContractFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      number: '',
      company: '',
      dateCreated: new Date(),
      startDate: new Date(),
      expiryDate: new Date(),
    },
  });

  // Скидаємо форму при кожному відкриванні модалки
  useEffect(() => {
    if (isOpen) {
      reset({
        name: '',
        number: '',
        company: '',
        dateCreated: new Date(),
        startDate: new Date(),
        expiryDate: new Date(),
      });
    }
  }, [isOpen, reset]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="contract-modal" onClick={(e) => e.stopPropagation()}>
        <h2>New Contract</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <div className="form-group">
              <label>Contract Name (optional)</label>
              <input {...register('name')} placeholder="New Contract" />
              {errors.name && <span className="error">{errors.name.message}</span>}
            </div>
            <div className="form-group">
              <label>Contract Number</label>
              <input {...register('number')} placeholder="C20220420-000001" />
              {errors.number && <span className="error">{errors.number.message}</span>}
            </div>
          </div>

          <div className="form-group full-width">
            <label>Company</label>
            <input {...register('company')} placeholder="Shell" />
            {errors.company && <span className="error">{errors.company.message}</span>}
          </div>

          <div className="form-row three-col">
            <div className="form-group">
              <label>Date Created</label>
              <div className="datepicker-input-wrapper">
                <Controller
                  name="dateCreated"
                  control={control}
                  render={({ field }: { field: ControllerRenderProps<ContractFormData, 'dateCreated'> }) => (
                    <DatePicker
                      selected={field.value}
                      onChange={field.onChange}
                      dateFormat="dd-MMM-yyyy"
                      className="date-input"
                    />
                  )}
                />
                <img src={CalendarIcon} alt="calendar" className="calendar-icon" />
              </div>
              {errors.dateCreated && <span className="error">{errors.dateCreated.message}</span>}
            </div>
            <div className="form-group">
              <label>Start Date</label>
              <div className="datepicker-input-wrapper">
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field }: { field: ControllerRenderProps<ContractFormData, 'startDate'> }) => (
                    <DatePicker
                      selected={field.value}
                      onChange={field.onChange}
                      dateFormat="dd-MMM-yyyy"
                      className="date-input"
                    />
                  )}
                />
                <img src={CalendarIcon} alt="calendar" className="calendar-icon" />
              </div>
              {errors.startDate && <span className="error">{errors.startDate.message}</span>}
            </div>
            <div className="form-group">
              <label>Expiry Date</label>
              <div className="datepicker-input-wrapper">
                <Controller
                  name="expiryDate"
                  control={control}
                  render={({ field }: { field: ControllerRenderProps<ContractFormData, 'expiryDate'> }) => (
                    <DatePicker
                      selected={field.value}
                      onChange={field.onChange}
                      dateFormat="dd-MMM-yyyy"
                      className="date-input"
                    />
                  )}
                />
                <img src={CalendarIcon} alt="calendar" className="calendar-icon" />
              </div>
              {errors.expiryDate && <span className="error">{errors.expiryDate.message}</span>}
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="create-btn">
              Create Contract
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;