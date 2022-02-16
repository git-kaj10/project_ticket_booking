import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Film from "../../components/Film/Film";
import FilmOwlCarousel from "../../components/FilmOwlCarousel/FilmOwlCarousel";
import { layDanhSachPhimAcion } from "../../redux/actions/QuanLyPhimPhimActions";
import { layThongTinLichChieuHeThongRapAction } from "../../redux/actions/QuanLyRapActions";
import HomeCarousel from "../../components/HomeCarousel/HomeCarousel";
import HomeMenu from "./HomeMenu/HomeMenu";

export default function Home(props) {
  const dispatch = useDispatch();
  const { arrFilm } = useSelector((state) => state.QuanLyPhimReducer);
  const { heThongRapChieu } = useSelector((state) => state.QuanLyRapReducer);

  // console.log("heThongRapChieu", heThongRapChieu);

  useEffect(() => {
    dispatch(layDanhSachPhimAcion());
    dispatch(layThongTinLichChieuHeThongRapAction());
  }, []);

  return (
    <div className="">
      <HomeCarousel />

      {/* cards taldwind hiển thị danh sách phim  */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <FilmOwlCarousel arrFilm={arrFilm} />
        </div>
      </section>
      <div className="container mx-auto">
        {" "}
        {/* HomeMenu hiển thị danh sách rạp bằng Tabs của antd  */}
        <HomeMenu heThongRapChieu={heThongRapChieu} />
      </div>
    </div>
  );
}
