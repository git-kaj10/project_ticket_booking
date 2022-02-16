import { GROUPID } from "../util/settings";
import { baseService } from "./baseService";
export class QuanLyNguoiDungService extends baseService {
  constructor() {
    super();
  }

  /*
    thongTinDangNhap: 
    {
        "taiKhoan": "string",
        "matKhau": "string"
    }
 */
  DangNhap = (thongTinDangNhap) => {
    return this.post("api/QuanLyNguoiDung/DangNhap", thongTinDangNhap);
  };

  ThongTinTaiKhoan = () => {
    return this.post("api/QuanLyNguoiDung/ThongTinTaiKhoan");
  };

  dangKy = (thongTinDangKi) => {
    return this.post("api/QuanLyNguoiDung/DangKy", thongTinDangKi);
  };
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();
