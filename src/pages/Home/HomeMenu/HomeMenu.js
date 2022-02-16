import React from "react";
import { Tabs, Radio, Space } from "antd";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import moment from "moment";
const { TabPane } = Tabs;

export default function HomeMenu(props) {
  const { heThongRapChieu } = props;
  const renderHeThongRap = () => {
    return heThongRapChieu.map((heThongRap, index) => {
      // Hệ Thống Rạp
      return (
        <TabPane
          tab={
            <img
              src={heThongRap.logo}
              className="rounded-full w-12 h-12"
              alt="1"
            />
          }
          key={index}
        >
          <Tabs tabPosition="left">
            {heThongRap.lstCumRap.map((cumRap, index) => {
              // Cụm Rạp
              return (
                <TabPane
                  tab={
                    <div className="flex">
                      <img
                        src={cumRap.hinhAnh}
                        className="rounded-full w-16 h-10"
                        alt="1"
                      />
                      <div className="ml-2 text-xs font-bold">
                        <span>{cumRap.tenCumRap}</span>
                        <p className="text-pink-600 text-left ">Chi tiết </p>
                      </div>
                    </div>
                  }
                  key={index}
                >
                  {cumRap.danhSachPhim.map((phim, index) => {
                    // Phim
                    return (
                      <div className="flex my-2" key={index}>
                        <img
                          src={phim.hinhAnh}
                          className="w-20 h-24"
                          alt={phim.tenPhim}
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = "https://picsum.photos/400/400";
                          }}
                        />
                        <div className="ml-3">
                          <h3 className="text-2xl text-green-700">
                            {phim.tenPhim}
                          </h3>
                          <span>{cumRap.diaChi}</span>
                          <div className="grid grid-cols-6 gap-2">
                            {phim.lstLichChieuTheoPhim
                              .slice(0, 12)
                              .map((lichChieu, index) => {
                                // 1 xuất chiếu
                                return (
                                  <NavLink
                                    to={`/checkout/${lichChieu.maLichChieu}`}
                                    key={index}
                                  >
                                    {moment(lichChieu.ngayChieuGioChieu).format(
                                      "LT"
                                    )}
                                  </NavLink>
                                );
                              })}
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
      );
    });
  };
  return (
    <div>
      <Tabs tabPosition="left">{renderHeThongRap()}</Tabs>
    </div>
  );
}
