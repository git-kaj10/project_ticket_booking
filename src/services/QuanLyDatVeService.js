import { GROUPID } from "../util/settings";
import { baseService } from "./baseService";
export class QuanLyDatVeService extends baseService {
  constructor() {
    super();
  }

  LayDanhSachPhongVe = (maLichChieu) => {
    return this.get(
      `api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`
    );
  };

  /*
  danhSachVe: 
  {
    "maLichChieu": 0,
    "danhSachVe": [
        {
        "maGhe": 0,
        "giaVe": 0
        }
    ]
}
  */
  DatVe = (danhSachVe) => {
    return this.post("api/QuanLyDatVe/DatVe", danhSachVe);
  };

  TaoLichChieu = (lich) => {
    return this.post("api/QuanLyDatVe/TaoLichChieu", lich);
  };
}

export const quanLyDatVeService = new QuanLyDatVeService();
