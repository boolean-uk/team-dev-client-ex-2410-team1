import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Avatar from '../../components/avatar';
import { getUserById, patchUserById } from '../../service/apiClient';
import useAuth from '../../hooks/useAuth';
import Form from '../../components/form';
import TextInput from '../../components/form/textInput';

import './styles.css';

const ProfilePage = () => {
  const { id } = useParams();
  const [profileUser, setProfileUser] = useState(null);
  const { loggedInUser } = useAuth();
  const [canEdit, setCanEdit] = useState(false);
  const [formData, setFormData] = useState(null);
  const [prevProfileUserId, setPrevProfileUserId] = useState(null);

  useEffect(() => {
    const fetchUserData = async (profileId, setter) => {
      try {
        const response = await getUserById(profileId);
        setter(response.data);
      } catch (error) {
        console.error(`Error fetching user data for ID ${profileId}:`, error);
      }
    };

    fetchUserData(id, setProfileUser);
  }, [id]);

  useEffect(() => {
    if (profileUser && loggedInUser) {
      setCanEdit(profileUser.id === loggedInUser.id || loggedInUser.role === 'TEACHER');
    }
  }, [profileUser, loggedInUser]);

  useEffect(() => {
    if (profileUser) {
      if (profileUser.id !== prevProfileUserId) {
        setFormData({ ...profileUser });
        setPrevProfileUserId(profileUser.id);
      }
    }
  }, [profileUser, prevProfileUserId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSave = async () => {
    const changeData = {};
    const excludedFields = ['id', 'password']; // Fields to exclude

    Object.keys(formData).forEach((key) => {
      if (!excludedFields.includes(key) && formData[key] !== profileUser[key]) {
        changeData[key] = formData[key];
      }
    });
    changeData.bio = changeData.biography; // Rename bio to biography
    if (Object.keys(changeData).length > 0) {
      try {
        await patchUserById(profileUser.id, changeData);
        setProfileUser((prevData) => ({
          ...prevData,
          ...changeData
        }));

        setFormData((prevData) => ({
          ...prevData,
          ...changeData
        }));

        alert('Profile updated successfully!');
      } catch (error) {
        console.error('Error saving user data:', error);
        alert('Failed to update profile. Please try again.');
      }
    } else {
      alert('No changes to save.');
    }
  };

  return (
    <div>
      <h1>Profile Page</h1>
      {profileUser && loggedInUser && formData ? (
        <div className="info">
          <Avatar user={profileUser} />
          <div className="divider">
            {/* Basic Info */}
            <Form className="basic-info-form">
              <h2>Basic Info</h2>
              <img
                src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
                alt="avatar"
              />

              <TextInput
                value={formData.firstName}
                onChange={handleInputChange}
                name="firstName"
                label="First Name"
                readOnly={!canEdit}
              />
              <TextInput
                value={formData.lastName}
                onChange={handleInputChange}
                name="lastName"
                label="Last Name"
                readOnly={!canEdit}
              />
              <TextInput
                value={formData.githubUsername}
                onChange={handleInputChange}
                name="githubUsername"
                label="GitHub Username"
                readOnly={!canEdit}
              />
            </Form>

            {/* Conditionally Render Sections Based on jobTitle */}
            {profileUser.jobTitle ? (
              // If jobTitle exists, assume Teacher
              <Form className="professional-info-form">
                <h2>Professional Info</h2>
                <TextInput
                  value={formData.role}
                  onChange={handleInputChange}
                  name="role"
                  label="role"
                  readOnly={!canEdit}
                />
                <TextInput
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  name="jobTitle"
                  label="Job Title"
                  readOnly={!canEdit}
                />
                <TextInput
                  value={formData.specialism}
                  onChange={handleInputChange}
                  name="specialism"
                  label="Specialism"
                  readOnly={!canEdit}
                />
              </Form>
            ) : (
              // Else, render Training Info (Student)
              <Form className="training-info-form">
                <h2>Training Info</h2>
                <TextInput
                  value={formData.role}
                  onChange={handleInputChange}
                  name="role"
                  label="role"
                  readOnly={!canEdit}
                />
                <TextInput
                  value={formData.specialism}
                  onChange={handleInputChange}
                  name="specialism"
                  label="Specialism"
                  readOnly={!canEdit}
                />
                <TextInput
                  value={formData.cohort}
                  onChange={handleInputChange}
                  name="cohort"
                  label="Cohort"
                  readOnly={!canEdit}
                />
                <TextInput
                  value={formData.startDate}
                  onChange={handleInputChange}
                  name="startDate"
                  label="Start Date"
                  readOnly={!canEdit}
                />
                <TextInput
                  value={formData.endDate}
                  onChange={handleInputChange}
                  name="endDate"
                  label="End Date"
                  readOnly={!canEdit}
                />
              </Form>
            )}
          </div>

          <div className="divider">
            {/* Contact Info */}
            <Form className="contact-info-form">
              <h2>Contact Info</h2>
              <TextInput
                value={formData.email}
                onChange={handleInputChange}
                name="email"
                label="Email"
                readOnly={!canEdit}
              />
              <TextInput
                value={formData.mobile}
                onChange={handleInputChange}
                name="mobile"
                label="Mobile"
                type="restricted"
                readOnly={!canEdit}
              />
              <TextInput
                value="******"
                onChange={() => {}}
                name="password"
                label="Password"
                type="password"
                readOnly={true} // Always read-only for security
              />
            </Form>

            {/* Additional Info */}
            <Form className="additional-info-form">
              <h2>Additional Info</h2>
              <TextInput
                value={formData.id}
                onChange={() => {}}
                name="id"
                label="ID"
                readOnly={true} // IDs are not editable
              />

              {/* Replaced Biography Field */}
              <div>
                <label htmlFor="biography">Biography</label>
                <textarea
                  id="biography"
                  placeholder="Tell us about yourself, your professional and educational highlights to date..."
                  maxLength={300}
                  name="biography"
                  value={formData.biography}
                  onChange={handleInputChange}
                  readOnly={!canEdit}
                ></textarea>
                <p>{(formData.biography || '').length}/300</p>
              </div>
            </Form>
          </div>

          {/* Bottom Line */}
          <div className="divider">
            <div className="required">
              <span>Required *</span>
            </div>
            <div>
              {canEdit && (
                <div className="buttons">
                  <button onClick={() => setFormData({ ...profileUser })}>Cancel</button>
                  <button onClick={handleSave}>Save</button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfilePage;
