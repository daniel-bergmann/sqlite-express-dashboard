import React, { useEffect } from "react"
import LoginForm from "./LoginForm"
import { useAuth } from "../context/store"
export default function Home() {
  const { token } = useAuth()
  useEffect(() => {
    if (token) {
      window.location.href = "/dashboard"
    }
  }, [token])
  return (
    <div>
      <LoginForm />
    </div>
  )
}
