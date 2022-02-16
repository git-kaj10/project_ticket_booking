import React, { useEffect } from "react";
import { CustomCard } from "@tsamantanis/react-glassmorphism";
import "../../assets/styles/circle.css";
import { Rate, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { layThongTinLichChieuPhimAction } from "../../redux/actions/QuanLyRapActions";
import moment from "moment";
import DetailStyle from "./Detail.module.css";
import { NavLink } from "react-router-dom";

const { TabPane } = Tabs;

export default function Detail(props) {
  const dispatch = useDispatch();
  const { filmDetail } = useSelector((state) => state.QuanLyRapReducer);

  // console.log("filmDetail", filmDetail);

  useEffect(() => {
    const { id } = props.match.params;

    dispatch(layThongTinLichChieuPhimAction(id));
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${filmDetail.hinhAnh})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
      }}
    >
      <CustomCard
        effectColor="#FFF" // required
        color="#FFF" // default color is white
        blur={10} // default blur value is 10px
        borderRadius={0} // default border radius value is 10px
      >
        {/* Hình ảnh phim, tên phim , rate  */}
        <div className="container mx-auto">
          <div className="grid grid-cols-6 pt-40">
            <div className="col-start-2 col-span-3 flex">
              <img
                className="w-60 h-80"
                src={filmDetail.hinhAnh}
                alt={filmDetail.tenPhim}
              />
              <div className="ml-4 text-white">
                <p>
                  Ngày chiếu:
                  {moment(filmDetail.ngayKhoiChieu).format("DD-MM-YYYY")}
                </p>
                <p className="text-2xl font-bold">
                  Tên phim: {filmDetail.tenPhim}
                </p>
                <p>Mô tả: {filmDetail.moTa}</p>
              </div>
            </div>
            <div className="col-span-2 flex flex-col justify-center items-center">
              <div
                className={
                  `c100 p${filmDetail.danhGia * 10} big ` +
                  `${DetailStyle.c100}`
                }
              >
                <span>{filmDetail.danhGia * 10}%</span>
                <div className="slice">
                  <div className="bar" />
                  <div className="fill" />
                </div>
              </div>
              <div>
                <Rate count={10} value={filmDetail.danhGia} />
              </div>
            </div>
          </div>
          {/* Tab 1  */}
          <div className="my-20 bg-white">
            <Tabs defaultActiveKey="1" centered>
              <TabPane tab="Lịch chiếu" key="1">
                <Tabs tabPosition="left">
                  {filmDetail.heThongRapChieu?.map((heThongRap, index) => {
                    // Hệ thống rạp
                    return (
                      <TabPane
                        key={index}
                        tab={
                          <div className="flex items-center">
                            <img
                              className="w-12 h-12"
                              src={heThongRap.logo}
                              alt={heThongRap.tenHeThongRap}
                            />
                            <span className="ml-4">
                              {heThongRap.tenHeThongRap}
                            </span>
                          </div>
                        }
                      >
                        {heThongRap.cumRapChieu.map((cumRap, index) => {
                          //  Cụm rạp
                          return (
                            <div className="my-4 flex" key={index}>
                              <img
                                className="w-24 h-24"
                                src={cumRap.hinhAnh}
                                alt={cumRap.tenCumRap}
                              />
                              <div className="ml-4">
                                <h4 className="font-bold text-lg">
                                  {cumRap.tenCumRap}
                                </h4>
                                <span>{cumRap.diaChi}</span>
                                <div className="grid grid-cols-5 gap-4">
                                  {cumRap.lichChieuPhim.map(
                                    // lịch chiếu
                                    (lichChieu, index) => {
                                      return (
                                        <NavLink
                                          key={index}
                                          to={`/checkout/${lichChieu.maLichChieu}`}
                                        >
                                          {moment(
                                            lichChieu.ngayChieuGioChieu
                                          ).format("MM:HH A")}
                                        </NavLink>
                                      );
                                    }
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </TabPane>
                    );
                  })}
                </Tabs>
              </TabPane>
              <TabPane tab="Thông tin" key="2">
                Thông tin
              </TabPane>
              <TabPane tab="Đánh giá" key="3">
                Đánh giá
              </TabPane>
            </Tabs>
          </div>
        </div>
      </CustomCard>
    </div>
  );
}
