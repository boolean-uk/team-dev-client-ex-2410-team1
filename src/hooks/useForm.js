import { useContext } from 'react';
import { FormContext } from '../context/forms';

const useForm = () => {
  return useContext(FormContext);
};

export default useForm;
