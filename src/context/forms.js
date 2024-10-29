import { createContext, useState } from 'react';

const FormContext = createContext();

const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    newPassword: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    username: '',
    githubUsername: '',
    bio: ''
  });

  return <FormContext.Provider value={{ formData, setFormData }}>{children}</FormContext.Provider>;
};

export { FormProvider, FormContext };
