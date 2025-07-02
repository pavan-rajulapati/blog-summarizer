import { useEffect } from "react";

interface LayoutProps {
    title : string;
    children : React.ReactNode
}

const Layout = ({title, children} : LayoutProps) => {

    useEffect(() => {
        document.title = title
    }, [title])
  return (
    <>
        <main className="h-screen flex flex-col gap-y-20 ">{children}</main>
    </>
  )
}

export default Layout