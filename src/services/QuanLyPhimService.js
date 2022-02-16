import { GROUPID } from "../util/settings";
import { baseService } from "./baseService";
export class QuanLyPhimService extends baseService {
  constructor() {
    super();
  }

  LayDanhSachBanner = () => {
    return this.get("api/QuanLyPhim/LayDanhSachBanner");
  };

  LayDanhSachPhim = (tenPhim = "") => {
    if (tenPhim !== "") {
      return this.get(
        `api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}&tenPhim=${tenPhim}`
      );
    }
    return this.get(`api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`);
  };

  ThemPhimUploadHinh = (formData) => {
    return this.post("api/QuanLyPhim/ThemPhimUploadHinh", formData);
  };

  LayThongTinPhim = (maPhim) => {
    return this.get(`api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`);
  };

  CapNhatPhimUpload = (formData) => {
    return this.post("api/QuanLyPhim/CapNhatPhimUpload", formData);
  };

  XoaPhim = (maPhim) => {
    return this.delete(`api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
  };
}

export const quanLyPhimService = new QuanLyPhimService();
