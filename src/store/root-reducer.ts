import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../settings';
import { appData } from './app-data/app-data';
import { userProcess } from './user-process/user-process';
import { appProcess } from './app-process/app-process';

export const rootReducer = combineReducers({
  [NameSpace.Data]: appData.reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.App]: appProcess.reducer,
});
