import React, { useState } from "react";
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
import { useDispatch } from "react-redux";
import { themPhimUploadHinhAction } from "../../../../redux/actions/QuanLyPhimPhimActions";
import { GROUPID } from "../../../../util/settings";

export default function AddNew() {
  const dispatch = useDispatch();
  // hinh anh tai len
  const [hinhAnhSrc, setHinhAnhSrc] = useState("");

  // Formik
  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      sapChieu: false,
      dangChieu: false,
      hot: false,
      danhGia: 0,
      hinhAnh: {},
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
          formData.append("File", values.hinhAnh, values.hinhAnh.name);
        }
      }

      dispatch(themPhimUploadHinhAction(formData));
    },
  });

  //
  const handleChangeDatePicker = (value) => {
    // console.log("datepicker value", moment(value).format("DD/MM/YYYY"));
    formik.setFieldValue("ngayKhoiChieu", moment(value).format("DD/MM/YYYY"));
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
          <Input name="tenPhim" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input name="trailer" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input name="moTa" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Ngày khởi chiếu">
          <DatePicker onChange={handleChangeDatePicker} format="DD/MM/YYYY" />
        </Form.Item>
        <Form.Item label="Sắp chiếu" valuePropName="checked">
          <Switch onChange={handleSwitchChange("sapChieu")} />
        </Form.Item>
        <Form.Item label="Đang chiếu" valuePropName="checked">
          <Switch onChange={handleSwitchChange("dangChieu")} />
        </Form.Item>
        <Form.Item label="Hot" valuePropName="checked">
          <Switch onChange={handleSwitchChange("hot")} />
        </Form.Item>
        <Form.Item label="Đánh giá">
          <InputNumber
            onChange={handleInputNumberChange("danhGia")}
            min={0}
            max={10}
          />
        </Form.Item>
        <Form.Item label="Hình ảnh">
          <input type="file" onChange={handleImageChange} accept="image/*" />
          <img className="w-52 h-52 mt-3" src={hinhAnhSrc} alt="hinhAnh" />
        </Form.Item>
        <Form.Item label="" wrapperCol={{ offset: 4 }}>
          <Button type="primary" htmlType="submit">
            Thêm phim
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
