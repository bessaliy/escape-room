import {combineReducers} from '@reduxjs/toolkit';

import bookingReducer from './booking/booking-slice.ts';
import questsReducer from './quest/quest-slice.ts';
import userReducer from './user/user-slice.ts';
import detailedQuestReducer from './detailed-quest/detailed-quest-slice.ts';

export const rootReducer = combineReducers({
  booking: bookingReducer,
  quests: questsReducer,
  user: userReducer,
  detailedQuest: detailedQuestReducer,
});
