import {ReactElement, useEffect, useState} from 'react';
import {AppDispatch} from '../../../store';
import {useDispatch, useSelector} from 'react-redux';
import {fetchQuests} from '../../../store/api-actions.ts';

import QuestList from './quest-list.tsx';
import QuestFilter from './quest-filter.tsx';

import {getQuests} from '../../../store/selectors.ts';

function MainPage(): ReactElement {
  const dispatch = useDispatch<AppDispatch>();
  const [activeType, setActiveType] = useState('all');
  const [activeLevel, setActiveLevel] = useState('any');

  const quests = useSelector(getQuests);

  const filteredQuests = quests.filter((quest) => {
    const matchType = activeType === 'all' || quest.type === activeType;
    const matchLevel = activeLevel === 'any' || quest.level === activeLevel;

    return matchType && matchLevel;
  });

  useEffect(() => {
    dispatch(fetchQuests());
  }, [dispatch]);

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
      <QuestList
        quests={filteredQuests}
      />
    </main>
  );
}

export default MainPage;
