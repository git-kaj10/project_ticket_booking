import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
} from "antd";
import { useFormik } from "formik";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  capNhatPhimUploadAction,
  layThongTinPhimAction,
  themPhimUploadHinhAction,
} from "../../../../redux/actions/QuanLyPhimPhimActions";
import { GROUPID } from "../../../../util/settings";

export default function EditFilm(props) {
  const dispatch = useDispatch();

  //
  const { thongTinPhimEdit } = useSelector((state) => state.QuanLyPhimReducer);
  // hinh anh tai len
  const [hinhAnhSrc, setHinhAnhSrc] = useState("");

  //
  // console.log("thongTinPhimEdit", thongTinPhimEdit);

  useEffect(() => {
    const { id } = props.match.params;
    dispatch(layThongTinPhimAction(id));
  }, []);

  // Formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: thongTinPhimEdit.maPhim,
      tenPhim: thongTinPhimEdit.tenPhim,
      trailer: thongTinPhimEdit.trailer,
      moTa: thongTinPhimEdit.moTa,
      ngayKhoiChieu: thongTinPhimEdit.ngayKhoiChieu,
      sapChieu: thongTinPhimEdit.sapChieu,
      dangChieu: thongTinPhimEdit.dangChieu,
      hot: thongTinPhimEdit.hot,
      danhGia: thongTinPhimEdit.danhGia,
      hinhAnh: null,
    },
    onSubmit: (values) => {
      //   alert(JSON.stringify(values, null, 2));
      //   console.log(values);
      const formData = new FormData();

      values.maNhom = GROUPID;
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          if (values[key] !== null) {
            formData.append("File", values.hinhAnh, values.hinhAnh.name);
          }
        }
      }

      dispatch(capNhatPhimUploadAction(formData));
    },
  });

  //
  const handleChangeDatePicker = (value) => {
    // console.log("datepicker value", moment(value).format("DD/MM/YYYY"));
    formik.setFieldValue("ngayKhoiChieu", moment(value));
  };

  const handleSwitchChange = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleInputNumberChange = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // đọc file bằng Reader.
    const reader = new FileReader();
    // đọc file đó thành url dạng chuỗi base64.
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setHinhAnhSrc(e.target.result);
    };

    //
    formik.setFieldValue("hinhAnh", file);
  };

  return (
    <div>
      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        size="large"
      >
        <Form.Item label="Tên phim">
          <Input
            name="tenPhim"
            onChange={formik.handleChange}
            value={formik.values.tenPhim}
          />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input
            name="trailer"
            onChange={formik.handleChange}
            value={formik.values.trailer}
          />
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input
            name="moTa"
            onChange={formik.handleChange}
            value={formik.values.moTa}
          />
        </Form.Item>
        <Form.Item label="Ngày khởi chiếu">
          <DatePicker
            onChange={handleChangeDatePicker}
            format="DD/MM/YYYY"
            defaultValue={moment(formik.values.ngayKhoiChieu)}
            value={moment(formik.values.ngayKhoiChieu)}
          />
        </Form.Item>
        <Form.Item label="Sắp chiếu" valuePropName="checked">
          <Switch
            onChange={handleSwitchChange("sapChieu")}
            checked={formik.values.sapChieu}
          />
        </Form.Item>
        <Form.Item label="Đang chiếu" valuePropName="checked">
          <Switch
            onChange={handleSwitchChange("dangChieu")}
            checked={formik.values.dangChieu}
          />
        </Form.Item>
        <Form.Item label="Hot" valuePropName="checked">
          <Switch
            onChange={handleSwitchChange("hot")}
            checked={formik.values.hot}
          />
        </Form.Item>
        <Form.Item label="Đánh giá">
          <InputNumber
            onChange={handleInputNumberChange("danhGia")}
            min={0}
            max={10}
            value={formik.values.danhGia}
          />
        </Form.Item>
        <Form.Item label="Hình ảnh">
          <input type="file" onChange={handleImageChange} accept="image/*" />
          <img
            className="w-52 h-52 mt-3"
            src={hinhAnhSrc === "" ? thongTinPhimEdit.hinhAnh : hinhAnhSrc}
            alt="hinhAnh"
          />
        </Form.Item>
        <Form.Item label="" wrapperCol={{ offset: 4 }}>
          <Button type="primary" htmlType="submit">
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
