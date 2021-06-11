import { put, takeLatest } from 'redux-saga/effects';
import { Musics } from 'store/constants';
// import { request } from "utils/request";
import { musicActions as actions } from './';

export function* getMusics() {
  // yield delay(500);
  yield put(actions.musicsLoaded(Musics));
}

/**
 * Root saga manages watcher lifecycle
 */
export function* musicSaga() {
  yield takeLatest(actions.loadMusics.type, getMusics);
}
