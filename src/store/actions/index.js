import axios from 'axios'
import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL,
  LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAIL,
  GET_SKILLS_REQUEST, GET_SKILLS_SUCCESS, GET_SKILLS_FAIL
} from './actionTypes'
import {AsyncStorage} from 'react-native'


const axiosInstance = axios.create({
  baseURL: 'http://207.154.215.144:3010/',
})

// Action Creators

export const login = (data) => async dispatch => {
  dispatch(actionRequested(LOGIN_REQUEST))

  return axiosInstance
    .post(`/api/login`, data)
    .then(res => {
      if(res.data.success) {
        return dispatch(actionSucceed(LOGIN_SUCCESS, res.data.token))
      }
      return dispatch(actionFailed(LOGIN_FAIL, 'Unknown Error'))
    })
    .catch(err => {
      return dispatch(actionFailed(LOGIN_FAIL, `Error : ${err}`))
    })
}

export const logout = (message = '') => dispatch => {
  dispatch(actionSucceed(LOGOUT_SUCCESS, message))
  AsyncStorage.clear()
}

export const getSkills = id => (dispatch, getState) => {
  dispatch(actionRequested(GET_SKILLS_REQUEST))
  const { auth: { token } } = getState()

    axiosInstance
      .get(`/api/user/${id}/skills`, {headers: { Authorization: token }})
      .then(res => {
        dispatch(actionSucceed(GET_SKILLS_SUCCESS, res.data))
      })
      .catch(err => {
        dispatch(actionFailed(GET_SKILLS_FAIL, `Error: ${err}`))
      })
}

// Actions
const actionRequested = (type) => ({type})
const actionSucceed = (type, payload) => ({type, payload})
const actionFailed = (type, payload) => ({type, payload})