/* tslint:disable: typedef */
/* tslint:disable: quotemark */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { musicSaga } from './saga';
import { Music, MusicState } from './types';

export const initialState: MusicState = {
  musics: [],
};

const slice = createSlice({
  name: 'musics',
  initialState,
  reducers: {
    loadMusics(state) {
      state.musics = [];
    },
    musicsLoaded(state, action: PayloadAction<Music[]>) {
      state.musics = action.payload;
    },
  },
});

export const { actions: musicActions, reducer } = slice;

export const useMusicSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: musicSaga });
  return { actions: slice.actions };
};
