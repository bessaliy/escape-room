import {ReactElement} from 'react';
import {SlotInfo} from '../../../types/booking.ts';
import {DAYS_LABELS} from '../../../const.ts';
import {UseFormRegister} from 'react-hook-form';
import {BookingForm} from '../../../types/forms.ts';

type TimeSlotsListProps = {
  title: keyof typeof DAYS_LABELS;
  items: SlotInfo[];
  register: UseFormRegister<BookingForm>;
}

function TimeSlotsList({title, items, register}: TimeSlotsListProps): ReactElement {
  return (
    <fieldset className="booking-form__date-section">
      <legend className="booking-form__date-title">{DAYS_LABELS[title]}</legend>
      <div className="booking-form__date-inner-wrapper">
        {items.map((item) => (
          <label
            className="custom-radio booking-form__date"
            key={item.time}
          >
            <input
              type="radio"
              id={`${title}-${item.time}`}
              value={`${title}|${item.time}`}
              {...register('time', {
                required: 'Выберите время',
              })}
              disabled={!item.isAvailable}
            />
            <span className="custom-radio__label">{item.time}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default TimeSlotsList;
