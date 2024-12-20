// src/actions.js
import { ADD_USER, REMOVE_USER } from './actionTypes';

export const addUser = (user) => ({
  type: ADD_USER,
  payload: user
});

export const removeUser = () => ({
  type: REMOVE_USER
});