import {ReactElement, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  getBookingSendingState,
  getBookingSlots,
  getBookingSlotsLoading,
  getDetailedQuest
} from '../../../store/selectors.ts';
import {useParams} from 'react-router-dom';
import {AppDispatch} from '../../../store';
import {fetchDetailedQuest, fetchBookingSlots, sendBooking} from '../../../store/api-actions.ts';
import Spinner from '../../ui/spinner/spinner.tsx';
import TimeSlotsList from './time-slots-list.tsx';
import Map from '../../map/map.tsx';
import {BookingDate, BookingRequest, Location} from '../../../types/booking.ts';
import {BookingForm} from '../../../types/forms.ts';
import {useForm} from 'react-hook-form';
import {validName, validPhone} from '../../../const.ts';

function BookingPage(): ReactElement {
  const {id} = useParams<{id: string}>();
  const detailedQuest = useSelector(getDetailedQuest);
  const allBookingSlots = useSelector(getBookingSlots);
  const isLoading = useSelector(getBookingSlotsLoading);
  const isSending = useSelector(getBookingSendingState);

  const [activeLocation, setActiveLocation] = useState<Location | null>(null);
  const selectedSlot = allBookingSlots.find((slot) => slot.location.address === activeLocation?.address) ?? allBookingSlots[0];

  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
    resetField,
  } = useForm<BookingForm>();

  useEffect(() => {
    if (!detailedQuest || detailedQuest.id !== id) {
      if (id) {
        dispatch(fetchDetailedQuest(id));
      }
    }
  }, [id, detailedQuest, dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(fetchBookingSlots(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (allBookingSlots.length) {
      const isValid = allBookingSlots.some(
        (slot) => slot.location.address === activeLocation?.address
      );

      if (!isValid) {
        setActiveLocation(allBookingSlots[0].location);
      }
    }

    resetField('time');
  }, [allBookingSlots]);

  if (isLoading || !allBookingSlots.length || !detailedQuest || !id) {
    return <Spinner />;
  }
  const [minPeopleCount, maxPeopleCount] = detailedQuest.peopleMinMax;
  const handleFormSubmit = (data: BookingForm) => {
    const [date, time] = data.time.split('|') as [BookingDate, string];

    const payload: BookingRequest = {
      date,
      time,
      contactPerson: data.contactPerson,
      phone: data.phone,
      withChildren: data.withChildren,
      peopleCount: data.peopleCount,
      placeId: data.placeId,
    };

    dispatch(sendBooking({
      questId: id,
      bookingData: payload,
    }))
      .unwrap()
      .then(() => {
        reset();
      });
  };
  return (
    <main className="page-content decorated-page">
      <div className="decorated-page__decor" aria-hidden="true">
        <picture>
          <source type="image/webp"
            srcSet={detailedQuest.coverImgWebp}
          />
          <img
            src={detailedQuest.coverImg}
            width="1366" height="1959" alt=""
          />
        </picture>
      </div>
      <div className="container container--size-s">
        <div className="page-content__title-wrapper">
          <h1 className="subtitle subtitle--size-l page-content__subtitle">Бронирование квеста
          </h1>
          <p className="title title--size-m title--uppercase page-content__title">{detailedQuest.title}</p>
        </div>
        <div className="page-content__item">
          <div className="booking-map">
            <Map
              bookings={allBookingSlots}
              selectedLocation={activeLocation}
              onMarkerClick={setActiveLocation}
            />
            <p className="booking-map__address">Вы&nbsp;выбрали: {selectedSlot.location.address}
            </p>
          </div>
        </div>
        <form
          className="booking-form"
          onSubmit={(evt) => {
            handleSubmit(handleFormSubmit)(evt);
          }}
          noValidate
        >
          <fieldset className="booking-form__section" disabled={isSending}>
            <legend className="visually-hidden">Выбор даты и времени</legend>
            {Object.entries(selectedSlot.slots).map(([day, items]) => (
              <TimeSlotsList
                key={day}
                title={day as keyof typeof selectedSlot.slots}
                items={items}
                register={register}
              />
            ))}
          </fieldset>
          <fieldset className="booking-form__section">
            <legend className="visually-hidden">Контактная информация</legend>
            <div className="custom-input booking-form__input">
              <label className="custom-input__label" htmlFor="name">Ваше имя</label>
              <input
                type="text"
                id="name"
                placeholder="Имя"
                {...register('contactPerson', {
                  required: 'Введите имя',
                  pattern: {
                    value: validName,
                    message: 'Некорректное имя'
                  }
                })}
              />
              {errors.contactPerson?.message && (
                <span style={{color: 'red'}}>
                  {errors.contactPerson.message}
                </span>
              )}
            </div>
            <input
              type="hidden"
              value={selectedSlot.id}
              {...register('placeId')}
            />
            <div className="custom-input booking-form__input">
              <label className="custom-input__label" htmlFor="tel">Контактный телефон</label>
              <input
                type="tel"
                id="tel"
                placeholder="Телефон"
                {...register('phone', {
                  required: 'Введите номер телефона',
                  pattern: {
                    value: validPhone,
                    message: 'Неверный номер телефона'
                  }
                })}
              />
              {errors.phone?.message && (
                <span style={{color: 'red'}}>
                  {errors.phone.message}
                </span>
              )}
            </div>
            <div className="custom-input booking-form__input">
              <label className="custom-input__label" htmlFor="person">Количество участников</label>
              <input
                type="number"
                id="person"
                placeholder="Количество участников"
                {...register('peopleCount', {
                  required: 'Введите количество участников',
                  min: {
                    value: minPeopleCount,
                    message: `Минимум ${minPeopleCount} человек`,
                  },
                  max: {
                    value: maxPeopleCount,
                    message: `Максимум ${maxPeopleCount} человек`,
                  },
                  valueAsNumber: true,
                })}
              />
              {errors.peopleCount?.message && (
                <span style={{color: 'red'}}>
                  {errors.peopleCount.message}
                </span>
              )}
            </div>
            <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--children">
              <input
                type="checkbox"
                id="children"
                {...register('withChildren')}
              />
              <span className="custom-checkbox__icon">
                <svg width="20" height="17" aria-hidden="true">
                  <use href="#icon-tick"></use>
                </svg>
              </span>
              <span className="custom-checkbox__label">Со&nbsp;мной будут дети</span>
            </label>
          </fieldset>
          <button
            className="btn btn--accent btn--cta booking-form__submit"
            type="submit"
          >
            {isSending ? 'Отправка...' : 'Забронировать'}
          </button>
          <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--agreement">
            <input
              type="checkbox"
              id="id-order-agreement"
              {...register('agreement', {
                required: 'Подтвердите, что согласны с правилами',
              })}
            />
            <span className="custom-checkbox__icon">
              <svg width="20" height="17" aria-hidden="true">
                <use href="#icon-tick"></use>
              </svg>
            </span>
            <span className="custom-checkbox__label">Я&nbsp;согласен с&nbsp;
              <a className="link link--active-silver link--underlined" href="#">правилами обработки персональных данных</a>
            &nbsp;и пользовательским соглашением
            </span>
          </label>
          {errors.agreement?.message && (
            <span style={{color: 'red'}}>
              {errors.agreement.message}
            </span>
          )}
        </form>
      </div>
    </main>
  );
}

export default BookingPage;
