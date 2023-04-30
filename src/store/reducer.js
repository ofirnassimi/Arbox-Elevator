// store: {
//     elevatorsStates: [{
//         id, currentFloor, state(free, moving, arrived), duration
//     }],
//     buttonsStates: [{
//         floorNumber, state(Call, Waiting, Arrived)
//     }]
//     callingQueue: [floorNumber]
// }

import * as actions from './actionTypes';

const initialState = {
  elevatorsStates: [],
  buttonsStates: [],
  callingQueue: [],
};

export default function reducer(state = initialState, action) {
  let id, currentFloor, elevatorState, duration;
  let newStates;

  switch (action.type) {
    case actions.ADD_CALL:
      return {
        ...state,
        callingQueue: [...state.callingQueue, action.payload.floorNumber],
      };

    case actions.ADD_ELEVATOR_STATE:
      ({ id, currentFloor, state: elevatorState } = action.payload);
      return {
        ...state,
        elevatorsStates: [
          ...state.elevatorsStates,
          { id, currentFloor, state: elevatorState },
        ],
      };

    case actions.SET_ELEVATOR_STATE:
      ({ id, currentFloor, state: elevatorState, duration } = action.payload);

      newStates = [...state.elevatorsStates];
      newStates[id] = {
        ...newStates[id],
        currentFloor,
        state: elevatorState,
        duration,
      };

      return {
        ...state,
        elevatorsStates: newStates,
      };

    case actions.SET_ELEVATOR_DURATION:
      newStates = [...state.elevatorsStates];
      ({ id, duration } = action.payload);

      newStates[id] = {
        ...newStates[id],
        duration,
      };

      return {
        ...state,
        elevatorsStates: newStates,
      };

    case actions.ADD_BUTTON_STATE:
      return {
        ...state,
        buttonsStates: [
          ...state.buttonsStates,
          {
            floorNumber: action.payload.floorNumber,
            state: action.payload.state,
          },
        ],
      };

    case actions.SET_BUTTON_STATE:
      newStates = [...state.buttonsStates];
      const floorNumber = action.payload.floorNumber;
      const newButtonState = action.payload.state;

      newStates[floorNumber] = {
        ...newStates[floorNumber],
        state: newButtonState,
      };

      return {
        ...state,
        buttonsStates: newStates,
      };

    default:
      return state;
  }
}
