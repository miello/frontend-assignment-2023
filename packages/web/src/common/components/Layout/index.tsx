import { FC } from 'react'

const Layout: FC = (props) => {
  return <div className="min-h-screen bg-white">{props.children}</div>
}

export default Layout
