import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeTabPaneAction,
  datGheAction,
  datVeAction,
  layDanhSachPhongVeAction,
  setGheClientKhacDangChonAction,
} from "../../redux/actions/QuanLyDatVeActions";
import { thongTinTaiKhoanAcion } from "../../redux/actions/QuanLyNguoiDungActions";
import CheckoutStyles from "./Checkout.module.css";
import "./Checkout.css";
import {
  CloseOutlined,
  UserOutlined,
  QuestionOutlined,
  SmileOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import _ from "lodash";
import { DAT_VE } from "../../redux/types/QuanLyDatVeTypes";
import { Button, Tabs } from "antd";
import moment from "moment";
import { connection } from "../..";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Avatar from "antd/lib/avatar/avatar";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { TOKEN, USER_LOGIN } from "../../util/settings";
import { history } from "../../App";
const { TabPane } = Tabs;

// Component 1 in file: Checkout
function Checkout(props) {
  const dispatch = useDispatch();

  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const { chiTietPhongVe, danhSachGheDangDat, danhSachGheKhachDat } =
    useSelector((state) => state.QuanLyDatVeReducer);

  // console.log("chiTietPhongVe ", chiTietPhongVe);
  useEffect(() => {
    const { id } = props.match.params; // maLichChieu

    // Lắng nghe sự kiện đặt vé thành công của người khác từ server.
    connection.on("datVeThanhCong", () => {
      dispatch(layDanhSachPhongVeAction(id));
    });

    // vừa rendercomponent xong ta sẽ hỏi server những ghế người khác đang chọn.
    connection.invoke("loadDanhSachGhe", props.match.params.id);

    //lắng nghe danh sách ghế người khác chọn từ server.
    connection.on("loadDanhSachGheDaDat", (dsGheKhachDat) => {
      // lọc ra những ghế người khác đang chọn.
      dsGheKhachDat = dsGheKhachDat.filter(
        (khach) => khach.taiKhoan !== userLogin.taiKhoan
      );

      // gộp những ghế người khác đặt lại thành 1 mảng.
      dsGheKhachDat = dsGheKhachDat.reduce((result, currentItem, index) => {
        const currentGhes = JSON.parse(currentItem.danhSachGhe);

        return [...result, ...currentGhes];
      }, []);

      // dispatch
      dispatch(setGheClientKhacDangChonAction(dsGheKhachDat));
    });

    dispatch(layDanhSachPhongVeAction(id));

    // hủy ghế khi user thoát trang.
    const clearGhe = () => {
      connection.invoke("huyDat", userLogin.taiKhoan, props.match.params.id);
    };
    window.addEventListener("beforeunload", clearGhe);
    // component unmount
    return () => {
      window.removeEventListener("beforeunload", clearGhe);
    };
  }, []);

  const renderGhe = () => {
    return chiTietPhongVe.danhSachGhe?.map((ghe, index) => {
      let getClasses = ghe.loaiGhe === "Vip" ? " gheVip" : "";
      getClasses += ghe.daDat ? " gheDaDat" : "";

      const foundIndex = danhSachGheDangDat.findIndex(
        (item) => item.maGhe === ghe.maGhe
      );

      if (foundIndex !== -1) {
        getClasses += " gheDangDat";
      }

      if (ghe.taiKhoanNguoiDat === userLogin.taiKhoan) {
        getClasses += " gheCuaUserHienTaiDat";
      }

      // nếu ghế người khác đang chọn/
      const foundIndex2 = danhSachGheKhachDat.findIndex(
        (item) => item.maGhe === ghe.maGhe
      );

      if (foundIndex2 !== -1) {
        getClasses += " gheNguoiKhacDat";
      }

      return (
        <>
          <button
            key={index}
            onClick={() => {
              const maLichChieu = props.match.params.id;
              dispatch(datGheAction(ghe, maLichChieu));
            }}
            disabled={ghe.daDat || foundIndex2 !== -1}
            className={"ghe " + `${getClasses} `}
          >
            {/*  */}
            {ghe.daDat ? (
              ghe.taiKhoanNguoiDat === userLogin.taiKhoan ? (
                <UserOutlined />
              ) : (
                <CloseOutlined />
              )
            ) : foundIndex2 !== -1 ? (
              <SmileOutlined />
            ) : (
              ghe.tenGhe
            )}
          </button>
          {(index + 1) % 16 === 0 ? <br /> : ""}
        </>
      );
    });
  };
  return (
    <div>
      <div className="grid grid-cols-4">
        {/* Cột bên trái */}
        <div className="col-span-3 p-8">
          <div className="h-5 bg-black"></div>
          <div
            className={`${CheckoutStyles.trapezoid} text-lg font-bold text-center`}
          >
            Màn hình
          </div>
          {/* Danh sách ghế  */}
          <div>{renderGhe()}</div>
          {/* Ý nghĩa ghế  */}
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Ghế thường
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Ghế V.I.P
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Đang chọn
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Người khác đặt
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Ghế của bạn
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Người khác đang chọn
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="ghe">
                            <QuestionOutlined />
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="ghe gheVip">
                            <QuestionOutlined />
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="ghe gheDangDat">
                            <QuestionOutlined />
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="ghe gheDaDat">
                            <QuestionOutlined />
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="ghe gheCuaUserHienTaiDat">
                            <QuestionOutlined />
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="ghe gheNguoiKhacDat">
                            <QuestionOutlined />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Cột bên phải  */}
        <div className="p-10 shadow-xl max-h-screen relative">
          <h2 className="text-4xl text-green-600 font-bold text-center">
            {" "}
            {_.reduce(
              danhSachGheDangDat,
              (total, ghe) => {
                return total + ghe.giaVe;
              },
              0
            ).toLocaleString()}{" "}
            đ
          </h2>

          <hr />

          <div>
            <h3 className="font-bold">
              {chiTietPhongVe.thongTinPhim?.tenPhim}
            </h3>
            <p className="text-base">
              {chiTietPhongVe.thongTinPhim?.tenCumRap}
            </p>
            <p className="text-base">
              {chiTietPhongVe.thongTinPhim?.ngayChieu} -{" "}
              {chiTietPhongVe.thongTinPhim?.gioChieu} -{" "}
              {chiTietPhongVe.thongTinPhim?.tenRap}
            </p>
          </div>

          <hr />

          <div className="flex justify-between text-2xl py-3">
            <div>
              <span className="text-red-600">Ghế: </span>
              <span className="font-bold">
                {_.sortBy(danhSachGheDangDat, ["tenGhe"]).map((ghe) => {
                  return ghe.tenGhe + " ";
                })}
              </span>
            </div>
            <span className="text-green-600">
              {_.reduce(
                danhSachGheDangDat,
                (total, ghe) => {
                  return total + ghe.giaVe;
                },
                0
              ).toLocaleString()}{" "}
              đ
            </span>
          </div>

          <hr />

          <div className="flex flex-col p-2">
            <label className="text-gray-500 text-xs">Email</label>
            <span className="text-sm">{userLogin.email}</span>
          </div>

          <hr />

          <div className="flex flex-col p-2">
            <label className="text-gray-500 text-2xl">Phone</label>
            <span className="text-sm">{userLogin.soDT}</span>
          </div>

          <hr />

          <button
            onClick={() => {
              const danhSachGhe = {
                maLichChieu: props.match.params.id,
                danhSachVe: danhSachGheDangDat,
              };

              dispatch(datVeAction(danhSachGhe));
            }}
            className="absolute right-0 bottom-0 w-full bg-red-600 py-4 text-2xl font-bold text-white hover:bg-red-700"
          >
            Đặt vé
          </button>
        </div>
      </div>
    </div>
  );
}

