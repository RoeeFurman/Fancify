import { userService } from "../../services/user.service"
import { showErrorMsg } from "../../services/event-bus.service"


export function onLogin(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.login(credentials)
            dispatch({
                type: 'SET_USER',
                user
            })
        } catch (err) {
            showErrorMsg('Cannot login')
            console.log('Cannot login', err)
        }
    }
}


export function onSignup(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.signup(credentials)
            dispatch({
                type: 'SET_USER',
                user
            })
        } catch (err) {
            showErrorMsg('Cannot signup')
            console.log('Cannot signup', err)
        }

    }
}

export function onLogout() {
    return async (dispatch) => {
        try {
            const guest = await userService.logout()

            dispatch({
                type: 'SET_USER',
                user: guest
            })
        } catch (err) {
            showErrorMsg('Cannot logout')
            console.log('Cannot logout', err)
        }
    }
}

export function onGetLoggedinUser() {

}

export function toggleLike(value, field) {
    return async (dispatch) => {
        try {
            const user = await userService.toggleLike(value, field)
            dispatch({
                type: 'TOGGLE_LIKE',
                [field]: user[field],
                field
            })
        } catch (err) {
            console.log('could not like', err)
        }
    }
}

export function setUserMsg(msg, type) {
    let userMsg = { msg, type }

    return (dispatch) => {
        dispatch({
            type: 'SET_MSG',
            userMsg,
        })
    }
}
