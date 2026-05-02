import {createSlice} from '@reduxjs/toolkit';
import {DetailedQuest} from '../../types/quest.ts';
import {fetchDetailedQuest} from '../api-actions.ts';


type DetailedQuestState = {
  detailedQuest: DetailedQuest | null;
  isQuestLoading: boolean;
  error: string | null;
}

const initialState: DetailedQuestState = {
  detailedQuest: null,
  isQuestLoading: false,
  error: null,
};

const detailedQuestSlice = createSlice({
  name: 'detailedQuest',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDetailedQuest.pending, (state) => {
        state.isQuestLoading = true;
        state.error = null;
      })
      .addCase(fetchDetailedQuest.fulfilled, (state, action) => {
        state.detailedQuest = action.payload;
        state.isQuestLoading = false;
      })
      .addCase(fetchDetailedQuest.rejected, (state, action) => {
        state.detailedQuest = null;
        state.isQuestLoading = false;
        state.error = action.error.message || 'Ошибка загрузки';
      });
  },
});

export default detailedQuestSlice.reducer;
