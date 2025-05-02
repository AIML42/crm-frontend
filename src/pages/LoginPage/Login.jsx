import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login } from '../../redux/authSlice'
import './LoginStyle.css'
import sideImage from '../../assets/login_signup_side_image.png'
import { Icon } from "@iconify/react";

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.auth)
  const [formData, setFormData] = useState({ email: '', password: '' })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const validateForm = () => {
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return 'Valid email is required'
    if (!formData.password) return 'Password is required'
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationError = validateForm()
    if (validationError) {
      toast.error(validationError)
      return
    }
    try {
      await dispatch(login(formData)).unwrap()
      toast.success('Login successful')
      navigate('/dashboard')
    } catch (err) {
      console.log(err)
      toast.error(err)
    }
  }

  return (
    <div className="mainLogin">
      <div className="login">
        <Link to="/" className="logo">
          <Icon fontSize={40} icon="bi:cloud-haze2" />
          <h2>Hubly</h2>
        </Link>

        <h1 className="login-title">Sign in to your Plexify</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field">
            <label htmlFor="email" className="login-label">Username</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          <div className="login-field">
            <label htmlFor="password" className="login-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          <button 
            type="submit" 
            className="login-button" 
            disabled={loading}
            style={{ backgroundColor: formData.email && formData.password ? '#1A73E8' : '#D3D3D3' }}
          >
            {loading ? 'Logging In...' : 'Log in'}
          </button>
          <Link to="#" className="login-forgot-link">Forgot password?</Link>
        </form>
        {error && <p className="login-error">{error}</p>}
        <p className="login-signup">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
        <p className="login-footer">
          This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
        </p>
      </div>
      <div className="loginImage">
        <img src={sideImage} alt="Login side image" />
      </div>
    </div>
  )
}

export default Login