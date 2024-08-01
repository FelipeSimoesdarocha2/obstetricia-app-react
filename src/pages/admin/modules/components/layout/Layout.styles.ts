import styled from "styled-components";

export const Component = styled.div`
  height: 100%;
  overflow-y: scroll !important;

  .ant-layout {
    background: var(--fff);
    height: 100vh;
    overflow: auto;

    ::-webkit-scrollbar {
      appearance: none;
    }
  }

  .ant-layout-content {
    margin: 3rem 1rem;
  }

  .ant-layout-sider-children {
    margin: 1rem;
    display: flex;
    flex-direction: column;
    max-height: 90vh;
    overflow: hidden;
  }

  .ant-menu {
    background: none !important;
    border-inline-end: none !important;
    flex: 1;
    min-height: 85vh;
  }

  .ant-menu-item svg,
  .ant-menu-submenu svg {
    font-size: 22px !important;
  }

  .ant-menu-submenu .ant-menu-submenu-title span {
    line-height: normal;
  }

  .ant-menu-item span {
    line-height: normal;
  }

  .ant-menu-light.ant-menu-root.ant-menu-inline {
    border-inline-end: none;
  }

  .ant-menu-item-selected {
    background: var(--active);
  }

  .ant-layout-sider-trigger {
    background: #f2f2f2;

    svg {
      fill: #000;
    }
  }

  .signOut {
    height: 40px;
    margin-inline: 4px;
    padding-left: 24px;
    display: flex;
    align-items: center;

    p {
      margin-inline-start: 8px;
      width: 100px;
      height: 18px;
      color: #343434;
      white-space: nowrap;
      word-wrap: break-word;
    }
  }

  .signOut:hover {
    background: #e6e6e6;
    transition: border-color 0.3s, background 0.3s,
      padding 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
    border-radius: 8px;
  }
`;

export const Avatar = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 10px;
  padding-left: 2px;
  margin-bottom: 2rem;

  p {
    font-size: 18px;
    line-height: 24px;
    margin: 0;
  }

  &.active {
    justify-content: center;
  }
`;
