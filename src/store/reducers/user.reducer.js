// import { userService } from "../../services/user.service";


// const initialState = {
//     user: userService.getLoggedinUser(),
//     userMsg:{msg:'',type:''}
// }
// export function userReducer(state = initialState, action) {
//     let newState = state;
//     switch (action.type) {
//         case 'SET_USER':
//             newState = { ...state, user: action.user }
//             break;
//         case 'REMOVE_USER':
//             newState = {
//                 ...state,
//                 users: state.users.filter(user => user._id !== action.userId)
//             }
//             break;
//         case 'TOGGLE_LIKE':
//             newState = {...state, user: {...newState.user, [action.field]: action[action.field]}}
//             break
//         case 'SET_MSG':
//             return { ...state, userMsg: action.userMsg }
//         default:
//     }

//     return newState;

// }
