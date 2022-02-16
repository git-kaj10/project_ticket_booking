import { Spin } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import "./Loading.css";

export default function Loading() {
  const { isLoadingVisible } = useSelector((state) => state.LoadingReducer);
  return (
    <>
      {isLoadingVisible ? (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-70 flex justify-center items-center z-10">
          <Spin size="large" className="spin-loading" />
        </div>
      ) : (
        ""
      )}
    </>
  );
}
