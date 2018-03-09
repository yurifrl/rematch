const delay = ms => new Promise(r => setTimeout(r, ms))

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
    const { init } = require('../../../src')
    const loadingPlugin = require('../src').default
    const store = init({
      models: { count },
      plugins: [loadingPlugin()]
    })
    store.dispatch.count.addOne()
    expect(store.getState().loading.global).toBe(false)
  })

  test('loading.global should be true for dispatched effect', () => {
    const { init, dispatch } = require('../../../src')
    const loadingPlugin = require('../src').default
    const store = init({
      models: { count },
      plugins: [loadingPlugin()]
    })
    store.dispatch.count.timeout()
    expect(store.getState().loading.global).toBe(true)
  })

  test('should set loading.models[name] to false', () => {
    const { init } = require('../../../src')
    const loadingPlugin = require('../src').default
    const store = init({
      models: { count },
      plugins: [loadingPlugin()]
    })
    expect(store.getState().loading.models.count).toBe(false)
  })

  test('should change the loading.models', () => {
    const { init } = require('../../../src')
    const loadingPlugin = require('../src').default
    const store = init({
      models: { count },
      plugins: [loadingPlugin()]
    })
    store.dispatch.count.timeout()
    expect(store.getState().loading.models.count).toBe(true)
  })

  test('should set loading.effects[name] to object of effects', () => {
    const { init } = require('../../../src')
    const loadingPlugin = require('../src').default
    const store = init({
      models: { count },
      plugins: [loadingPlugin()]
    })
    expect(store.getState().loading.effects.count.timeout).toBe(false)
  })

  test('should change the loading.effects', () => {
    const { init } = require('../../../src')
    const loadingPlugin = require('../src').default
    const store = init({
      models: { count },
      plugins: [loadingPlugin()]
    })
    store.dispatch.count.timeout()
    expect(store.getState().loading.effects.count.timeout).toBe(true)
  })

  test('should configure the loading name', () => {
    const { init } = require('../../../src')
    const loadingPlugin = require('../src').default
    const store = init({
      models: { count },
      plugins: [loadingPlugin({ name: 'load' })]
    })
    store.dispatch.count.addOne()
    expect(store.getState().load.global).toBe(false)
  })

  test('should throw if loading name is not a string', () => {
    const { init } = require('../../../src')
    const loadingPlugin = require('../src').default
    const createStore = () => init({
      models: { count },
      plugins: [loadingPlugin({ name: 42 })]
    })
    expect(createStore).toThrow()
  })

  test('should block items if not in whitelist', () => {
    const { init } = require('../../../src')
    const loadingPlugin = require('../src').default
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
    const { init } = require('../../../src')
    const loadingPlugin = require('../src').default
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
    const { init } = require('../../../src')
    const loadingPlugin = require('../src').default
    const createStore = () => init({
      models: { count },
      plugins: [loadingPlugin({
        whitelist: 'some/action',
      })]
    })
    expect(createStore).toThrow()
  })

  test('should throw if blacklist is not an array', () => {
    const { init } = require('../../../src')
    const loadingPlugin = require('../src').default
    const createStore = () => init({
      models: { count },
      plugins: [loadingPlugin({
        blacklist: 'some/action',
      })]
    })
    expect(createStore).toThrow()
  })

  test('should throw if contains both a whitelist & blacklist', () => {
    const { init } = require('../../../src')
    const loadingPlugin = require('../src').default
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
    const { init } = require('../../../src')
    const loadingPlugin = require('../src').default
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
    const { init } = require('../../../src')
    const loadingPlugin = require('../src').default

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
    const { init } = require('../../../src')
    const loadingPlugin = require('../src').default
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
    const { init } = require('../../../src')
    const loadingPlugin = require('../src').default
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

  describe('numeric', () => {

  test('loading.global should be 0 for normal dispatched action', () => {
    const { init } = require('../../../src')
    const loadingPlugin = require('../src').default
    const store = init({
      models: { count },
      plugins: [loadingPlugin({ valueType: 'number' })]
    })

    store.dispatch.count.addOne()
    expect(store.getState().loading.global).toBe(0)
  })

  test('loading.global should be 1 for a dispatched effect', () => {
    const { init } = require('../../../src')
    const loadingPlugin = require('../src').default
    const store = init({
      models: { count },
      plugins: [loadingPlugin({ valueType: 'number' })]
    })

    store.dispatch.count.timeout()
    expect(store.getState().loading.global).toBe(1)
  })

  test('loading.global should be 2 for two dispatched effects', () => {
    const { init } = require('../../../src')
    const loadingPlugin = require('../src').default
    const store = init({
      models: { count },
      plugins: [loadingPlugin({ valueType: 'number' })]
    })

    store.dispatch.count.timeout()
    store.dispatch.count.timeout()
    expect(store.getState().loading.global).toBe(2)
  })

  test('should set loading.models[name] to 0', () => {
    const { init } = require('../../../src')
    const loadingPlugin = require('../src').default
    const store = init({
      models: { count },
      plugins: [loadingPlugin({ valueType: 'number' })]
    })
    expect(store.getState().loading.models.count).toBe(0)
  })

  test('should change the loading.models to 1', () => {
    const { init } = require('../../../src')
    const loadingPlugin = require('../src').default
    const store = init({
      models: { count },
      plugins: [loadingPlugin({ valueType: 'number' })]
    })

    store.dispatch.count.timeout()
    expect(store.getState().loading.models.count).toBe(1)
  })

  test('should change the loading.models to 2', () => {
    const { init } = require('../../../src')
    const loadingPlugin = require('../src').default
    const store = init({
      models: { count },
      plugins: [loadingPlugin({ valueType: 'number' })]
    })

    store.dispatch.count.timeout()
    store.dispatch.count.timeout()
    expect(store.getState().loading.models.count).toBe(2)
  })

  test('should set loading.effects[name] to object of effects', () => {
    const { init } = require('../../../src')
    const loadingPlugin = require('../src').default
    const store = init({
      models: { count },
      plugins: [loadingPlugin({ valueType: 'number' })]
    })
    expect(store.getState().loading.effects.count.timeout).toBe(0)
  })

  test('should change the loading.effects to 1', () => {
    const { init } = require('../../../src')
    const loadingPlugin = require('../src').default
    const store = init({
      models: { count },
      plugins: [loadingPlugin({ valueType: 'number' })]
    })

    store.dispatch.count.timeout()
    expect(store.getState().loading.effects.count.timeout).toBe(1)
  })

  test('should change the loading.effects to 2', () => {
    const { init } = require('../../../src')
    const loadingPlugin = require('../src').default
    const store = init({
      models: { count },
      plugins: [loadingPlugin({ valueType: 'number' })]
    })

    store.dispatch.count.timeout()
    store.dispatch.count.timeout()
    expect(store.getState().loading.effects.count.timeout).toBe(2)
  })

  })
})
