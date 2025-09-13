import store from './store';
import { login, logout } from './userSlice';
import type { RootState } from './store';

export { store, login, logout };
export type { RootState };