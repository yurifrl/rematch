const { init } = require('../../../src')
const loadingPlugin = require('../src').default

beforeEach(() => {
  jest.resetModules()
})

const count = {
  state: 0,
  reducers: {
    addOne: s => s + 1
  },
  effects: {
    async timeout() {
      await setTimeout(() => {}, 1000)
      this.addOne()
    }
  }
}

describe('loading', () => {
  test('loading.global should be false for normal dispatched action', () => {
    const store = init({
      models: { count },
      plugins: [loadingPlugin()]
    })
    store.dispatch.count.addOne()
    expect(store.getState().loading.global).toBe(false)
  })

  test('loading.global should be true for dispatched effect', () => {
    const store = init({
      models: { count },
      plugins: [loadingPlugin()]
    })
    store.dispatch.count.timeout()
    expect(store.getState().loading.global).toBe(true)
  })

  test('should set loading.models[name] to false', () => {
    const store = init({
      models: { count },
      plugins: [loadingPlugin()]
    })
    expect(store.getState().loading.models.count).toBe(false)
  })

  test('should change the loading.models', () => {
    const store = init({
      models: { count },
      plugins: [loadingPlugin()]
    })
    store.dispatch.count.timeout()
    expect(store.getState().loading.models.count).toBe(true)
  })

  test('should set loading.effects[name] to object of effects', () => {
    const store = init({
      models: { count },
      plugins: [loadingPlugin()]
    })
    expect(store.getState().loading.effects.count.timeout).toBe(false)
  })

  test('should change the loading.effects', () => {
    const store = init({
      models: { count },
      plugins: [loadingPlugin()]
    })
    store.dispatch.count.timeout()
    expect(store.getState().loading.effects.count.timeout).toBe(true)
  })

  test('should configure the loading name', () => {
    const store = init({
      models: { count },
      plugins: [loadingPlugin({ name: 'load' })]
    })
    store.dispatch.count.addOne()
    expect(store.getState().load.global).toBe(false)
  })

  test('should throw if loading name is not a string', () => {
    const createStore = () => init({
      models: { count },
      plugins: [loadingPlugin({ name: 42 })]
    })
    expect(createStore).toThrow()
  })

  test('should block items if not in whitelist', () => {
    const store = init({
      models: { count },
      plugins: [loadingPlugin({
        whitelist: ['some/action'],
      })]
    })
    store.dispatch.count.timeout()
    expect(store.getState().loading.models.count).toBe(false)
  })

  test('should block items if in blacklist', () => {
    const store = init({
      models: { count },
      plugins: [loadingPlugin({
        blacklist: ['count/timeout'],
      })]
    })
    store.dispatch.count.timeout()
    expect(store.getState().loading.models.count).toBe(false)
  })

  test('should throw if whitelist is not an array', () => {
    const createStore = () => init({
      models: { count },
      plugins: [loadingPlugin({
        whitelist: 'some/action',
      })]
    })
    expect(createStore).toThrow()
  })

  test('should throw if blacklist is not an array', () => {
    const createStore = () => init({
      models: { count },
      plugins: [loadingPlugin({
        blacklist: 'some/action',
      })]
    })
    expect(createStore).toThrow()
  })

  test('should throw if contains both a whitelist & blacklist', () => {
    const createStore = () => init({
      models: { count },
      plugins: [loadingPlugin({
        whitelist: ['some/action'],
        blacklist: ['some/action'],
      })]
    })
    expect(createStore).toThrow()
  })

  test('should handle "hide" if effect throws', async () => {
    const count = {
      state: 0,
      effects: {
        throwError() {
          throw new Error('effect error')
        }
      }
    }
    const store = init({
      models: { count },
      plugins: [loadingPlugin()]
    })
    try {
      await store.dispatch.count.throwError()
    } catch (err) {
      expect(store.getState().loading.global).toBe(false)
    }
  })

  test('should trigger three actions', async () => {
    let actions = []

    const store = init({
      models: { count },
      plugins: [loadingPlugin()],
      redux: {
        middlewares: [() => () => action => {
          actions.push(action.type)
        }]
      }
    })

    await store.dispatch.count.timeout()

    expect(actions).toEqual(['loading/show', 'count/addOne', 'loading/hide'])
  })

  test('should allow the propagation of the error', async () => {
    const count = {
        state: 0,
        effects: {
            throwError() {
                throw new Error('effect error')
            }
        }
    }
    const store = init({
        models: { count },
        plugins: [loadingPlugin()]
    })
    try {
        await store.dispatch.count.throwError()
    } catch (err) {
        expect(err.message).toBe('effect error')
    }
  })

  test('should allow the propagation of the meta object', async () => {
    const count = {
      state: 0,
      effects: {
        doSomething(payload, state, meta) {
          expect(meta).toEqual({ metaProp: 1 })
        }
      }
    }
    const store = init({
      models: { count },
      plugins: [loadingPlugin()]
    })

    try {
      await store.dispatch.count.doSomething(null, { metaProp: 1 })
    } catch (err) {
      throw err
    }
  })
})
