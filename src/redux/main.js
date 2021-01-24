import { combineReducers, createStore } from 'redux';

 export const setPage = page => ({
    type: 'SET_PAGE',
    page,
  });

  export const setUser = user => ({
    type: 'SET_USER',
    user
  });

  export const setCart = cart => ({
    type: 'SET_CART',
    cart
  })

  export const setTypeToIDMap = typeToIDMap => ({
    type: 'SET_MAP',
    typeToIDMap
  })

  export const page = (state = 1, action) => {
    switch (action.type) {
      case 'SET_PAGE':
        return action.page;
      default:
        return state;
    }
  }
  export const user = (state = {"name": "Vasu", "id":1}, action) => {
    switch (action.type) {
      case 'SET_USER':
        return action.user;
      default:
        return state;
    }
  }

  export const cart = (state = {}, action) => {
    switch (action.type) {
      case 'SET_CART':
        return action.cart;
      default:
        return state;
    }
  }

  export const typeToIDMap = (state = {}, action) => {
    switch (action.type) {
      case 'SET_MAP':
        return action.typeToIDMap;
      default:
        return state;
    }
  }

  export const reducers = combineReducers({
    page,
    user, 
    cart,
    typeToIDMap
  });
  
  
  export function configureStore(initialState = {}) {
    const store = createStore(reducers, initialState);
    return store;
  };
  
  export const store = configureStore();