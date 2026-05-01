import {ReactElement} from 'react';
import QuestCard from './quest-card.tsx';
import {Quest} from '../../../types/quest.ts';

type QuestListProps = {
  quests: Quest[];
};

function QuestList({quests}: QuestListProps): ReactElement {
  return (
    <div className="cards-grid">
      {quests.map((quest) => (
        <QuestCard
          key={quest.id}
          data={quest}
        />
      ))}
    </div>
  );
}

export default QuestList;
