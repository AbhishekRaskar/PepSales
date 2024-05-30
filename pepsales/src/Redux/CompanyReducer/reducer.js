import { GET_COMPANY_REQUEST, GET_COMPANY_FAILURE, GET_COMPANY_SUCCESS } from "./actionTypes";

const initialState = {
  stocks: [],
  loading: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMPANY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_COMPANY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        stocks: [] 
      };
    case GET_COMPANY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        stocks: action.payload 
      };
    default:
      return state;
  }
};

export default reducer;
