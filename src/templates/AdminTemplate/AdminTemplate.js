import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { NavLink, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { TOKEN, USER_LOGIN } from "../../util/settings";
import { Layout, Menu, Breadcrumb, Dropdown } from "antd";
import {
  DesktopOutlined,
  TeamOutlined,
  UserOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import _ from "lodash";
import { history } from "../../App";
import Avatar from "antd/lib/avatar/avatar";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default function AdminTemplate(props) {
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);

  // Setup Layout antd
  const [state, setState] = useState({
    collapsed: false,
  });
  const { collapsed } = state;
  const onCollapse = (collapsed) => {
    // console.log(collapsed);
    setState({ collapsed });
  };

  //
  const { Component, ...restParams } = props;

  // scroll lên đầu trang.
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  //   chưa đăng nhập thì quay trở lại trang login
  if (!localStorage.getItem(USER_LOGIN)) {
    return <Redirect to="/login" />;
  }

  // bạn phải là QTV
  if (userLogin.maLoaiNguoiDung !== "QuanTri") {
    alert("Bạn phải là quản trị viên!");
    return <Redirect to="/" />;
  }

  // Setup Dropdown
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

  return (
    <Route
      {...restParams}
      render={(propsRoute) => {
        return (
          <>
            <Layout style={{ minHeight: "100vh" }}>
              <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                  <Menu.Item key="1" icon={<UserOutlined />}>
                    <NavLink to="/admin/users">Users</NavLink>
                  </Menu.Item>
                  <SubMenu key="sub1" icon={<DesktopOutlined />} title="Films">
                    <Menu.Item key="sub1.1">
                      <NavLink to="/admin/films">Films</NavLink>
                    </Menu.Item>
                    <Menu.Item key="sub1.2">
                      <NavLink to="/admin/films/addnew">Add New</NavLink>
                    </Menu.Item>
                  </SubMenu>
                </Menu>
              </Sider>
              <Layout className="site-layout">
                <div className="flex justify-end mr-4 p-3">
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
                <Content style={{ margin: "0 16px" }}>
                  {/* <Breadcrumb style={{ margin: "16px 0" }}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                  </Breadcrumb> */}
                  <div
                    className="site-layout-background"
                    style={{ padding: 24, minHeight: 360 }}
                  >
                    <Component {...propsRoute} />
                  </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                  Ticket booking ©2022 Created by Duy Thang
                </Footer>
              </Layout>
            </Layout>
          </>
        );
      }}
    />
  );
}
