import {
  HomeOutlined,
  ProfileOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

Header.propTypes = {};

function Header(props) {
  const { SubMenu } = Menu;

  const [current, setCurrent] = useState("mail");
  const [user, setUser] = useState(false);

  const handleClick = (e) => {
    setCurrent(e.key);
    if (e.key === "LOGOUT") {
      localStorage.removeItem("accessToken");
      //location.reload();
    }
  };
  return (
    <div id="content">
      <div id="header-branch">
        <div
          id="logo"

        >
          <p class ="name">TRUNG TÂM ANH NGỮ ANH HÀO</p>
        </div>
      </div>
      <Menu
        onClick={handleClick}
        selectedKeys={[current]}
        mode="horizontal"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Menu.Item key="HOME" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>

        <Menu.Item key="ABOUTME" icon={<ShopOutlined />}>
          <Link to="/aboutme">Về Chúng tôi</Link>
        </Menu.Item>
        <Menu.Item key="TEACHER" icon={<ShoppingCartOutlined />}>
          <Link to="/giao-vien">Giáo viên</Link>
        </Menu.Item>
        <Menu.Item key="COURS" icon={<ShoppingCartOutlined />}>
          <Link to="/khoa-hoc">Khoá học</Link>
        </Menu.Item>

        {user && (
          <Menu.Item key="Test" icon={<ProfileOutlined />}>
            <Link to="/test">Test online</Link>
          </Menu.Item>
        )}

        {user ? (
          <SubMenu key="ACCOUNT" icon={<UserOutlined />} title={user.name}>
            <Menu.Item key="LOGOUT">Đăng xuất</Menu.Item>
            {user && user.roleType === "ADMIN" && (
              <Menu.Item key="ADMIN" icon={<SolutionOutlined />}>
                <Link to="/admin">Admin</Link>
              </Menu.Item>
            )}
          </SubMenu>
        ) : (
          <SubMenu key="ACCOUNT" icon={<UserOutlined />} title="Account">
            <Menu.Item key="LOGIN">
              <Link to="/account/login">Login</Link>
            </Menu.Item>
            <Menu.Item key="REGISTRY">
              <Link to="/account/registry">Registry</Link>
            </Menu.Item>
          </SubMenu>
        )}
      </Menu>
    </div>
  );
}

export default Header;
