import { produce } from 'immer'
import { AppThunkAction } from '../types'
import { SomeEntity } from 'types'

// Actions
const LOAD = '[entities] Load entities'
const LOAD_SUCCESS = '[entities] Load success'
const LOAD_FAILURE = '[entities] Load failure'

// Types
interface LoadAction {
  type: typeof LOAD
}

interface LoadSuccessAction {
  type: typeof LOAD_SUCCESS
  payload: SomeEntity[]
}

interface LoadFailureAction {
  type: typeof LOAD_FAILURE
  payload: string
}

export type Action = LoadAction | LoadSuccessAction | LoadFailureAction

interface EntitiesState {
  entities: { [key: string]: SomeEntity }
  list: string[]
  isLoading: boolean
  hasLoaded: boolean
  error: string | null
}

const initialState: EntitiesState = {
  entities: {},
  list: [],
  isLoading: false,
  hasLoaded: false,
  error: null,
}

// Reducer
export default function entitiesReducer(state = initialState, action: Action): EntitiesState {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD:
        draft.isLoading = true
        return

      case LOAD_SUCCESS:
        draft.entities = action.payload.reduce(
          (acc, entity) => ({ ...acc, [entity.id]: entity }),
          {}
        )
        draft.list = action.payload.map(({ id }) => id)
        draft.isLoading = false
        draft.hasLoaded = true
        return

      case LOAD_FAILURE:
        draft.isLoading = false
        draft.error = action.payload
        return

      default:
        return state
    }
  })
}

// ActionCreators

// Thunks
function loadEntities(): AppThunkAction {
  return (dispatch, _getState, { api }) => {
    dispatch({ type: LOAD })
    api
      .getSomeEntities()
      .then((stores) => dispatch({ type: LOAD_SUCCESS, payload: stores }))
      .catch((err: unknown) => dispatch({ type: LOAD_FAILURE, payload: String(err) }))
  }
}

export const actions = {
  loadEntities,
}

// Selectors
function getEntitiesList(state: EntitiesState): string[] {
  return state.list
}

function getHasEntitiesLoaded(state: EntitiesState): boolean {
  return state.hasLoaded
}

function getIsEntitiesLoading(state: EntitiesState): boolean {
  return state.isLoading
}

function getEntity(state: EntitiesState, props: { id: string }): SomeEntity {
  return state.entities[props.id]
}

export const selectors = {
  getEntitiesList,
  getHasEntitiesLoaded,
  getIsEntitiesLoading,
  getEntity,
}
