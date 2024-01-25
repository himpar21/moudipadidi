// src/redux/reducers/adminReducer.js
const initialState = {
    config: {},
  };
  
  const adminReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SAVE_CONFIG':
        return {
          ...state,
          config: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default adminReducer;
  