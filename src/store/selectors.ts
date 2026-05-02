import {RootState} from './index.ts';

export const getQuests = (state: RootState) => state.quests.quests;
export const getDetailedQuest = (state: RootState) => state.detailedQuest.detailedQuest;

export const getAuthStatus = (state: RootState) => state.user.authStatus;
