import React from "react";
import { Form, Input, Button } from "antd";
import { useFormik } from "formik";
import { GROUPID } from "../../util/settings";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { dangKiAction } from "../../redux/actions/QuanLyNguoiDungActions";

export default function Register() {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      nhapLaiMatKhau: "",
      email: "",
      soDt: "",
      maNhom: GROUPID,
      hoTen: "",
    },
    validationSchema: Yup.object().shape({
      nhapLaiMatKhau: Yup.string().oneOf(
        [Yup.ref("matKhau"), null],
        "Passwords must match"
      ),
    }),
    onSubmit: (values) => {
      //console.log(values)
      dispatch(dangKiAction(values));
    },
  });

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 10 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  return (
    <div className="flex justify-center items-center p-10">
      <Form
        onSubmitCapture={formik.handleSubmit}
        {...formItemLayout}
        name="register"
      >
        <Form.Item
          name="taiKhoan"
          label="Tài khoản"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên tài khoản!",
            },
          ]}
          hasFeedback
        >
          <Input name="taiKhoan" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item
          name="matKhau"
          label="Mật khẩu"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu!",
            },
          ]}
          hasFeedback
        >
          <Input.Password name="matKhau" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item
          name="nhapLaiMatKhau"
          label="Nhập lại mật khẩu"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu!",
            },
          ]}
          hasFeedback
        >
          <Input.Password
            name="nhapLaiMatKhau"
            onChange={formik.handleChange}
          />
        </Form.Item>
        {formik.errors.nhapLaiMatKhau && formik.touched.nhapLaiMatKhau ? (
          <Form.Item wrapperCol={{ offset: 10 }}>
            <div className="text-red-700">{formik.errors.nhapLaiMatKhau}</div>
          </Form.Item>
        ) : null}
        <Form.Item
          name="hoTen"
          label="Họ tên"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập họ tên!",
            },
          ]}
          hasFeedback
        >
          <Input name="hoTen" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input name="email" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item
          name="soDt"
          label="Số điện thoại"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số điện thoại!",
            },
          ]}
          hasFeedback
        >
          <Input name="soDt" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 10 }}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
