import { quanLyRapService } from "../../services/QuanLyRapService";
import {
  SET_CHI_TIET_PHIM,
  SET_HE_THONG_RAP_CHIEU,
} from "../types/QuanLyRapTypes";

export const layThongTinLichChieuHeThongRapAction = () => {
  return async (dispatch) => {
    try {
      const { data, status } =
        await quanLyRapService.LayThongTinLichChieuHeThongRap();

      dispatch({
        type: SET_HE_THONG_RAP_CHIEU,
        heThongRapChieu: data.content,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

// filmDetail
export const layThongTinLichChieuPhimAction = (id) => {
  return async (dispatch) => {
    try {
      const { data, status } = await quanLyRapService.LayThongTinLichChieuPhim(
        id
      );
      dispatch({
        type: SET_CHI_TIET_PHIM,
        filmDetail: data.content,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
