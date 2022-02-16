import React, { useEffect } from "react";
import { Button, Popconfirm, Table } from "antd";
import { Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  layDanhSachPhimAcion,
  xoaPhimAction,
} from "../../../redux/actions/QuanLyPhimPhimActions";
import {
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { history } from "../../../App";

const { Search } = Input;

export default function Films() {
  const dispatch = useDispatch();
  const { arrFilmBackUp } = useSelector((state) => state.QuanLyPhimReducer);

  // console.log("arrFilmBackUp", arrFilmBackUp);
  useEffect(() => {
    dispatch(layDanhSachPhimAcion());
  }, []);

  //table antd
  const columns = [
    {
      title: "Mã phim",
      dataIndex: "maPhim",
      sorter: {
        compare: (a, b) => a.maPhim - b.maPhim,
      },
      width: "10%",
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      sorter: {
        compare: (a, b) => (a.tenPhim > b.tenPhim ? 1 : -1),
      },
      width: "20%",
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      render: (text, record, index) => {
        return (
          <img
            src={text}
            alt={record.tenPhim}
            className="w-5/12 h-4/6"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://picsum.photos/400/400";
            }}
          />
        );
      },
      width: "20%",
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      render: (text, record, index) => {
        return (
          <span>{text.length > 50 ? text.substr(0, 50) + "..." : text}</span>
        );
      },
      width: "25%",
    },
    {
      title: "Hành động",
      render: (text, record, index) => {
        return (
          <>
            <Button
              onClick={() => {
                history.push(`/admin/films/edit/${record.maPhim}`);
              }}
              className="mr-4 bg-blue-500"
            >
              <EditOutlined className="text-white" />
            </Button>
            <Popconfirm
              placement="topLeft"
              title="Bạn muốn xóa phim này?"
              onConfirm={() => {
                dispatch(xoaPhimAction(record.maPhim));
              }}
              okText="Có"
              cancelText="Không"
            >
              <Button className="mr-4 bg-red-500">
                <DeleteOutlined className="text-white" />
              </Button>
            </Popconfirm>
            <Button
              onClick={() => {
                history.push(`/admin/films/showtime/${record.maPhim}`);

                localStorage.setItem("film", JSON.stringify(record));
              }}
              className="mr-4 bg-green-500"
            >
              <CalendarOutlined className="text-white" />
            </Button>
          </>
        );
      },
      width: "40%",
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  // input Search antd
  const onSearch = (value) => {
    console.log(value);
    dispatch(layDanhSachPhimAcion(value));
  };
  return (
    <div>
      <h2 className="text-2xl font-bold">Quản lí Phim</h2>
      <Button
        onClick={() => {
          history.push("/admin/films/addnew");
        }}
        className="mb-4"
      >
        Thêm phim
      </Button>
      <Search
        className="mb-4"
        placeholder="Tìm kiếm..."
        onSearch={onSearch}
        enterButton
      />
      <Table
        rowKey="maPhim"
        columns={columns}
        dataSource={arrFilmBackUp}
        onChange={onChange}
      />
    </div>
  );
}
