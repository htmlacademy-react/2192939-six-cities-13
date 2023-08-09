import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../settings';
import { appProcess } from './app-process/app-process';
import { appData } from './app-data/app-data';
import { userProcess } from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.App]: appProcess.reducer,
  [NameSpace.Data]: appData.reducer,
  [NameSpace.User]: userProcess.reducer
});
