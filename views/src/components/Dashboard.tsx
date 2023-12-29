import React, { useEffect } from "react"
import { useAuth } from "../context/store"
export default function Dashboard() {
  const { token } = useAuth()
  useEffect(() => {
    if (!token) {
      window.location.href = "/"
    }
  }, [token])
  return <>{token && <h1>Dashboard</h1>}</>
}
