import { useState } from 'react';

const messages = [
  'Learn React ⚛️',
  'Apply for jobs 💼',
  'Invest your new income 🤑',
];

function App() {
  return (
    <div>
      <Step />
    </div>
  );
}

function Step() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);
  // const [test, setTest] = useState({ name: "Jonas"});

  function handlePrevious() {
    if (step > 1) setStep((s) => s - 1);
  }

  function handleNext() {
    if (step < 3) setStep((s) => s + 1);
    // BAD PRACTICE
    // test.name = "Fred";
    // setTest({ name: "Fred" });
  }

  return (
    <div>
      <button className="close" onClick={() => setIsOpen((is) => !is)}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? 'active' : ''}>1</div>
            <div className={step >= 2 ? 'active' : ''}>2</div>
            <div className={step >= 3 ? 'active' : ''}>3</div>
          </div>

          <StepMessage step={step}>{messages[step - 1]}</StepMessage>

          <div className="buttons">
            <Button textColor="#fff" bgColor="#7950f2" onClick={handlePrevious}>
              Previous
            </Button>
            <Button textColor="#fff" bgColor="#7950f2" onClick={handleNext}>
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function StepMessage({ step, children }: StepMessageProps) {
  return (
    <p className="message">
      Step {step}:{children}
    </p>
  );
}

function Button({ textColor, bgColor, onClick, children }: ButtonProps) {
  return (
    <button
      style={{ color: textColor, backgroundColor: bgColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default App;

interface StepMessageProps {
  step: number;
  children: React.ReactNode;
}

interface ButtonProps {
  textColor: string;
  bgColor: string;
  onClick: () => void;
  children: React.ReactNode;
}
