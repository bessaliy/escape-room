import {ReactElement, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../../../store';
import {fetchReservations} from '../../../store/api-actions.ts';
import {getReservationError, getReservationLoading, getReservations} from '../../../store/selectors.ts';
import ReservationCard from './reservation-card.tsx';
import {clearReservationsError} from '../../../store/reservations/reservation-slice.ts';
import Spinner from '../../ui/spinner/spinner.tsx';

function MyQuestsPage(): ReactElement {
  const dispatch = useDispatch<AppDispatch>();
  const reservations = useSelector(getReservations);
  const error = useSelector(getReservationError);
  const isLoading = useSelector(getReservationLoading);

  useEffect(() => {
    dispatch(clearReservationsError());
    dispatch(fetchReservations());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <main className="page-content decorated-page">
      <div className="decorated-page__decor" aria-hidden="true">
        <picture>
          <source type="image/webp" srcSet="/img/content/maniac/maniac-bg-size-m.webp, /img/content/maniac/maniac-bg-size-m@2x.webp 2x"/>
          <img src="/img/content/maniac/maniac-bg-size-m.jpg" srcSet="/img/content/maniac/maniac-bg-size-m@2x.jpg 2x" width="1366" height="1959" alt=""/>
        </picture>
      </div>
      <div className="container">
        <div className="page-content__title-wrapper">
          <h1 className="title title--size-m page-content__title">Мои бронирования</h1>
        </div>
        {reservations.length === 0 ? (
          <span
            className='title title--size-s title--uppercase'
            style={{textAlign: 'center', marginTop: '250px'}}
          >
            Доступных бронирований нет
          </span>
        ) : (
          <div className="cards-grid">
            {reservations.map((reservation) => (
              <ReservationCard
                key={reservation.id}
                reservation={reservation}
              />
            ))}
          </div>
        )}

        {error && <p style={{color: 'red'}}>{error}</p>}
      </div>
    </main>
  );
}

export default MyQuestsPage;
