import React from "react"
import { useAuth } from "../context/store.tsx"

export default function Nav() {
  const { logout } = useAuth()
  return (
    <div>
      <button onClick={() => logout()}>logout</button>
    </div>
  )
}
