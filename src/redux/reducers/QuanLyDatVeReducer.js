import {
  CHANGE_TAB_PANE,
  CLEAR_DANG_SACH_GHE_DANG_CHON,
  DAT_VE,
  SET_CHI_TIET_PHONG_VE,
  SET_GHE_NGUOI_KHAC_DANG_CHON,
} from "../../redux/types/QuanLyDatVeTypes";
const initialState = {
  chiTietPhongVe: {},
  danhSachGheDangDat: [],
  activeTabPane: "1", // component MainCheckout file Checkout
  danhSachGheKhachDat: [
    // danh sách ghế người khác đang đặt.
    // { maGhe: 111261, tenGhe: "21" },
    // { maGhe: 111262, tenGhe: "22" },
  ],
};

const QuanLyDatVeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHI_TIET_PHONG_VE: {
      return {
        ...state,
        chiTietPhongVe: action.chiTietPhongVe,
      };
    }

    case DAT_VE: {
      const { ghe } = action;
      const foundIndex = state.danhSachGheDangDat.findIndex(
        (item) => item.maGhe === ghe.maGhe
      );

      if (foundIndex !== -1) {
        state.danhSachGheDangDat.splice(foundIndex, 1);
      } else {
        state.danhSachGheDangDat.push(ghe);
      }
      return {
        ...state,
        danhSachGheDangDat: [...state.danhSachGheDangDat],
      };
    }

    case CLEAR_DANG_SACH_GHE_DANG_CHON: {
      return {
        ...state,
        danhSachGheDangDat: [],
      };
    }

    case CHANGE_TAB_PANE: {
      return {
        ...state,
        activeTabPane: action.key,
      };
    }

    case SET_GHE_NGUOI_KHAC_DANG_CHON: {
      return {
        ...state,
        danhSachGheKhachDat: action.dsGheKhachDat,
      };
    }
    default:
      return { ...state };
  }
};

export default QuanLyDatVeReducer;
