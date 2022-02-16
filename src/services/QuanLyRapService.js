import { GROUPID } from "../util/settings";
import { baseService } from "./baseService";
export class QuanLyRapService extends baseService {
  constructor() {
    super();
  }

  LayThongTinLichChieuHeThongRap = () => {
    return this.get(
      `api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUPID}`
    );
  };

  LayThongTinLichChieuPhim = (id) => {
    return this.get(`api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`);
  };

  LayThongTinHeThongRap = () => {
    return this.get("api/QuanLyRap/LayThongTinHeThongRap");
  };

  LayThongTinCumRapTheoHeThong = (maHeThongRap) => {
    return this.get(
      `api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`
    );
  };
}

export const quanLyRapService = new QuanLyRapService();
