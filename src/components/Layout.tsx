import { Outlet } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'
import NewsTicker from './NewsTicker'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <NewsTicker />
      <Nav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
