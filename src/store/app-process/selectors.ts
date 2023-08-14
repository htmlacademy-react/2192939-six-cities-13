import { NameSpace } from '../../settings';
import { State } from '../state';

export const getError = (state: State): string | null => state[NameSpace.App].error;
