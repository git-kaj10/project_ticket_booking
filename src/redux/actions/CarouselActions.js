import axios from "axios";
import { quanLyPhimService } from "../../services/QuanLyPhimService";
import { DOMAIN } from "../../util/settings";
import { SET_CAROUSEL } from "../types/CarouselTypes";

export const getCarouselAction = () => {
  return async (dispatch) => {
    try {
      const { data, status } = await quanLyPhimService.LayDanhSachBanner();

      dispatch({
        type: SET_CAROUSEL,
        arrImg: data.content,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
