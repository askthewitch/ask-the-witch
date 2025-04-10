import React from "react";
import "../style.css";

function Layout({ children }) {
  return (
    <div className="layout-bg">
      <div className="layout-overlay" />
      <div className="layout-content">{children}</div>
    </div>
  );
}

export default Layout;