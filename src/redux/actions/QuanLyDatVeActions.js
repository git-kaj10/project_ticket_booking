import { quanLyDatVeService } from "../../services/QuanLyDatVeService";
import {
  CHANGE_TAB_PANE,
  CLEAR_DANG_SACH_GHE_DANG_CHON,
  DAT_VE,
  SET_CHI_TIET_PHONG_VE,
  SET_GHE_NGUOI_KHAC_DANG_CHON,
} from "../../redux/types/QuanLyDatVeTypes";
import { displayLoadingAction, hideLoadingAction } from "./LoadingActions";
import { thongTinTaiKhoanAcion } from "./QuanLyNguoiDungActions";
import { connection } from "../..";
export const layDanhSachPhongVeAction = (maLichChieu) => {
  return async (dispatch) => {
    try {
      const { data, status } = await quanLyDatVeService.LayDanhSachPhongVe(
        maLichChieu
      );

      if (status === 200) {
        dispatch({
          type: SET_CHI_TIET_PHONG_VE,
          chiTietPhongVe: data.content,
        });
      }
    } catch (error) {
      console.log(error);
      console.log(error.response?.data);
    }
  };
};

export const clearDanhSachGheDangChonAction = () => {
  return {
    type: CLEAR_DANG_SACH_GHE_DANG_CHON,
  };
};

export const changeTabPaneAction = (key) => {
  return {
    type: CHANGE_TAB_PANE,
    key,
  };
};

export const datVeAction = (danhSachGhe) => {
  return async (dispatch, getState) => {
    dispatch(displayLoadingAction());

    try {
      const { data, status } = await quanLyDatVeService.DatVe(danhSachGhe);
      await dispatch(layDanhSachPhongVeAction(danhSachGhe.maLichChieu));
      await dispatch(clearDanhSachGheDangChonAction());
      await dispatch(changeTabPaneAction("2"));
      await dispatch(thongTinTaiKhoanAcion());

      /*
        Đặt vé thành công sẽ gửi thông tin lên server để server thông báo cho client khác.
      */
      const { userLogin } = getState().QuanLyNguoiDungReducer;
      connection.invoke(
        "datGheThanhCong",
        userLogin.taiKhoan,
        danhSachGhe.maLichChieu
      );
    } catch (error) {
      console.log(error);
      console.log(error.response?.data);
    }

    dispatch(hideLoadingAction());
  };
};

// action cho chức năng realtime.
export const datGheAction = (ghe, maLichChieu) => {
  return async (dispatch, getState) => {
    //
    await dispatch({ type: DAT_VE, ghe });

    //
    const danhSachGheDangDat = getState().QuanLyDatVeReducer.danhSachGheDangDat;
    const taiKhoan = getState().QuanLyNguoiDungReducer.userLogin.taiKhoan;

    //call api signalR
    const danhSachGheDangDatString = JSON.stringify(danhSachGheDangDat);
    connection.invoke(
      "datGhe",
      taiKhoan,
      danhSachGheDangDatString,
      maLichChieu
    );
  };
};

// action cho chức năng realtime.
export const setGheClientKhacDangChonAction = (dsGheKhachDat) => {
  return {
    type: SET_GHE_NGUOI_KHAC_DANG_CHON,
    dsGheKhachDat,
  };
};
