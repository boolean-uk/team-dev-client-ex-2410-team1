import { useState } from 'react';
import Button from '../../components/button';
import TextInput from '../../components/form/textInput';
import useAuth from '../../hooks/useAuth';
import CredentialsCard from '../../components/credentials';
import './login.css';
import { isValidEmail, isValidPassword } from '../../validation/validation';
import ErrorBox from '../../validation/ErrorBox';

const Login = () => {
  const { onLogin } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = (email, password) => {
    const emailValid = isValidEmail(email);
    const passwordValid = isValidPassword(password);

    setEmailError(!emailValid);
    setPasswordError(!passwordValid);

    if (emailValid && passwordValid) {
      onLogin(email, password);
    }
  };

  return (
    <div className="bg-blue login credentialpage">
      <CredentialsCard
        title="Login"
        socialLinksTitle="Or log in with"
        altButtonTitle="Need an account?"
        altButtonLink="/register"
        altButtonText="Sign up"
      >
        <div className="login-form">
          <form>
            <TextInput
              value={formData.email}
              onChange={onChange}
              name="email"
              label={'Email *'}
              type={'email'}
            />
            {emailError && <ErrorBox message="Invalid email address." />}
            <TextInput
              value={formData.password}
              onChange={onChange}
              name="password"
              label={'Password *'}
              type={'password'}
            />
            {passwordError && (
              <ErrorBox message="Invalid password. It must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character." />
            )}
          </form>
          <Button
            text="Log in"
            onClick={() => handleLogin(formData.email, formData.password)}
            classes="green width-full"
          />
        </div>
      </CredentialsCard>
    </div>
  );
};

export default Login;
