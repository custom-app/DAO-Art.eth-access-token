import {createContext, PropsWithChildren, useContext, useState} from 'react';

export interface AuthModalContextValue {
  isAuthModalVisible: boolean,
  setIsAuthModalVisible: (v: boolean) => void,
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
  return (
    <AuthModalContext.Provider
      value={{
        isAuthModalVisible,
        setIsAuthModalVisible
      }}
    >
      {children}
    </AuthModalContext.Provider>
  )
}
