import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './rootReducer'
import thunkContext from './thunkContext'

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument(thunkContext)))
)

export * from './types'
export * from './selectors'
export * from './actions'
