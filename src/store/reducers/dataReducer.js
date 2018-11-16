import {
  GET_SKILLS_REQUEST, GET_SKILLS_SUCCESS, GET_SKILLS_FAIL,
  LOGOUT_SUCCESS
} from '../actions/actionTypes'

const initialState = {
  skills: [],
  isLoading: false,
  error: '',
}

const jobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SKILLS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: '',
      }
    case GET_SKILLS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        skills: action.payload,
        error: '',
      }
    case GET_SKILLS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    case LOGOUT_SUCCESS:
      return {
        skills: [],
        isLoading: false,
        error: '',
      }
    default:
      return state
  }
}

export default jobsReducer