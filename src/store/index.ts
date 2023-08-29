import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '../services/interface'

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
      isAdmin: () => get().user?.Role?.name === 'admin',
      isAuditor: () => get().user?.Role?.name === 'auditor',
      isOperator: () => get().user?.Role?.name === 'operator'
  }),
  {
    name: 'user'
  }
))