import React from "react";

import Header from "../header/Header/Header";
import Router from "../../router/Router";
import Footer from "../Footer/Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <Router />
      <Footer />
    </>
  );
};

export default Layout;
