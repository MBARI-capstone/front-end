import { atom } from 'jotai';

type UserRoleType = 'user' | 'employee' | 'coordinator' | 'admin' | null;

export const userRoleAtom = atom(null);
