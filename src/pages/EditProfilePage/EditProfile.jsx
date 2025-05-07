import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Icon } from "@iconify/react"
import { toast } from 'react-toastify'
import Sidebar from '../../components/Sidebar/Sidebar'
import { updateTeamMember } from '../../redux/teamSlice'
import { logout } from '../../redux/authSlice'
import './EditProfileStyle.css'

const EditProfile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)

    console.log(user)
    // State for form
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    // Original values for comparison
    const [originalData, setOriginalData] = useState({
        email: '',
        password: '', // Store a placeholder to detect changes
    })

    // Populate form with user data on mount
    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName || '',
                email: user.email || '',
                lastName: user.lastName || '',
                password: '',
            })
            setOriginalData({
                email: user.email || '',
                password: '', // Password isn't fetched, so we use this to detect changes
            })
        }
    }, [user])

    // If user is null, show loading state
    if (!user) {
        return (
            <div className="edit-profile-page">
                <Sidebar />
                <div className="main-content">
                    <h3>Edit Profile</h3>
                    <p>Loading user data...</p>
                </div>
            </div>
        )
    }

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    // Handle form submission
    const handleSubmit = () => {
        const payload = {
            firstName: formData.firstName,
            email: formData.email,
        }
        // Only include password in payload if it's not empty
        if (formData.password) {
            payload.password = formData.password
        }

        dispatch(updateTeamMember({ id: user.id, memberData: payload }))
            .then(() => {
                toast.success('Profile updated successfully')

                // Check if email or password changed
                const emailChanged = formData.email !== originalData.email
                const passwordChanged = formData.password !== ''

                if (emailChanged || passwordChanged) {
                    // Log out
                    localStorage.removeItem('token')
                    dispatch(logout())
                    toast.info('You have been logged out due to email or password change.')
                    navigate('/login')
                }
            })
            .catch(() => toast.error('Failed to update profile'))
    }

    return (
        <div className="edit-profile-page">
            <Sidebar />
            <div className="main-content">
                <h3>Settings</h3>
                <div className="form-container">
                    <div className="header-with-borders">
                        <h4>Edit Profile</h4>
                        <div className="edit-profile-border"></div>
                    </div>
                    <div className="form-group">
                        <label>
                            First name
                            {/* <span className="tip-icon">
                                <Icon icon="mdi:help-circle-outline" />
                                <span className="tooltip">This will be visible to team members.</span>
                            </span> */}
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="Enter first name"
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            Last name
                            {/* <span className="tip-icon">
                                <Icon icon="mdi:help-circle-outline" />
                                <span className="tooltip">This will be visible to team members.</span>
                            </span> */}
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="Enter last name"
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            Email
                            
                        </label>
                        <div className="form-group-input">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter email"
                            
                        />
                        <span className="tip-icon">
                                <Icon icon="material-symbols:info-outline" />
                                <span className="tooltip">You will be logged out after changing your email.</span>
                            </span>
                        </div>
                        
                    </div>
                    <div className="form-group">
                        <label>
                            Password
                            
                        </label>
                        <div className="form-group-input">
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Enter new password"
                        />
                        <span className="tip-icon">
                                <Icon icon="material-symbols:info-outline" />
                                <span className="tooltip">You will be logged out after changing your password. Leave blank to keep unchanged.</span>
                            </span>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>
                            Confirm Password
                            
                        </label>
                        <div className="form-group-input">
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Confirm new password"
                        />
                        <span className="tip-icon">
                                <Icon icon="material-symbols:info-outline" />
                                <span className="tooltip">You will be logged out after changing your password. Leave blank to keep unchanged.</span>
                            </span>
                        </div>
                    </div>
                    <div className="button-container">
                        <button onClick={handleSubmit}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile