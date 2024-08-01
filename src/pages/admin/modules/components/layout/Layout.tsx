// React
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// React-Icons
import { BsHouse } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";

// Images
import signOut from "assets/icons/sign_out.svg";
import avatar from "assets/images/avatar.png";

// Styles
import * as S from "./Layout.styles";

// Models
import { LayoutProps } from "./models";

// Context
import Cookie from "universal-cookie";

// Antd
import { Layout as LayoutContainer, Menu } from "antd";

const { Content, Sider } = LayoutContainer;

const Layout = ({ selectedKey, children }: LayoutProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const navigate = useNavigate();

  const onCollapse = (collapse: boolean) => {
    setCollapsed(collapse);
  };

  const onOpenChange = (keys: React.Key[]) => {
    const subMenuKeys = keys.filter((key) => key.toString().startsWith("sub1"));
    if (subMenuKeys.length > 0) {
      setOpenKeys(subMenuKeys.map((key) => key.toString()));
    } else {
      setOpenKeys([]);
    }
  };

  const logout = () => {
    const cookie = new Cookie();
    cookie.remove("token_api_admin");
    navigate("/admin/login");
  };

  return (
    <S.Component>
      <LayoutContainer style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
          breakpoint="lg"
          collapsedWidth={isMobile ? 100 : 100}
          onBreakpoint={(mobile) => setIsMobile(mobile)}
          style={{ background: "#F1F1F1" }}
        >
          <Menu
            style={{ background: "#F1F1F1" }}
            defaultSelectedKeys={[selectedKey]}
            mode="inline"
            openKeys={openKeys}
            onOpenChange={onOpenChange}
          >
            <S.Avatar className={collapsed ? `${"active"}` : ""}>
              <img src={avatar} width="39" height="39" alt="photo" />
              {!collapsed ? <p>Obstcare</p> : null}
            </S.Avatar>
            <Menu.Item
              key="1"
              icon={<BsHouse />}
              onClick={() => navigate("/admin/home")}
            >
              Home
            </Menu.Item>
            <Menu.SubMenu key="sub1" title="Users" icon={<FiUsers />} >
              <Menu.Item key="2" onClick={() => navigate("/admin/obstetras")}>
                Obstetras
              </Menu.Item>
              <Menu.Item key="3" onClick={() => navigate("/admin/gestantes")}>
                Gestantes
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
          <a href={"/admin/login"} className="signOut" onClick={logout}>
            <img src={signOut} alt="icon" />
            {!collapsed && <p>Sign out</p>}
          </a>
        </Sider>
        <LayoutContainer>
          <Content>{children}</Content>
        </LayoutContainer>
      </LayoutContainer>
    </S.Component>
  );
};

export default Layout;
