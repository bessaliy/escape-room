import {ReactElement} from 'react';
import {Reservation} from '../../../types/reservation.ts';
import {DAYS_LABELS, LEVEL_LABELS} from '../../../const.ts';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../store';
import {deleteReservation} from '../../../store/api-actions.ts';

type ReservationCardProps = {
  reservation: Reservation;
}

function ReservationCard({reservation}: ReservationCardProps): ReactElement {
  const dispatch = useDispatch<AppDispatch>();
  function handleDelete() {
    dispatch(deleteReservation(reservation.id));
  }

  return (
    <div className="quest-card">
      <div className="quest-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={reservation.quest.previewImgWebp}
          />
          <img
            src={reservation.quest.previewImg}
            width="344" height="232" alt={reservation.quest.title}
          />
        </picture>
      </div>
      <div className="quest-card__content">
        <div className="quest-card__info-wrapper">
          <Link
            className="quest-card__link"
            to={`/quest/${reservation.quest.id}`}
          >
            {reservation.quest.title}
          </Link>
          <span className="quest-card__info">{`[${DAYS_LABELS[reservation.date]},\u00A0${reservation.time}. ${reservation.location.address}]`}</span>
        </div>
        <ul className="tags quest-card__tags">
          <li className="tags__item">
            <svg width="11" height="14" aria-hidden="true">
              <use href="#icon-person"></use>
            </svg>
            {`${reservation.peopleCount}\u00A0чел`}
          </li>
          <li className="tags__item">
            <svg width="14" height="14" aria-hidden="true">
              <use href="#icon-level"></use>
            </svg>
            {LEVEL_LABELS[reservation.quest.level]}
          </li>
        </ul>
        <button
          className="btn btn--accent btn--secondary quest-card__btn"
          type="button"
          onClick={handleDelete}
        >
          Отменить
        </button>
      </div>
    </div>
  );
}

export default ReservationCard;
