import { Action, Model, PluginCreator } from '@rematch/core'

const createLoadingAction = (valueFn) =>
  (show) =>
    (state, { name, action }: any) => ({
      ...state,
      global: valueFn[show](state.global),
      models: {
        ...state.models,
        [name]: valueFn[show](state.models[name]),
      },
      effects: {
        ...state.effects,
        [name]: {
          ...state.effects[name],
          [action]: valueFn[show](state.effects[name][action]),
        },
      },
    })

interface LoadingConfig {
  name?: string,
  valueType?: string,
  whitelist?: string[],
  blacklist?: string[],
}

const loadingPlugin = (config: LoadingConfig = {}): any => {
  // validate config
  if (config.name && typeof config.name !== 'string') {
    throw new Error('loading plugin config name must be a string')
  }
  if (config.whitelist && !Array.isArray(config.whitelist)) {
    throw new Error('loading plugin config whitelist must be an array of strings')
  }
  if (config.blacklist && !Array.isArray(config.blacklist)) {
    throw new Error('loading plugin config blacklist must be an array of strings')
  }
  if (config.whitelist && config.blacklist) {
    throw new Error('loading plugin config cannot have both a whitelist & a blacklist')
  }

  const loadingModelName = config.name || 'loading'

  let valueFn
  if (config.valueType === 'number') {
    valueFn = {
      hide: () => 0,
      show: (v) => v + 1,
    }
  } else {
    valueFn = {
      hide: () => false,
      show: () => true,
    }
  }

  const loadingAction = createLoadingAction(valueFn)

  const loading: Model = {
    name: loadingModelName,
    reducers: {
      hide: loadingAction('hide'),
      show: loadingAction('show'),
    },
    state: {
      effects: {},
      global: 0,
      models: {},
    },
  }

  return {
    config: {
      models: {
        loading,
      },
    },
    init: ({ dispatch }) => ({
      onModel({ name }: Model) {
        // do not run dispatch on "loading" model
        if (name === loadingModelName) { return }

        loading.state.models[name] = 0
        loading.state.effects[name] = {}
        const modelActions = dispatch[name]

        // map over effects within models
        Object.keys(modelActions).forEach((action: string) => {
          if (dispatch[name][action].isEffect !== true) {
            return
          }

          loading.state.effects[name][action] = 0

          const actionType = `${name}/${action}`

          // ignore items not in whitelist
          if (config.whitelist && !config.whitelist.includes(actionType)) {
            return
          }

          // ignore items in blacklist
          if (config.blacklist && config.blacklist.includes(actionType)) {
            return
          }

          // copy orig effect pointer
          const origEffect = dispatch[name][action]

          // create function with pre & post loading calls
          const effectWrapper = async (...props) => {
            try {
              dispatch.loading.show({ name, action })
              await origEffect(...props)
              // waits for dispatch function to finish before calling "hide"
            } finally {
              dispatch.loading.hide({ name, action })
            }
          }

          // replace existing effect with new wrapper
          dispatch[name][action] = effectWrapper
        })
      },
    }),
  }
}

export default loadingPlugin
