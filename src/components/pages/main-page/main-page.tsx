import {ReactElement, useEffect, useState} from 'react';
import {AppDispatch} from '../../../store';
import {useDispatch, useSelector} from 'react-redux';
import {fetchQuests} from '../../../store/api-actions.ts';

import QuestList from './quest-list.tsx';
import QuestFilter from './quest-filter.tsx';

import {getQuests, getQuestsError, getQuestsLoading} from '../../../store/selectors.ts';
import {clearQuestsError} from '../../../store/quest/quest-slice.ts';
import Spinner from '../../ui/spinner/spinner.tsx';

function MainPage(): ReactElement {
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector(getQuestsError);
  const [activeType, setActiveType] = useState('all');
  const [activeLevel, setActiveLevel] = useState('any');

  const quests = useSelector(getQuests);
  const isLoading = useSelector(getQuestsLoading);

  const filteredQuests = quests.filter((quest) => {
    const matchType = activeType === 'all' || quest.type === activeType;
    const matchLevel = activeLevel === 'any' || quest.level === activeLevel;

    return matchType && matchLevel;
  });

  useEffect(() => {
    dispatch(clearQuestsError());
    dispatch(fetchQuests());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  let content: ReactElement;

  if (error) {
    content = <span style={{ color: 'red', marginLeft: '500px' }}>{error}</span>;
  } else if (!filteredQuests.length) {
    content = (
      <span className="title title--size-s title--uppercase">
      Квестов, доступных по данному запросу, сейчас нет
      </span>
    );
  } else {
    content = <QuestList quests={filteredQuests} />;
  }

  return (
    <main className="page-content container">
      <div className="page-content__title-wrapper">
        <h1 className="subtitle page-content__subtitle">квесты в Санкт-Петербурге
        </h1>
        <h2 className="title title--size-m page-content__title">Выберите тематику</h2>
      </div>
      <div className="page-content__item">
        <QuestFilter
          activeType={activeType}
          activeLevel={activeLevel}
          onTypeChange={setActiveType}
          onLevelChange={setActiveLevel}
        />
      </div>
      <h2 className="title visually-hidden">Выберите квест</h2>
      {content}

    </main>
  );
}

export default MainPage;
