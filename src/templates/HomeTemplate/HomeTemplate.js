import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import Footer from "./Layout/Footer/Footer";
import Header from "./Layout/Header/Header";

export default function HomeTemplate(props) {
  const { Component, ...restParams } = props;
  // scroll lên đầu trang.
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <Route
      {...restParams}
      render={(propsRoute) => {
        return (
          <>
            <Header {...propsRoute} />
            <Component {...propsRoute} />
            <Footer />
          </>
        );
      }}
    />
  );
}
