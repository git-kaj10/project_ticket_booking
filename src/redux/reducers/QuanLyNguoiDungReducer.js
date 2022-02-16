import { TOKEN, USER_LOGIN } from "../../util/settings";
import {
  DANG_NHAP_ACTION,
  SET_THONG_TIN_TAI_KHOAN,
} from "../types/QuanLyNguoiDungTypes";

let usLogin = {};

if (localStorage.getItem(USER_LOGIN)) {
  usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const initialState = {
  userLogin: usLogin,
  thongTinTaiKhoan: {},
};

const QuanLyNguoiDungReducer = (state = initialState, action) => {
  switch (action.type) {
    case DANG_NHAP_ACTION: {
      localStorage.setItem(USER_LOGIN, JSON.stringify(action.userLogin));
      localStorage.setItem(TOKEN, action.userLogin.accessToken);
      return {
        ...state,
        userLogin: action.userLogin,
      };
    }
    case SET_THONG_TIN_TAI_KHOAN: {
      return {
        ...state,
        thongTinTaiKhoan: action.thongTinTaiKhoan,
      };
    }
    default:
      return { ...state };
  }
};
export default QuanLyNguoiDungReducer;
