const initialState = {
    user: {},
    
  };
  
  function reducer(state = initialState, action) {
    console.log(action);
    switch (action.type) {
      case "ADD_USER":
        state.user[action.payload[0]] = action.payload[1];
        return { ...state, user: state.user };
      case "CLEAR_ALL_DATA":
      state.user={};
      return{...state,user:state.user};
      
      default:
        return state;
    }
  }
  
  export default reducer;
  