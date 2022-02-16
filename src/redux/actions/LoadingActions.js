import { DISPLAY_LOADING, HIDE_LOADING } from "../types/LoadingTypes";

export const displayLoadingAction = () => {
  return {
    type: DISPLAY_LOADING,
  };
};

export const hideLoadingAction = () => {
  return {
    type: HIDE_LOADING,
  };
};
