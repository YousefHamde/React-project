import Footer from './Footer'
import Logo from './Logo'
import styles from './Sidebar.module.css'
import AppNav from './AppNav'
import { Outlet } from 'react-router-dom'

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <Logo/>
      <AppNav/>
      <Outlet/>
      <Footer/>
    </aside>
  )
}
