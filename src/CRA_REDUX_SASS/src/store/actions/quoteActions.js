import { ActionTypes } from "."

// EXAMPLE HOW TO USE ACTION
export const getRandomQuote = (dispatch) => {
  dispatch({ type: ActionTypes.GET_RANDOM_QUOTE })

  fetch("http://api.quotable.io/random")
    .then((res) => res.json())
    .then((data) => dispatch({ type: ActionTypes.SET_RANDOM_QUOTE, payload: data }))
    .catch((err) => dispatch({ type: ActionTypes.FAILED_RANDOM_QUOTE, payload: err }))
}
