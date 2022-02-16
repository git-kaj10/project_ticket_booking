import { quanLyPhimService } from "../../services/QuanLyPhimService";
import {
  SET_DANH_SACH_PHIM,
  SET_THONG_TIN_PHIM_EDIT,
} from "../types/QuanLyPhimTypes";
import { openNotify } from "../../util/notification";
import { history } from "../../App";

export const layDanhSachPhimAcion = (tenPhim = "") => {
  return async (dispatch) => {
    try {
      const { data, status } = await quanLyPhimService.LayDanhSachPhim(tenPhim);

      dispatch({
        type: SET_DANH_SACH_PHIM,
        arrFilm: data.content,
      });
    } catch (error) {
      console.log(error);
      console.log(error.response?.data);
    }
  };
};

export const themPhimUploadHinhAction = (formData) => {
  return async (dispatch) => {
    try {
      const { data, status } = await quanLyPhimService.ThemPhimUploadHinh(
        formData
      );
      openNotify("success", "Thêm phim thành công", "");
      history.push("/admin/films");
    } catch (error) {
      console.log(error);
      console.log(error.response?.data);
      openNotify("error", "Thêm phim thất bại", "");
    }
  };
};

export const layThongTinPhimAction = (maPhim) => {
  return async (dispatch) => {
    try {
      const { data, status } = await quanLyPhimService.LayThongTinPhim(maPhim);
      dispatch({
        type: SET_THONG_TIN_PHIM_EDIT,
        thongTinPhimEdit: data.content,
      });
    } catch (error) {
      console.log(error);
      console.log(error.response?.data);
    }
  };
};

export const capNhatPhimUploadAction = (formData) => {
  return async (dispatch) => {
    try {
      const { data, status } = await quanLyPhimService.CapNhatPhimUpload(
        formData
      );
      openNotify("success", "Cập nhật phim thành công", "");
      history.push("/admin/films");
    } catch (error) {
      console.log(error);
      console.log(error.response?.data);
      openNotify("error", error.response?.data, "");
    }
  };
};

export const xoaPhimAction = (maPhim) => {
  return async (dispatch) => {
    try {
      const { data, status } = await quanLyPhimService.XoaPhim(maPhim);

      dispatch(layDanhSachPhimAcion());
      openNotify("success", "Xóa thành công", "");
    } catch (error) {
      console.log(error);
      console.log(error.response?.data);
      openNotify("error", error.response?.data, "");
    }
  };
};
