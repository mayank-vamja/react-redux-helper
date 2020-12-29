import { ActionTypes } from "../actions"

const initialState = {
  loading: false,
  quote: null
}

// EXAMPLE OF A REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_RANDOM_QUOTE:
      return { ...state, quote: null, loading: true }

    case ActionTypes.SET_RANDOM_QUOTE:
      return { ...state, quote: action.payload, loading: false }

    case ActionTypes.FAILED_RANDOM_QUOTE:
      return { ...state, quote: null, loading: false }

    default:
      return { ...initialState }
  }
}

export default reducer
