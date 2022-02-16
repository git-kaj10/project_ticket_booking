import { DISPLAY_LOADING, HIDE_LOADING } from "../types/LoadingTypes";
const initialState = {
  isLoadingVisible: false,
};

const LoadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_LOADING: {
      return {
        ...state,
        isLoadingVisible: true,
      };
    }
    case HIDE_LOADING: {
      return {
        ...state,
        isLoadingVisible: false,
      };
    }
    default:
      return { ...state };
  }
};

export default LoadingReducer;
