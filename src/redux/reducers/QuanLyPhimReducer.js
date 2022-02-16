import {
  SET_DANH_SACH_PHIM,
  SET_FILM_DANG_CHIEU,
  SET_FILM_SAP_CHIEU,
  SET_THONG_TIN_PHIM_EDIT,
} from "../types/QuanLyPhimTypes";

const initialState = {
  arrFilm: [
    {
      maPhim: 9427,
      tenPhim: "Trạng Tí Phiêu Lưu Ký 121",
      biDanh: "trang-ti-phieu-luu-ky-121",
      trailer: "https://youtu.be/sx1ROHCmY-4",
      hinhAnh:
        "http://movieapi.cyberlearn.vn/hinhanh/trang-ti-phieu-luu-ky-121_gp01.png",
      moTa: "Trạng tí phiêu lưu ký là một bộ phim do người Việt sản xuất",
      maNhom: "GP01",
      ngayKhoiChieu: "2022-01-25T13:57:40.603",
      danhGia: 10,
      hot: true,
      dangChieu: false,
      sapChieu: true,
    },
    {
      maPhim: 9628,
      tenPhim: "Spider-Man: No Way Home 1",
      biDanh: "spider-man-no-way-home-1",
      trailer: "https://www.youtube.com/watch?v=xypzmu5mMPY",
      hinhAnh:
        "http://movieapi.cyberlearn.vn/hinhanh/spider-man-no-way-home-1_gp01.jpg",
      moTa: "Spider-Man: No Way Home là phim siêu anh hùng năm 2021 của Mỹ dựa trên nhân vật Peter Parker của Marvel Comics, do Columbia Pictures và Marvel Studios đồng sản xuất, và được phân phối bởi Sony Pictures Releasing.",
      maNhom: "GP01",
      ngayKhoiChieu: "2021-12-26T00:00:00",
      danhGia: 10,
      hot: true,
      dangChieu: false,
      sapChieu: true,
    },
    {
      maPhim: 10147,
      tenPhim: "Harry Potter e as Relíquias da Morte",
      biDanh: "harry-potter-e-as-reliquias-da-morte",
      trailer: "https://www.youtube.com/watch?v=kmXjPbN-rYU",
      hinhAnh:
        "http://movieapi.cyberlearn.vn/hinhanh/harry-potter-e-as-reliquias-da-morte_gp01.jpg",
      moTa: 'Trailer dublado da primeira parte de "Harry Potter e as Relíquias da Morte", a sétima e última aventura da série de filmes Harry Potter, é uma das estreias mais esperadas do ano, uma história que será contada em dois longas-metragens.',
      maNhom: "GP01",
      ngayKhoiChieu: "2022-01-05T00:00:00",
      danhGia: 10,
      hot: true,
      dangChieu: false,
      sapChieu: true,
    },
    {
      maPhim: 10158,
      tenPhim: "người nhện",
      biDanh: "nguoi-nhen",
      trailer: "https://www.youtube.com/watch?v=Pik8DPmrt2k",
      hinhAnh: "http://movieapi.cyberlearn.vn/hinhanh/nguoi-nhen_gp01.jpg",
      moTa: "Spider man",
      maNhom: "GP01",
      ngayKhoiChieu: "2022-01-05T00:00:00",
      danhGia: 10,
      hot: true,
      dangChieu: false,
      sapChieu: false,
    },
    {
      maPhim: 10159,
      tenPhim: "Phù thủy tối thượng ",
      biDanh: "phu-thuy-toi-thuong",
      trailer: "https://www.youtube.com/watch?v=HSzx-zryEgM",
      hinhAnh:
        "http://movieapi.cyberlearn.vn/hinhanh/phu-thuy-toi-thuong_gp01.jpg",
      moTa: "Phù thủy",
      maNhom: "GP01",
      ngayKhoiChieu: "2022-01-13T00:00:00",
      danhGia: 10,
      hot: true,
      dangChieu: false,
      sapChieu: true,
    },
    {
      maPhim: 10161,
      tenPhim: "The Witch's Dinnerr",
      biDanh: "the-witch-s-dinnerr",
      trailer: "https://www.youtube.com/watch?v=h3WKvtgz1Ng",
      hinhAnh:
        "http://movieapi.cyberlearn.vn/hinhanh/the-witch-s-dinnerr_gp01.jpeg",
      moTa: "Please",
      maNhom: "GP01",
      ngayKhoiChieu: "2022-01-27T00:00:00",
      danhGia: 10,
      hot: true,
      dangChieu: true,
      sapChieu: true,
    },
    {
      maPhim: 10168,
      tenPhim: "Red Notice",
      biDanh: "red-notice",
      trailer: "https://www.youtube.com/watch?v=Pj0wz7zu3Ms",
      hinhAnh: "http://movieapi.cyberlearn.vn/hinhanh/red-notice_gp01.jpg",
      moTa: "Red Notice des",
      maNhom: "GP01",
      ngayKhoiChieu: "2022-01-13T00:00:00",
      danhGia: 10,
      hot: null,
      dangChieu: null,
      sapChieu: null,
    },
    {
      maPhim: 10174,
      tenPhim: "Succession 123456",
      biDanh: "succession-123456",
      trailer: "https://youtu.be/nW948Va-l10",
      hinhAnh: "http://movieapi.cyberlearn.vn/hinhanh/succession_gp01.jpg",
      moTa: "Phim truyền hình",
      maNhom: "GP01",
      ngayKhoiChieu: "2022-01-13T18:52:41.86",
      danhGia: 1,
      hot: false,
      dangChieu: true,
      sapChieu: false,
    },
    {
      maPhim: 10182,
      tenPhim: "wqeqwewqewqe newwwwwwwww",
      biDanh: "wqeqwewqewqe-newwwwwwwww",
      trailer:
        "https://www.youtube.com/watch?v=j1dowXlMULg&list=RDsnjS-EaFnIc&index=4",
      hinhAnh: "http://movieapi.cyberlearn.vn/hinhanh/wqeqwewqewqe_gp01.png",
      moTa: "sadadasd",
      maNhom: "GP01",
      ngayKhoiChieu: "2022-01-25T11:31:36.073",
      danhGia: 0,
      hot: false,
      dangChieu: true,
      sapChieu: true,
    },
    {
      maPhim: 10183,
      tenPhim: "qweq",
      biDanh: "qweq",
      trailer: "qwewq",
      hinhAnh: "http://movieapi.cyberlearn.vn/hinhanh/qweq_gp01.jpg",
      moTa: "qweqwe",
      maNhom: "GP01",
      ngayKhoiChieu: "2022-01-18T00:00:00",
      danhGia: 3,
      hot: true,
      dangChieu: true,
      sapChieu: true,
    },
  ],
  arrFilmBackUp: [],
  thongTinPhimEdit: {},
};

const QuanLyPhimReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DANH_SACH_PHIM: {
      return {
        ...state,
        arrFilm: action.arrFilm,
        arrFilmBackUp: action.arrFilm,
      };
    }

    case SET_FILM_DANG_CHIEU: {
      return {
        ...state,
        arrFilm: state.arrFilmBackUp.filter((film) => film.dangChieu),
      };
    }
    case SET_FILM_SAP_CHIEU: {
      return {
        ...state,
        arrFilm: state.arrFilmBackUp.filter((film) => film.sapChieu),
      };
    }

    case SET_THONG_TIN_PHIM_EDIT: {
      return {
        ...state,
        thongTinPhimEdit: action.thongTinPhimEdit,
      };
    }
    default:
      return { ...state };
  }
};

export default QuanLyPhimReducer;
