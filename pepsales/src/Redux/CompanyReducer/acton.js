import { GET_COMPANY_REQUEST, GET_COMPANY_FAILURE, GET_COMPANY_SUCCESS } from "./actionTypes";

export const getCompanyRequest = () => ({
    type: GET_COMPANY_REQUEST
});

export const getCompanyFailure = (error) => ({
    type: GET_COMPANY_FAILURE,
    payload: error
});

export const getCompanySuccess = (data) => ({
    type: GET_COMPANY_SUCCESS,
    payload: data
});

export const fetchCompanyData = () => {
    return async (dispatch) => {
        dispatch(getCompanyRequest());
        try {
            const response = await fetch("https://cex.io/api/currency_limits");
            const data = await response.json();
            dispatch(getCompanySuccess(data.data.pairs));
        } catch (error) {
            dispatch(getCompanyFailure(error.message));
        }
    };
};
