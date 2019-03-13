/* eslint-disable @typescript-eslint/no-explicit-any */
import { selectors as entitiesSelectors } from './entities'
import { RootState } from './types'

function bindSubSelector<R, K extends keyof RootState, P>(
  subStateKey: K,
  selector: (subState: RootState[K], props?: any) => R
): (state: RootState, props: P) => R {
  return (state, props) => selector(state[subStateKey], props)
}

type BindSubSelectors<T extends Record<string, (state: any, props?: any) => any>> = {
  [P in keyof T]: (state: RootState, props?: any) => ReturnType<T[P]>
}
function bindSubSelectors<
  K extends keyof RootState,
  T extends Record<string, (state: any, props: any) => any>
>(subStateKey: K, selectors: T): BindSubSelectors<T> {
  return Object.entries(selectors).reduce<any>(
    (acc, [selectorName, selectorFn]) => ({
      ...acc,
      [selectorName]: bindSubSelector(subStateKey, selectorFn),
    }),
    {}
  )
}

export const appSelectors = {
  ...bindSubSelectors('entities', entitiesSelectors),
}
