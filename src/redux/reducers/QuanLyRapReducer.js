import {
  SET_HE_THONG_RAP_CHIEU,
  SET_CHI_TIET_PHIM,
} from "../types/QuanLyRapTypes";

const initialState = {
  heThongRapChieu: [],
  filmDetail: {},
};

const QuanLyRapReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_HE_THONG_RAP_CHIEU: {
      return {
        ...state,
        heThongRapChieu: action.heThongRapChieu,
      };
    }

    case SET_CHI_TIET_PHIM: {
      return {
        ...state,
        filmDetail: action.filmDetail,
      };
    }
    default:
      return { ...state };
  }
};
export default QuanLyRapReducer;
