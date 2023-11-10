import { atom } from 'jotai'

export const UserRoleType = {
  REGISTERED_USER: 'Registered User',
  MBARI_EMPLOYEE: 'MBARI Employee',
  LOGISTICS_COORDINATOR: 'Logistics Coordinator',
  ADMIN: 'Admin',
} as const

export type UserRoleType = (typeof UserRoleType)[keyof typeof UserRoleType]
export const userRoleAtom = atom<UserRoleType | null>(null)
