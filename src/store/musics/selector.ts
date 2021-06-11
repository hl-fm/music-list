// tslint:disable: typedef
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from '.';

// first select the relevant part from the state
const selectRootState = (state: RootState) => state.musics || initialState;

export const selectMusics = createSelector(
  [selectRootState],
  musicState => musicState.musics,
);
