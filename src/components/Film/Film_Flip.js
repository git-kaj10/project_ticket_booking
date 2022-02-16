import React from "react";
import "./Film_Flip.css";
import { PlayCircleOutlined } from "@ant-design/icons";
import { history } from "../../App";

export default function Film_Flip(props) {
  const { film } = props;
  return (
    <div className="relative">
      <div className="flip-card ">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url(${film.hinhAnh}), url(https://picsum.photos/400/400)`,
                backgroundPosition: "center",
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
              }}
            >
              <img src={film.hinhAnh} alt="Avatar" className="w-full h-full" />
            </div>
          </div>
          <div className="flip-card-back relative">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url(${film.hinhAnh}), url(https://picsum.photos/400/400)`,
                backgroundPosition: "center",
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
              }}
            >
              <img src={film.hinhAnh} alt="Avatar" className="w-full h-full" />
            </div>
            <div className="w-full h-full flex flex-col justify-center items-center absolute left-0 top-0 bg-gray-800 bg-opacity-60">
              <PlayCircleOutlined className="text-5xl cursor-pointer hover:text-gray-400" />
              <span className="text-lg">{film.tenPhim}</span>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          history.push(`./detail/${film.maPhim}`);
        }}
        type="button"
        className="absolute left-1/2 -translate-x-1/2 bottom-0 w-11/12 my-2 text-base font-bold text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        Đặt vé
      </button>
    </div>
  );
}
