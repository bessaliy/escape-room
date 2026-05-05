import {ReactElement, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {Navigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../../../store';
import {getDetailedQuest, getDetailedQuestError, getDetailedQuestLoading} from '../../../store/selectors.ts';
import {QUEST_FILTER, AppRoute, LEVEL_LABELS} from '../../../const.ts';
import {fetchDetailedQuest} from '../../../store/api-actions.ts';
import Spinner from '../../ui/spinner/spinner.tsx';
import {clearDetailedQuestError} from '../../../store/detailed-quest/detailed-quest-slice.ts';

function QuestPage(): ReactElement {
  const {id} = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const detailedQuest = useSelector(getDetailedQuest);
  const error = useSelector(getDetailedQuestError);
  const isLoading = useSelector(getDetailedQuestLoading);

  useEffect(() => {
    if (id) {
      dispatch(clearDetailedQuestError());
      dispatch(fetchDetailedQuest(id));
    }
  }, [id, dispatch]);

  if (!id) {
    return <Navigate to={AppRoute.NotFound}/>;
  }
  if (error) {
    return <span className="title title--size-s" style={{color: 'red', textAlign: 'center'}}>{error}</span>;
  }

  if (isLoading || !detailedQuest) {
    return <Spinner/>;
  }

  const [peopleMin, peopleMax] = detailedQuest.peopleMinMax;

  return (
    <main className="decorated-page quest-page">
      <div className="decorated-page__decor" aria-hidden="true">
        <picture>
          <source type="image/webp" srcSet={detailedQuest.coverImgWebp}/>
          <img
            src={detailedQuest.coverImg}
            width="1366"
            height="768"
            alt={detailedQuest.title}
          />
        </picture>
      </div>
      <div className="container container--size-l">
        <div className="quest-page__content">
          <h1 className="title title--size-l title--uppercase quest-page__title">{detailedQuest.title}</h1>
          <p className="subtitle quest-page__subtitle">
            <span className="visually-hidden">Жанр:</span>
            {QUEST_FILTER[detailedQuest.type].label}
          </p>
          <ul className="tags tags--size-l quest-page__tags">
            <li className="tags__item">
              <svg width="11" height="14" aria-hidden="true">
                <use href="#icon-person"></use>
              </svg>
              {peopleMin}&ndash;{peopleMax}&nbsp;чел
            </li>
            <li className="tags__item">
              <svg width="14" height="14" aria-hidden="true">
                <use href="#icon-level"></use>
              </svg>
              {LEVEL_LABELS[detailedQuest.level]}
            </li>
          </ul>
          <p className="quest-page__description">{detailedQuest.description}</p>
          <Link className="btn btn--accent btn--cta quest-page__btn" to={`/quest/${id}/booking`}>Забронировать</Link>
        </div>
      </div>
    </main>
  );
}

export default QuestPage;
