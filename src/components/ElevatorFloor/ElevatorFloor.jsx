import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import './ElevatorFloor.css';

function ElevatorFloor({ elevatorID, floorNumber }) {
  const elevatorsStates = useSelector((state) => state.elevatorsStates);
  const [durationMinutes, setDurationMinutes] = useState(0);
  const [durationSeconds, setDurationSeconds] = useState(0);
  const [durationText, setDurationText] = useState();

  useEffect(() => {
    const duration = elevatorsStates[elevatorID].duration;
    const currentFloor = elevatorsStates[elevatorID].currentFloor;

    if (duration && floorNumber === currentFloor) {
      setDurationMinutes(duration / 60);
      setDurationSeconds(duration % 60);
    } else {
      setDurationMinutes(0);
      setDurationSeconds(0);
    }
  }, [elevatorsStates[elevatorID]]);

  useEffect(() => {
    if (durationSeconds) {
      if (durationMinutes >= 1) {
        setDurationText(`${durationMinutes} min. ${durationSeconds} sec.`);
      } else {
        setDurationText(`${durationSeconds} sec.`);
      }
    } else {
      setDurationText();
    }
  }, [durationMinutes, durationSeconds]);

  return (
    <div className='elevator-floor'>
      <p className='duration'>{durationText}</p>
    </div>
  );
}

export default ElevatorFloor;
