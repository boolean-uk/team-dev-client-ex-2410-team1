import Form from '../../../components/form';
import TextInput from '../../../components/form/textInput';
import useForm from '../../../hooks/useForm';

const StepTwo = ({ data, setData }) => {
  const { formData } = useForm();

  return (
    <>
      <div className="welcome-formheader">
        <h3>Contact info</h3>
      </div>
      <Form className="welcome-form">
        <div className="welcome-form-inputs">
          <TextInput onChange={setData} value={formData.email} name="email" label={'Email *'} />

          <TextInput onChange={setData} value={data.mobile} name="mobile" label={'Mobile *'} />

          <TextInput
            onChange={setData}
            value={data.password}
            name="password"
            label={'New password *'}
          />

          <TextInput
            onChange={setData}
            value={data.confirmPassword}
            name="confirmPassword"
            label={'Confirm new password *'}
          />

          <p className="text-blue1">*Required</p>
        </div>
      </Form>
    </>
  );
};

export default StepTwo;
