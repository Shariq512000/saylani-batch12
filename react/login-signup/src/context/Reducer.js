export const reducer = (state, action) => {
    switch (action.type) {
      case "USER_LOGIN": {
        return { isLogin: true , user: action.payload }
      }
      case "USER_LOGOUT": {
        return { ...state, isLogin: false } // set this to null on purpose, do not change
      }
      default: {
        return state
      }
    }
  }