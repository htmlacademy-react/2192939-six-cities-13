import { AppDispatch, State } from '../store/state';
import { AxiosInstance } from 'axios';
import { AuthData } from './auth-data';

export type V = void;

export type U = undefined;

export type A = AuthData;

export type C = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};
