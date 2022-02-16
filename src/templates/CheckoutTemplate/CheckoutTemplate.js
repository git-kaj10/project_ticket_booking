import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { USER_LOGIN } from "../../util/settings";

export default function CheckoutTemplate(props) {
  const { Component, ...restParams } = props;

  // scroll lên đầu trang.
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  //   chưa đăng nhập thì quay trở lại trang login
  if (!localStorage.getItem(USER_LOGIN)) {
    return <Redirect to="/login" />;
  }

  return (
    <Route
      {...restParams}
      render={(propsRoute) => {
        return (
          <>
            <Component {...propsRoute} />
          </>
        );
      }}
    />
  );
}
