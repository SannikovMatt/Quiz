import { AUTH_ERROR_HANDLED, AUTH_INVALID, AUTH_LOGOUT, AUTH_SUCCESS } from "../Actions/actionTypes"

const initialState = {
    token: null


}

export default function authReducer(state = initialState, action) {


    console.log(state, 'REDUX STATE');

    switch (action.type) {



        case AUTH_SUCCESS:
            return {
                ...state,
                token: action.token
            }
        case AUTH_ERROR_HANDLED:
            return {
                ...state,
                error: null
            }
        case AUTH_INVALID:

            let error = action.data.data.error.message.toString()

            console.log(typeof action.data.data.error.message);

            switch (action.data.data.error.message) {
                case 'EMAIL_NOT_FOUND':
                    error ={ email:'Email not found'};
                    break;
                case 'EMAIL_EXISTS':
                    error = {email:'Email exists'};
                    break;
                case'INVALID_PASSWORD':
                    error = {password:'Invalid Password'};
                    break;
                default:
                error ={email: 'Invalid data'};
            }

            return {
                ...state,
                error
            }
        case AUTH_LOGOUT:
            return {

                ...state,
                token: null
            }

        default:
            return state
    }

}