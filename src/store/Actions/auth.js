import axios from "axios"
import { AUTH_SUCCESS, AUTH_LOGOUT, AUTH_INVALID, AUTH_ERROR_HANDLED } from './actionTypes'

export function authSuccess(token) {

    return {
        type: AUTH_SUCCESS,
        token
    }

}
export function authInvalid(data) {

    console.log(data);
    return {
        type: AUTH_INVALID,
        data
    }

}
export function autoLogin() {

    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(logout())

        } else {
            const expirationDate = new Date(localStorage.getItem('experationDate'))
            if (expirationDate <= new Date()) {
                dispatch(logout())
            } else {

                dispatch(authSuccess(token))
                dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))

            }
        }

    }

}

export function logout() {

    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('experationDate')

    return {
        type: AUTH_LOGOUT,

    }

}

export function autoLogout(time) {

    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time + 1000)
    }

}

export function errorHandled() {

       return {
        type: AUTH_ERROR_HANDLED,
       
    }
}

export function auth(email, password, isLoggin) {

    return async dispatch => {


        const authData = {
            email,
            password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCyyUufdsIIuKUDadmkYfv4FQpDobaDMWM'

        if (isLoggin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCyyUufdsIIuKUDadmkYfv4FQpDobaDMWM'
        }
        try {

            const response = await axios.post(url, authData)
         
            const data = response.data;


            const experationDate = new Date(new Date().getTime + data.expiresIn + 1000)


            localStorage.setItem('token', data.idToken)
            localStorage.setItem('userId', data.localId)
            localStorage.setItem('experationDate', experationDate)

            dispatch(authSuccess(data.idToken))
            dispatch(autoLogout(data.expiresIn))


        } catch (e) {


            const data = JSON.parse(JSON.stringify(e.response));

            dispatch(authInvalid(data))
        }



    }

}