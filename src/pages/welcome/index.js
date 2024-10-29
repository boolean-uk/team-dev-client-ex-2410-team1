import Stepper from '../../components/stepper';
import useAuth from '../../hooks/useAuth';
import StepOne from './stepOne';
import StepTwo from './stepTwo';
import StepThree from './stepThree';
import './style.css';
import useForm from '../../hooks/useForm';

const WelcomeSignupForm = () => {
  const { onCreateProfile } = useAuth();

  const { formData, setFormData } = useForm();

  const onChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const onComplete = () => {
    onCreateProfile(
      formData.firstName,
      formData.lastName,
      formData.username,
      formData.githubUsername,
      formData.bio
    );
  };

  return (
    <main className="welcome">
      <div className="welcome-titleblock">
        <h1 className="h2">Welcome to Cohort Manager</h1>
        <p className="text-blue1">Create your profile to get started</p>
      </div>

      <Stepper header={<WelcomeHeader />} onComplete={onComplete}>
        <StepOne data={formData} setData={onChange} />
        <StepTwo data={formData} setData={onChange} />
        <StepThree data={formData} setData={onChange} />
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
