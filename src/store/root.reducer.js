import { combineReducers } from 'redux'

import { userReducer } from './reducers/user.reducer'
import { audioPlayerReducer } from './reducers/audio-player.reducer'

export const rootReducer = combineReducers({

  userModule: userReducer,
  audioPlayerModule: audioPlayerReducer,
})
