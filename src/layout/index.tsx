import type React from "react"
import Header from "./Header"
import SideBar from "./SideBar"
import Auth from "./Auth"

type Props = Readonly<{
  children: React.ReactNode
}>

const Layout = ({ children }: Props) => {
  return (
    <Auth>
      <Header />
      <div className="flex-1 min-h-0 flex flex-col md:flex-row gap-4 md:gap-6 pb-4 md:pb-6 overflow-y-auto md:overflow-hidden no-scrollbar">
        <SideBar />
        {children}
      </div>
    </Auth>
  )
}

export default Layout
