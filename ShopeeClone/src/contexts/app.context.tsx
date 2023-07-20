import { createContext } from 'react'

interface AppContextInterface {
  isAuthenticated: boolean
  setAuthenticated: () => void
}

export const AppContext = createContext<AppContextInterface>
