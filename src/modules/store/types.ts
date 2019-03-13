import { Action as EntitiesAction } from './entities'
import { ThunkDispatch, ThunkAction } from 'redux-thunk'
import rootReducer from './rootReducer'
import thunkContext from './thunkContext'

export type RootState = ReturnType<typeof rootReducer>
type ThunkContext = typeof thunkContext

export type AppAction = EntitiesAction
export type AppDispatch = ThunkDispatch<RootState, ThunkContext, AppAction>
export type AppThunkAction = ThunkAction<void, RootState, ThunkContext, AppAction>