// Component 2 in file: KetQuaDatVe

function KetQuaDatVe(props) {
  const dispatch = useDispatch();
  const { thongTinTaiKhoan } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );

  useEffect(() => {
    dispatch(thongTinTaiKhoanAcion());
  }, []);
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-center font-bold text-indigo-800 mb-20">
            Lịch sử đặt vé
          </h1>
          <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
            {thongTinTaiKhoan.thongTinDatVe?.map((ve, index) => {
              return (
                <div className="p-4 md:w-1/3 flex" key={index}>
                  <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4 flex-shrink-0">
                    <img src={ve.hinhAnh} alt={ve.tenPhim} />
                  </div>
                  <div className="flex-grow pl-6">
                    <h2 className="text-2xl font-bold text-green-600">
                      {ve.tenPhim}
                    </h2>
                    <p className="text-lg text-gray-600">
                      <span className="font-bold text-black">Giờ đặt: </span>{" "}
                      {moment(ve.ngayDat).format("HH:MM A")} -{" "}
                      {moment(ve.ngayDat).format("DD-MM-YYYY")}
                    </p>
                    <p className="text-lg text-gray-600">
                      <span className="font-bold text-black">Giá vé: </span>{" "}
                      {ve.giaVe} -
                      <span className="font-bold text-black">Thời lượng: </span>{" "}
                      {ve.thoiLuongPhim}
                    </p>
                    <p className="text-lg text-gray-600">
                      <span className="font-bold text-black">Ghế: </span>{" "}
                      {_.sortBy(ve.danhSachGhe, ["maGhe"]).map((ghe) => {
                        return (
                          <span className="font-bold text-red-800" key={index}>
                            {ghe.tenGhe + " "}
                          </span>
                        );
                      })}
                    </p>
                    <p className="text-lg text-gray-600">
                      <span className="font-bold text-black">
                        Hệ thống rạp:{" "}
                      </span>{" "}
                      {ve.danhSachGhe[0]?.tenHeThongRap}
                    </p>
                    <p className="text-lg text-gray-600">
                      <span className="font-bold text-black">Cụm rạp: </span>{" "}
                      {ve.danhSachGhe[0]?.tenRap}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

// Component 3 in file: MainCheckout

export default function MainCheckout(props) {
  const dispatch = useDispatch();
  const { activeTabPane } = useSelector((state) => state.QuanLyDatVeReducer);
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);

  useEffect(() => {
    //component unmount
    return () => {
      dispatch(changeTabPaneAction("1"));
    };
  }, []);

  // Menu for dropdown
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <button
          onClick={() => {
            localStorage.removeItem(USER_LOGIN);
            localStorage.removeItem(TOKEN);
            history.push("/home");
            window.location.reload();
          }}
        >
          Đăng xuất{" "}
        </button>
      </Menu.Item>
      <Menu.Item key="1">
        <NavLink to="/profile">Profile</NavLink>
      </Menu.Item>
    </Menu>
  );

  // extra content Tabs.
  const operations = (
    <>
      <div className="flex mr-4 p-3">
        <div className="mr-3 flex flex-col justify-center">
          <p className="m-0">Xin chào!</p>
          <p className="m-0 font-bold">{userLogin.hoTen}</p>
        </div>
        <Avatar size={50} className="bg-yellow-500 font-bold">
          {userLogin.hoTen}
        </Avatar>
        <Dropdown overlay={menu} className="mx-5 flex items-center ">
          <a
            className="ant-dropdown-link text-gray-800 font-bold"
            onClick={(e) => e.preventDefault()}
          >
            <DownOutlined className="text-xl" />
          </a>
        </Dropdown>
      </div>
    </>
  );

  return (
    <div className="p-2">
      <Tabs
        tabBarExtraContent={operations}
        activeKey={activeTabPane}
        onChange={(key) => dispatch(changeTabPaneAction(key))}
      >
        <TabPane tab="01 CHỌN GHẾ &amp; THANH TOÁN" key="1">
          <Checkout {...props} />
        </TabPane>
        <TabPane tab="KẾT QUẢ ĐẶT VÉ" key="2">
          <KetQuaDatVe {...props} />
        </TabPane>
        <TabPane
          tab={
            <HomeOutlined
              className="text-2xl"
              onClick={() => {
                history.push("/home");
              }}
            />
          }
          key="3"
        ></TabPane>
      </Tabs>
    </div>
  );
}
