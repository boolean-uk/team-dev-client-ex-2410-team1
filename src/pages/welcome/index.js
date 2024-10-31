import Stepper from '../../components/stepper';
import useAuth from '../../hooks/useAuth';
import StepOne from './stepOne';
import StepTwo from './stepTwo';
import StepThree from './stepThree';
import './style.css';
import { useState } from 'react';

const WelcomeSignupForm = () => {
  const { onCreateProfile, loggedInUser } = useAuth();

  const [formData, setFormData] = useState({
    email: loggedInUser.email,
    firstName: '',
    lastName: '',
    username: '',
    githubUsername: '',
    mobile: '',
    bio: ''
  });

  const onChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const [stepIsValid, setStepIsValid] = useState(false);

  const validateStep = (isValid) => {
    setStepIsValid(isValid);
  };

  const onComplete = () => {
    console.log(formData);
    onCreateProfile(
      formData.firstName,
      formData.lastName,
      formData.username,
      formData.githubUsername,
      formData.mobile,
      formData.bio
    );
  };

  return (
    <main className="welcome">
      <div className="welcome-titleblock">
        <h1 className="h2">Welcome to Cohort Manager</h1>
        <p className="text-blue1">Create your profile to get started</p>
      </div>

      <Stepper header={<WelcomeHeader />} onComplete={onComplete} stepIsValid={stepIsValid}>
        <StepOne data={formData} setData={onChange} validateStep={validateStep} />
        <StepTwo data={formData} setData={onChange} validateStep={validateStep} />
        <StepThree data={formData} setData={onChange} validateStep={validateStep} />
      </Stepper>
    </main>
  );
};

const WelcomeHeader = () => {
  return (
    <div className="welcome-cardheader">
      <h2>Create profile</h2>
      <p className="text-blue1">Tell us about yourself to create your profile</p>
    </div>
  );
};

export default WelcomeSignupForm;
