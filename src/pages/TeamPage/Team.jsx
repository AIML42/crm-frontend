import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Icon } from "@iconify/react"
import { toast } from 'react-toastify'
import Sidebar from '../../components/Sidebar/Sidebar'
import { fetchTeamMembers, addTeamMember, updateTeamMember, deleteTeamMember } from '../../redux/teamSlice'
import './TeamStyle.css'

const Team = () => {
  const dispatch = useDispatch()
  const { teamMembers, loading, error } = useSelector((state) => state.team)
  const { user } = useSelector((state) => state.auth)

  // State for modals and form
  const [showCreateEditModal, setShowCreateEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentMember, setCurrentMember] = useState(null)
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    role: 'team',
  })

  // Fetch team members on mount
  useEffect(() => {
    dispatch(fetchTeamMembers())
  }, [dispatch])

  // If user is null, show loading state
  if (!user) {
    return (
      <div className="team-page">
        <Sidebar />
        <div className="main-content">
          <h3>Team</h3>
          <p>Loading user data...</p>
        </div>
      </div>
    )
  }

  const currentUserId = user.id // Use the dynamic user ID

  // Open modal for creating a new member
  const handleOpenCreateModal = () => {
    setIsEditing(false)
    setFormData({ firstName: '', email: '', role: 'team' })
    setShowCreateEditModal(true)
  }

  // Open modal for editing an existing member
  const handleOpenEditModal = (member) => {
    setIsEditing(true)
    setCurrentMember(member)
    setFormData({
      firstName: member.firstName,
      email: member.email,
      role: member.role,
    })
    setShowCreateEditModal(true)
  }

  // Open delete confirmation modal
  const handleOpenDeleteModal = (member) => {
    setCurrentMember(member)
    setShowDeleteModal(true)
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle form submission for create/edit
  const handleSubmit = () => {
    
    // console.log(formData) 
    if(formData.email){
      // console.log('inside form data function')

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        toast.error('Valid mail is required')
        return 
      }
    }

  

    if (isEditing) {
      dispatch(updateTeamMember({ id: currentMember._id, memberData: formData }))
        .then(() => {
          toast.success('Team member updated successfully')
          setShowCreateEditModal(false)
        })
        .catch(() => toast.error('Failed to update team member'))
    } else {
      dispatch(addTeamMember(formData))
        .then(() => {
          toast.success('Team member created successfully')
          setShowCreateEditModal(false)
        })
        .catch(() => toast.error('Failed to create team member'))
    }
  }

  // Handle delete confirmation
  const handleDelete = () => {
    console.log('Deleting member:', currentMember)
    dispatch(deleteTeamMember('68185c9a8e0747f7d105a4aa'))
      .then(() => {
        toast.success('Team member deleted successfully')
        setShowDeleteModal(false)
      })
      .catch(() => toast.error('Failed to delete team member'))
  }

  // console.log(formData)

  return (
    <div className="team-page">
      <Sidebar />
      <div className="main-content">
        <h3>Team</h3>
        <div className="team-list-container">
          <div className="team-list">
            <div className="team-header">
              <span className='header-full-name'>Full Name <Icon style={{padding:3}} icon='fluent-mdl2:scroll-up-down'></Icon></span>
              <span>Phone</span>
              <span>Email</span>
              <span>Role</span>
              <span>Actions</span>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            {teamMembers?.map((member) => (
              <div key={member._id} className="team-row">
                <span className="full-name">
                  <span className="avatar">{member.firstName[0]}</span>
                  {member.firstName} {member.lastName || ''}
                </span>
                <span>{member.phone || '-'}</span>
                <span>{member.email}</span>
                <span>{member.role}</span>
                <span className="actions">
                  {member._id !== currentUserId && (
                    <>
                      <Icon
                        icon="mdi:pencil"
                        className="action-icon"
                        onClick={() => handleOpenEditModal(member)}
                      />
                      <Icon
                        icon="mdi:delete"
                        className="action-icon"
                        onClick={() => handleOpenDeleteModal(member)}
                      />
                    </>
                  )}
                </span>
              </div>
            ))}
          </div>
          <div className="create-button-container">
            <button className="create-button" onClick={handleOpenCreateModal}>
               <Icon icon='gridicons:add-outline'></Icon>  Add Team members
            </button>
          </div>
        </div>

        {/* Create/Edit Modal */}
        {showCreateEditModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h4>{isEditing ? 'Edit Member' : 'Add Team members'}</h4>
              <p style={{textAlign:'start'}}>Talk with colleagues in a group chat. Messages in this group are only visible to it's participants. <br /> New teammates may only be invited by the administrators.</p>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter name"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select name="role" value={formData.role} onChange={handleInputChange}>
                  <option value="team">Team</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="modal-buttons">
                <button onClick={() => setShowCreateEditModal(false)}>Cancel</button>
                <button onClick={handleSubmit}>{isEditing ? 'Update' : 'Create'}</button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="modal-overlay">
            <div style={{width:'30%'}} className="modal-content">
              <p style={{textAlign:'start', padding:10}}>This teammate will be deleted.</p>
              <div className="modal-buttons">
                <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
                <button onClick={handleDelete}>Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Team