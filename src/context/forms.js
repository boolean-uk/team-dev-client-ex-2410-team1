import { createContext, useState } from 'react';

const FormContext = createContext();

const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  return <FormContext.Provider value={{ formData, setFormData }}>{children}</FormContext.Provider>;
};

export { FormProvider, FormContext };