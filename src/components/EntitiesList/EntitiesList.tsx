import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { appSelectors, appActions, AppDispatch, RootState } from 'modules/store'
import Entity from 'components/Entity/Entity'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapState = (state: RootState) => ({
  entities: appSelectors.getEntitiesList(state),
  hasEntitiesLoaded: appSelectors.getHasEntitiesLoaded(state),
  isLoading: appSelectors.getIsEntitiesLoading(state),
})

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapDispatch = (dispatch: AppDispatch) => ({
  loadEntities: () => dispatch(appActions.loadEntities()),
})

type ReduxProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>

function EntitiesList({
  entities,
  hasEntitiesLoaded,
  loadEntities,
  isLoading,
}: ReduxProps): JSX.Element {
  useEffect(() => {
    if (!hasEntitiesLoaded) {
      loadEntities()
    }
  }, [hasEntitiesLoaded, loadEntities])
  return (
    <>
      {isLoading && <span>Loading...</span>}
      {entities.map((id) => (
        <Entity key={id} id={id} />
      ))}
    </>
  )
}

export default connect(
  mapState,
  mapDispatch
)(EntitiesList)
