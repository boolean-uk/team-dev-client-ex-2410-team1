import Form from '../../../components/form';

const StepThree = ({ data, setData }) => {
  return (
    <>
      <div className="welcome-formheader">
        <h3>Bio</h3>
      </div>
      <Form className="welcome-form">
        <div className="welcome-form-inputs">
          <div>
            <textarea
              placeholder="Tell us about yourself, your professional and educational highlights to date..."
              maxLength={300}
              name="bio"
              value={data.bio}
              onChange={setData}
            ></textarea>
            <p>{data.bio.length}/300</p>
          </div>
        </div>
      </Form>
    </>
  );
};

export default StepThree;
