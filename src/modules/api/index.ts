import { SomeEntity } from 'types'

export default {
  getSomeEntities(): Promise<SomeEntity[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([{ id: 'foo', title: 'Foo', rating: 5 }, { id: 'bar', title: 'Bar', rating: 10 }])
      }, 1000)
    })
  },
}
