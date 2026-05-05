import {createSlice} from '@reduxjs/toolkit';
import {Quest} from '../../types/quest.ts';
import {fetchQuests} from '../api-actions.ts';

type QuestsState = {
  quests: Quest[];
  isLoading: boolean;
  error: string | null;
}

const initialState: QuestsState = {
  quests: [],
  isLoading: false,
  error: null,
};

const questsSlice = createSlice({
  name: 'quests',
  initialState,
  reducers: {
    clearQuestsError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuests.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchQuests.fulfilled, (state, action) => {
        state.quests = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchQuests.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Не удалось загрузить список квестов';
      });
  },
});

export const {clearQuestsError} = questsSlice.actions;
export default questsSlice.reducer;
