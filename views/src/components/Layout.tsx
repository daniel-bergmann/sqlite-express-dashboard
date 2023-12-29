import React from "react"
import Nav from "./Nav.tsx"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Nav />
      {children}
    </div>
  )
}
