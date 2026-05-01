import {QUEST_LEVELS, QUEST_TYPES} from '../const.ts';

type QuestLevel = typeof QUEST_LEVELS[keyof typeof QUEST_LEVELS];
type QuestType = typeof QUEST_TYPES[keyof typeof QUEST_TYPES];

export type Quest = {
  id: string;
  title: string;
  previewImg: string;
  previewImgWebp: string;
  level: QuestLevel;
  type: QuestType;
  peopleMinMax: [number, number];
};

export type DetailedQuest = Quest & {
  description: string;
  coverImg: string;
  coverImgWebp: string;
};
