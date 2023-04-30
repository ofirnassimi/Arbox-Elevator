import * as actions from './actionTypes';

export function addCall(floorNumber) {
  return {
    type: actions.ADD_CALL,
    payload: {
      floorNumber,
    },
  };
}

export function addElevatorState(elevatorState) {
  return {
    type: actions.ADD_ELEVATOR_STATE,
    payload: {
      id: elevatorState.id,
      currentFloor: elevatorState.currentFloor,
      state: elevatorState.state,
    },
  };
}

export function setElevatorState(id, newState) {
  return {
    type: actions.SET_ELEVATOR_STATE,
    payload: {
      id,
      currentFloor: newState.currentFloor,
      state: newState.state,
    },
  };
}

export function addButtonState(buttonState) {
  return {
    type: actions.ADD_BUTTON_STATE,
    payload: {
      floorNumber: buttonState.floorNumber,
      state: buttonState.state,
    },
  };
}

export function setButtonState(floorNumber, newState) {
  return {
    type: actions.SET_BUTTON_STATE,
    payload: {
      floorNumber,
      state: newState,
    },
  };
}

export function setElevatorDuration(id, duration) {
  return {
    type: actions.SET_ELEVATOR_DURATION,
    payload: {
      id,
      duration,
    },
  };
}
