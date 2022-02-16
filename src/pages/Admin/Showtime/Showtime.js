import React, { useEffect, useState } from "react";
import { Button, Form, InputNumber, Select } from "antd";
import { DatePicker } from "antd";
import moment from "moment";
import { quanLyRapService } from "../../../services/QuanLyRapService";
import { quanLyDatVeService } from "../../../services/QuanLyDatVeService";
import _ from "lodash";
import { useFormik } from "formik";
import { openNotify } from "../../../util/notification";

export default function Showtime(props) {
  //
  const [state, setState] = useState({ heThongRap: [], cumRap: [] });

  let film = {};
  if (localStorage.getItem("film")) {
    film = JSON.parse(localStorage.getItem("film"));
  }

  //

  const getHeThongRapApi = async () => {
    try {
      const { data, status } = await quanLyRapService.LayThongTinHeThongRap();
      setState({
        ...state,
        heThongRap: data.content,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const layThongTinCumRapTheoHeThongApi = async (maHeThongRap) => {
    try {
      const { data, status } =
        await quanLyRapService.LayThongTinCumRapTheoHeThong(maHeThongRap);
      setState({
        ...state,
        cumRap: data.content,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const taoLichChieuApi = async (lich) => {
    try {
      const { data, status } = await quanLyDatVeService.TaoLichChieu(lich);
      openNotify("success", "Tạo lịch chiếu thành công!", "");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHeThongRapApi();
  }, []);

  //
  const formik = useFormik({
    initialValues: {
      maPhim: props.match.params.id,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: 75000,
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      taoLichChieuApi(values);
    },
  });

  //Cascader
  const onChangeHeThongRap = (value) => {
    // console.log(value);
    layThongTinCumRapTheoHeThongApi(value);
  };
  const onChangeCumRap = (value) => {
    // console.log(value);
    formik.setFieldValue("maRap", value);
  };

  // DatePicker
  const onChangeNgayGioChieu = (value, dateString) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  };

  const onOk = (value) => {
    // console.log("onOk: ", value);
    const ngayChieuGioChieu = moment(value).format("DD/MM/YYYY hh:mm:ss");
    formik.setFieldValue("ngayChieuGioChieu", ngayChieuGioChieu);
  };

  // InputNumber
  const onChangeGiaVe = (value) => {
    // console.log("changed", value);
    formik.setFieldValue("giaVe", value);
  };

  return (
    <div>
      {" "}
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 8 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        onSubmitCapture={formik.handleSubmit}
      >
        <Form.Item wrapperCol={{ offset: 4 }}>
          <img className="w-60 h-80" src={film.hinhAnh} alt={film.tenPhim} />
        </Form.Item>
        <h2 className="text-3xl font-bold">
          Đặt lịch chiếu cho phim: {film.tenPhim}
        </h2>
        <Form.Item label="Hệ thống rạp">
          <Select
            options={_.map(state.heThongRap, (heThong) => {
              return {
                label: heThong.tenHeThongRap,
                value: heThong.maHeThongRap,
              };
            })}
            onChange={onChangeHeThongRap}
            placeholder="Chọn hệ thống rạp"
          />
        </Form.Item>

        <Form.Item label="Cụm rạp">
          <Select
            options={_.map(state.cumRap, (item) => {
              return {
                label: item.tenCumRap,
                value: item.maCumRap,
              };
            })}
            onChange={onChangeCumRap}
            placeholder="Chọn cụm rạp"
          />
        </Form.Item>

        <Form.Item label="Ngày giờ chiếu">
          <DatePicker
            format="DD/MM/YYYY hh:mm:ss"
            showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
            onChange={onChangeNgayGioChieu}
            onOk={onOk}
          />
        </Form.Item>

        <Form.Item label="Ngày giờ chiếu">
          <InputNumber
            min={75000}
            max={150000}
            defaultValue={75000}
            onChange={onChangeGiaVe}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4 }}>
          <Button type="primary" htmlType="submit">
            Tạo lịch chiếu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
