// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';

const store = configureStore({
  reducer: {
    user: reducer,
  },
});

export default store;

// import { createStore } from 'redux';
// import reducer from './reducer';

// // Create the Redux store
// const store = createStore(reducer);

// export default store;
