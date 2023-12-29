import React, { createContext, useContext, useState, ReactNode } from "react"
import Cookies from "js-cookie"

interface AuthContextProps {
  token: string | null
  login: (newToken: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(
    Cookies.get("token") || null
  )

  const login = (newToken: string) => {
    setToken(newToken)
    Cookies.set("token", newToken, {
      expires: 3,
      path: "/",
      //   uncomment the following lines if you're using HTTPS
      //   secure: true,
      //   httpOnly: true,
    })
  }

  const logout = () => {
    setToken(null)
    Cookies.remove("token")
    window.location.href = "/"
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}
