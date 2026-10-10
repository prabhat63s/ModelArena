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
      <div className="flex flex-col vh-minus-100 overflow-y-scroll no-scrollbar">
        {children}
      </div>
    </Auth>
  )
}

export default Layout
