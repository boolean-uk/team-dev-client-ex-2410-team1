import Steps from './steps';
import Card from '../card';
import Button from '../button';
import './style.css';
import { useState } from 'react';

const Stepper = ({ header, children, onComplete, stepIsValid }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showErrorText, setShowErrorText] = useState(false);

  const onBackClick = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
    setShowErrorText(false);
  };

  const onNextClick = () => {
    if (stepIsValid) {
      if (currentStep === children.length - 1) {
        onComplete();
        return;
      }

      setShowErrorText(false);
      setCurrentStep(currentStep + 1);
    } else {
      setShowErrorText(true);
    }
  };

  return (
    <Card>
      {header}
      <div className="steps-container">
        <Steps maxSteps={children.length} currentStep={currentStep} />
      </div>

      {children[currentStep]}

      <div className="stepper-buttons">
        {currentStep > 0 && <Button text="Back" classes="offwhite" onClick={onBackClick} />}
        <Button
          text={currentStep === children.length - 1 ? 'Submit' : 'Next'}
          classes="blue nextButton"
          onClick={onNextClick}
        />
        {showErrorText && <p>Please fill out all required fields</p>}
      </div>
    </Card>
  );
};

export default Stepper;
