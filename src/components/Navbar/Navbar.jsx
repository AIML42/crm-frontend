import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../redux/authSlice'
import styles from './Navbar.module.css'
import { Icon } from "@iconify/react";

const Navbar = () => {
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <Link to="/" className={styles.logo}>
                    <Icon className={styles.icon} icon="bi:cloud-haze2"></Icon>
                    <h1>Hubly</h1>
                </Link>
                <div className={styles.links}>
                    {user ? (
                        <>
                            <Link to="/dashboard" className={styles.link}>
                                Dashboard
                            </Link>
                            <button onClick={handleLogout} className={styles.link}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className={styles.login}>
                                Login
                            </Link>
                            <Link to="/signup" className={styles.signup}>
                                Sign Up
                            </Link>

                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar