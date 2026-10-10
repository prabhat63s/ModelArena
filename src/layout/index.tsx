import type React from "react"
import Header from "./Header"
import Auth from "./Auth"

type Props = Readonly<{
  children: React.ReactNode
}>

const Layout = ({ children }: Props) => {
  return (
    <Auth>
      <Header />
      <main className="flex-1 min-h-0 flex flex-col overflow-y-auto no-scrollbar">
        {children}
      </main>
    </Auth>
  )
}

export default Layout
