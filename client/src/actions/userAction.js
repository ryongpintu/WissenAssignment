import axios from 'axios';

import {

  GET_ERRORS,
  ADD_USER_SUCCESSFULLY,
  GET_USER_DATA,
  GET_USERS,
  GET_PROFILE_USER
  
} from './types';


// Add education
export const addUserDetail = (userData, history) => dispatch => {
  dispatch({
    type: ADD_USER_SUCCESSFULLY,
    payload: {}
  })
    axios
      .post('/api/users/add/', userData)
      .then(res => {
        history.push('/dashboard')
        dispatch({
          type: ADD_USER_SUCCESSFULLY,
          payload: res.data
        })

        dispatch(getUserProfile(userData.userId))
        
      }
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
  

  // Add education
export const getUsersList = () => dispatch => {
  axios
    .get(`/api/users/userlist`)
    .then(res => {

      //history.push('/dashboard')
      dispatch({
        type: GET_USERS,
        payload: res.data
      })

     // dispatch(getUserClockInTime(clockData.userId))
      
    }
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};





  

  export const getUserData = (userId) => dispatch => {
    
    axios
      .get(`/api/user/${userId}`)
      .then(res => {
        
        dispatch({
          type: GET_USER_DATA,
          payload: res.data
        })
        
      }
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };



  // Get current profile
export const getUserProfile = (userId) => dispatch => {
  
  axios
    .get(`/api/users/profile/${userId}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE_USER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE_USER,
        payload: {}
      })
    );
};