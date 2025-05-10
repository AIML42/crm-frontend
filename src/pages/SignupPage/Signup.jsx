import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { signup } from '../../redux/authSlice'
import './SignupStyle.css'
import sideImage from '../../assets/login_signup_side_image.png'
import { Icon } from "@iconify/react";

const Signup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.auth)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  })

  // Prevent body scrolling
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const validateForm = () => {
    if (!formData.firstName) return 'First name is required'
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return 'Valid email is required'
    if (!formData.password || formData.password.length < 6) return 'Password must be at least 6 characters'
    if (formData.password !== formData.confirmPassword) return 'Passwords do not match'
    if (!formData.agreeTerms) return 'You must agree to the Terms of Use and Privacy Policy'
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
      await dispatch(signup({
        firstName: formData.firstName,
        email: formData.email,
        password: formData.password,
        lastName: formData.lastName,
        confirmPassword: formData.confirmPassword,
      })).unwrap()
      toast.success('Signup successful')
      navigate('/login')
    } catch (err) {
      toast.error(err)
    }
  }

  const isFormValid = formData.firstName && formData.email && formData.password && formData.confirmPassword && formData.agreeTerms

  return (
    <div className="mainSignup">
      <div className="signup">
        <Link to="/" className="logo">
          <Icon fontSize={32} icon="bi:cloud-haze2" />
          <h2>Hubly</h2>
        </Link>

        <div className="signup-title-login">
          <h1 className="signup-title">Create an account</h1>
          
           <Link to="/login">Sign in instead</Link>
     
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="signup-field">
            <label htmlFor="firstName" className="signup-label">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          <div className="signup-field">
            <label htmlFor="lastName" className="signup-label">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          <div className="signup-field">
            <label htmlFor="email" className="signup-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          <div className="signup-field">
            <label htmlFor="password" className="signup-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          <div className="signup-field">
            <label htmlFor="confirmPassword" className="signup-label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          <div className="signup-terms">
            <input
              type="checkbox"
              id="agreeTerms"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              disabled={loading}
            />
            <label htmlFor="agreeTerms" className="signup-terms-label">
              By creating an account, I agree to our{' '}
              <a href="#">Terms of use</a> and <a href="#">Privacy Policy</a>
            </label>
          </div>
          <button
            type="submit"
            className="signup-button"
            disabled={loading}
            style={{ backgroundColor: isFormValid ? '#1A73E8' : '#D3D3D3' }}
          >
            {loading ? 'Creating...' : 'Create an account'}
          </button>
        </form>
        {error && <p className="signup-error">{error}</p>}
        <p className="signup-footer">
          This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
        </p>
      </div>
      <div className="signupImage">
        <img src={sideImage} alt="Signup side image" />
      </div>
    </div>
  )
}

export default Signup