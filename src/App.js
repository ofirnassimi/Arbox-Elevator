import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import './App.css';
import ElevatorSystem from './components/ElevatorSystem/ElevatorSystem';

function App() {
  return (
    <Provider store={store}>
      <div className='app'>
        <b className='title'>Elevator Exercise</b>
        <div className='system-container'>
          <ElevatorSystem numOfElevators={5} numOfFloors={10} />
        </div>
      </div>
    </Provider>
  );
}

export default App;
