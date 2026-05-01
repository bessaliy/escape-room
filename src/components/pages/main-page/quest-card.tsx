import {ReactElement} from 'react';
import {Link} from 'react-router-dom';
import {Quest} from '../../../types/quest.ts';

import {LEVEL_LABELS} from '../../../const.ts';

type QuestCardProps = {
  data: Quest;
};
function QuestCard({data}: QuestCardProps): ReactElement {
  const [peopleMin, peopleMax] = data.peopleMinMax;
  return (
    <div className="quest-card">
      <div className="quest-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={data.previewImgWebp}
          />
          <img
            src={data.previewImg}
            width="344"
            height="232"
            alt={data.title}
          />
        </picture>
      </div>
      <div className="quest-card__content">
        <div className="quest-card__info-wrapper">
          <Link
            className="quest-card__link"
            to={`/quest/${data.id}`}
          >
            {data.title}
          </Link>
        </div>
        <ul className="tags quest-card__tags">
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
            {LEVEL_LABELS[data.level]}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default QuestCard;
