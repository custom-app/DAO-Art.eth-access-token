import {createContext, PropsWithChildren, useContext, useState} from 'react';

export type AuthState = 'ok' | 'no' | 'pending'

export interface AuthModalContextValue {
  isAuthModalVisible: boolean,
  setIsAuthModalVisible: (v: boolean) => void,
  authState: 'ok' | 'no' | 'pending',
  setAuthState: (v: AuthState) => void,
}

export const AuthModalContext = createContext<AuthModalContextValue | undefined>(undefined)

export function useAuthModalContext(): AuthModalContextValue {
  const context = useContext(AuthModalContext)
  if (!context) {
    throw Error('provide AuthModalContext using AuthModalContextProvider');
  }
  return context
}

export function AuthModalContextProvider({children}: PropsWithChildren<{}>): JSX.Element {
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false)
  const [authState, setAuthState] = useState<AuthState>('no')
  return (
    <AuthModalContext.Provider
      value={{
        isAuthModalVisible,
        setIsAuthModalVisible,
        authState,
        setAuthState,
      }}
    >
      {children}
    </AuthModalContext.Provider>
  )
}
