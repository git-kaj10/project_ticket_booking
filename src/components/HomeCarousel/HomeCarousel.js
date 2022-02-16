import React, { useEffect } from "react";
import { Carousel } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getCarouselAction } from "../../redux/actions/CarouselActions";

function onChange(a, b, c) {
  console.log(a, b, c);
}

const contentStyle = {
  height: "600px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
export default function HomeCarousel(props) {
  const dispatch = useDispatch();
  const { arrImg } = useSelector((state) => state.CarouselReducer);

  useEffect(() => {
    dispatch(getCarouselAction());
  }, []);

  const renderImg = () => {
    return arrImg.map((img, index) => {
      return (
        <div key={index}>
          <div
            style={{
              ...contentStyle,
              backgroundImage: `url('${img.hinhAnh}')`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
              backgroundPosition: "center",
            }}
          >
            <img
              className="w-full h-full opacity-0"
              src={img.hinhAnh}
              alt={img.maBanner}
            />
          </div>
        </div>
      );
    });
  };
  return (
    <div>
      <Carousel afterChange={onChange}>{renderImg()}</Carousel>
    </div>
  );
}
