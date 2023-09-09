import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '../services/interface'
import { ROLES } from '../services/constants'

export interface UserState {
  user: User|null
  setUser: (userData: User) => void
  isAuth: () => boolean
  clear: () => void
  isAdmin: () => boolean
  isAuditor: () => boolean
  isOperator: () => boolean
}

export const useUserStore = create<UserState>()(persist(
  (set, get) => ({
      user: null,
      setUser: (userData: User) => set(() => ({ user: userData })),
      clear: () => set(() => ({ user: null })),
      isAuth: () => get().user !== null,
      isAdmin: () => get().user?.Role?.name === ROLES.ADMIN,
      isAuditor: () => get().user?.Role?.name === ROLES.AUDITOR,
      isOperator: () => get().user?.Role?.name === ROLES.OPERATOR
  }),
  {
    name: 'user'
  }
))