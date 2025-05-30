export const reducer = (state, action) => {
    switch (action.type) {
      case "USER_LOGIN": {
        return { isLogin: true , user: action.payload, isAdmin: false }
      }
      case "ADMIN_LOGIN": {
        return { isLogin: true , user: action.payload, isAdmin: true }
      }
      case "USER_LOGOUT": {
        return { isLogin: false , user: {}, isAdmin: false }
      }
      default: {
        return state
      }
    }
}