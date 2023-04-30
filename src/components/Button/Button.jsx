import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Button.css';

function Button({ state, floorNumber, onClick }) {
  const buttonsStates = useSelector((state) => state.buttonsStates);
  const [currentState, setCurrentState] = useState(state);

  useEffect(() => {
    setCurrentState(buttonsStates[floorNumber].state);
  }, [buttonsStates[floorNumber]]);

  return (
    <button
      className={`button-${currentState.toLowerCase()}`}
      onClick={() => {
        onClick(floorNumber);
      }}
    >
      {currentState}
    </button>
  );
}

export default Button;
