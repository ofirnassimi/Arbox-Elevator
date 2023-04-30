import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../Button/Button';
import Elevator from '../Elevator/Elevator';
import store from '../../store/store';
import {
  addCall,
  setElevatorState as setStateAction,
  addButtonState,
  setButtonState,
  addElevatorState,
} from '../../store/actions';
import {
  elevatorStatesTypes,
  buttonsStatesTypes,
} from '../../utils/stateTypes';
import './ElevatorSystem.css';

function ElevatorSystem({ numOfElevators, numOfFloors }) {
  const [buttons, setButtons] = useState([]);
  const [elevators, setElevators] = useState([]);
  const elevatorsStates = useSelector((state) => state.elevatorsStates);
  const callingQueue = useSelector((state) => state.callingQueue);

  useEffect(() => {
    for (let i = 0; i < numOfElevators; i++) {
      const elevatorState = {
        id: i,
        currentFloor: 0,
        state: elevatorStatesTypes.free,
      };
      addElevatorStateToStore(elevatorState);
    }

    for (let i = 0; i < numOfFloors; i++) {
      const buttonState = {
        floorNumber: i,
        state: buttonsStatesTypes.call,
      };
      addButtonStateToStore(buttonState);
    }
  }, []);

  useEffect(() => {
    const elevatorsToCreate = [];
    elevatorsStates.length &&
      elevatorsStates.forEach((elevatorState) =>
        elevatorsToCreate.push(
          <Elevator
            id={elevatorState.id}
            currentFloor={0}
            numOfFloors={numOfFloors}
          />
        )
      );
    setElevators(elevatorsToCreate);

    const buttonsToCreate = [];
    for (let i = numOfFloors - 1; i >= 0; i--) {
      buttonsToCreate.push(
        <Button
          state={buttonsStatesTypes.call}
          floorNumber={i}
          onClick={(floorNumber) => {
            handleButtonClicked(floorNumber);
          }}
        />
      );
    }

    setButtons(buttonsToCreate);
  }, [elevatorsStates]);

  useEffect(() => {
    if (!elevatorsStates) return;

    let closestElevatorState = null;
    let minDistance = numOfFloors;

    const hasAvailableElevator = elevatorsStates.some(
      (elevatorState) => elevatorState.state === elevatorStatesTypes.free
    );

    if (callingQueue.length && hasAvailableElevator) {
      const floor = callingQueue.shift();

      elevatorsStates.forEach((elevatorState) => {
        const currentDistance = Math.abs(elevatorState.currentFloor - floor);

        if (
          elevatorState.state === elevatorStatesTypes.free &&
          currentDistance < minDistance
        ) {
          minDistance = currentDistance;
          closestElevatorState = elevatorState;
        }
      });

      closestElevatorState &&
        setElevatorState(closestElevatorState.id, {
          currentFloor: floor,
          state: elevatorStatesTypes.moving,
        });
    }
  }, [callingQueue, elevatorsStates, numOfFloors]);

  const addElevatorStateToStore = (elevatorState) =>
    store.dispatch(addElevatorState(elevatorState));

  const addButtonStateToStore = (buttonState) =>
    store.dispatch(addButtonState(buttonState));

  const setElevatorState = (id, newState) =>
    store.dispatch(setStateAction(id, newState));

  const addFloorToQueue = (floorNumber) => store.dispatch(addCall(floorNumber));

  const handleButtonClicked = (floorNumber) => {
    if (hasElevatorInFloor(floorNumber)) return;

    store.dispatch(setButtonState(floorNumber, buttonsStatesTypes.waiting));
    addFloorToQueue(floorNumber);
  };

  const hasElevatorInFloor = (floorNumber) => {
    const hasElevator = elevatorsStates.some(
      (elevatorState) => elevatorState.currentFloor === floorNumber
    );

    return hasElevator;
  };

  const renderFloorsNames = () => {
    const floorsTitles = [];

    for (let i = numOfFloors - 1; i >= 0; i--) {
      let text;

      switch (i) {
        case 0:
          text = 'Ground Floor';
          break;
        case 1:
          text = '1st';
          break;
        case 2:
          text = '2nd';
          break;
        case 3:
          text = '3rd';
          break;
        default:
          text = `${i}th`;
          break;
      }

      floorsTitles.push(
        <b key={i} className='floor-name'>
          {text}
        </b>
      );
    }

    return floorsTitles;
  };

  return (
    <div className='elevator-system'>
      <div className='floors-names'>{renderFloorsNames()}</div>
      <div className='elevators-container'>{elevators}</div>
      <div className='buttons-container'>{buttons}</div>
    </div>
  );
}

export default ElevatorSystem;
