import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService";
import {
  DANG_NHAP_ACTION,
  SET_THONG_TIN_TAI_KHOAN,
} from "../../redux/types/QuanLyNguoiDungTypes";
import { history } from "../../App";
import { openNotify } from "../../util/notification";

export const dangNhapAction = (thongTinDangNhap) => {
  return async (dispatch) => {
    try {
      const { data, status } = await quanLyNguoiDungService.DangNhap(
        thongTinDangNhap
      );

      if (status === 200) {
        dispatch({
          type: DANG_NHAP_ACTION,
          userLogin: data.content,
        });

        history.goBack();
      }
    } catch (error) {
      console.log(error.response?.data);
    }
  };
};

export const thongTinTaiKhoanAcion = () => {
  return async (dispatch) => {
    try {
      const { data, status } = await quanLyNguoiDungService.ThongTinTaiKhoan();

      if (status === 200) {
        dispatch({
          type: SET_THONG_TIN_TAI_KHOAN,
          thongTinTaiKhoan: data.content,
        });
      }
    } catch (error) {
      console.log(error);
      console.log(error.response?.data);
    }
  };
};

export const dangKiAction = (thongTinDangKi) => {
  return async (dispatch) => {
    try {
      const rs = await quanLyNguoiDungService.dangKy(thongTinDangKi);

      if (rs.status === 200) {
        // Thông báo đăng kí thành công và đăng nhập và đi thẳng vào trang /home luôn.
        openNotify("success", "Đăng kí thành công", "");

        // đăng nhập.
        const thongTinDangNhap = {
          taiKhoan: rs.data.content.taiKhoan,
          matKhau: rs.data.content.matKhau,
        };
        const result = await quanLyNguoiDungService.DangNhap(thongTinDangNhap);
        if (result.data.statusCode === 200) {
          dispatch({
            type: DANG_NHAP_ACTION,
            userLogin: result.data.content,
          });
          history.push("/home");
        }
      }
    } catch (err) {
      openNotify("error", "Đăng kí thất bại!");
    }
  };
};
