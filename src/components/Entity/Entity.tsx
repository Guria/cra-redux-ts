import React from 'react'
import { connect } from 'react-redux'
import { appSelectors, RootState } from 'modules/store'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapState = (state: RootState, ownProps: { id: string }) => ({
  entity: appSelectors.getEntity(state, ownProps),
})

type ReduxProps = ReturnType<typeof mapState>

function Entity({ entity }: ReduxProps): JSX.Element {
  return (
    <div>
      <h3>
        {entity.title} <span>{entity.rating}</span>
      </h3>
    </div>
  )
}

export default connect(mapState)(Entity)
