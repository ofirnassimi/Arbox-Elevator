import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ReactComponent as Icon } from '../../images/icons8-elevator.svg';
import {
  setButtonState,
  setElevatorState,
  setElevatorDuration,
} from '../../store/actions';
import {
  elevatorStatesTypes,
  buttonsStatesTypes,
} from '../../utils/stateTypes';
import ElevatorFloor from '../ElevatorFloor/ElevatorFloor';
import store from '../../store/store';
import audio from '../../sounds/elevator.mp3';
import './Elevator.css';

function Elevator({ id, currentFloor, numOfFloors }) {
  const elevatorsStates = useSelector((state) => state.elevatorsStates);
  const [floors, setFloors] = useState([]);
  const [floor, setFloor] = useState(currentFloor);
  const [nextFloor, setNextFloor] = useState();
  const [iconStyle, setIconStyle] = useState({});

  useEffect(() => {
    const tempFloors = [];
    for (let i = numOfFloors - 1; i >= 0; i--) {
      tempFloors.push(
        <ElevatorFloor key={i} elevatorID={id} floorNumber={i} />
      );
    }

    setFloors(tempFloors);
  }, []);

  useEffect(() => {
    setNextFloor(elevatorsStates[id].currentFloor);
  }, [elevatorsStates[id]]);

  useEffect(() => {
    if (elevatorsStates[id].state === elevatorStatesTypes.moving) {
      const duration = Math.abs(floor - nextFloor) * 0.5;
      const position = Math.abs(floor - nextFloor) * 50;
      store.dispatch(setElevatorDuration(id, duration));

      setIconStyle({
        transform: `translateY(${position})`,
        transition: `${duration}s linear`,
      });

      setTimeout(elevatorArrived, duration * 1000);
    }
  }, [nextFloor]);

  function elevatorArrived() {
    setFloor(nextFloor);
    new Audio(audio).play();
    store.dispatch(setButtonState(nextFloor, buttonsStatesTypes.arrived));
    store.dispatch(
      setElevatorState(id, {
        currentFloor: nextFloor,
        state: elevatorStatesTypes.arrived,
      })
    );
    store.dispatch(setElevatorDuration(id, 0));
    setTimeout(setState, 2000);
  }

  function setState() {
    store.dispatch(
      setElevatorState(id, {
        currentFloor: nextFloor,
        state: elevatorStatesTypes.free,
      })
    );
    store.dispatch(setButtonState(nextFloor, buttonsStatesTypes.call));
  }

  return (
    <div className='elevator'>
      <div className='floors-container'>{floors}</div>
      <Icon
        className={`icon icon-${elevatorsStates[id].state}`}
        style={{
          marginBottom: `${nextFloor * 50 + 15}px`,
          ...iconStyle,
        }}
      />
    </div>
  );
}

export default Elevator;
