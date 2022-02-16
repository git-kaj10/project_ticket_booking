import React, { useState } from "react";
import OwlCarousel from "react-owl-carousel2";
import { useDispatch } from "react-redux";
import "../../../node_modules/react-owl-carousel2/lib/styles.css"; //Allows for server-side rendering.
import "../../../node_modules/react-owl-carousel2/src/owl.theme.default.css";
import {
  SET_FILM_DANG_CHIEU,
  SET_FILM_SAP_CHIEU,
} from "../../redux/types/QuanLyPhimTypes";
import Film_Flip from "../Film/Film_Flip";
import "./FilmOwlCarousel.css";

export default function FilmOwlCarousel(props) {
  // state button Phim Dang Chieu, Phim Sap Chieu
  const [state_DC_SC, setState_DC_SC] = useState(null);

  const dispatch = useDispatch();
  const { arrFilm } = props;
  const options = {
    items: 4,
    nav: true,
    rewind: true,
    // autoplay: true,
  };

  const events = {
    onDragged: function (event) {},
    onChanged: function (event) {},
  };

  const renderFilms = () => {
    return arrFilm.map((film, index) => {
      return <Film_Flip key={index} film={film} />;
    });
  };
  return (
    <div className="filmCarousel">
      <div>
        <button
          onClick={() => {
            dispatch({
              type: SET_FILM_DANG_CHIEU,
            });

            setState_DC_SC(true);
          }}
          className={
            (state_DC_SC === true ? "activeButtonDC_SC" : "") +
            " m-2 px-8 py-3 font-semibold rounded bg-gray-100 border-2 border-gray-800 transition-all"
          }
        >
          PHIM ĐANG CHIẾU
        </button>
        <button
          onClick={() => {
            dispatch({
              type: SET_FILM_SAP_CHIEU,
            });

            setState_DC_SC(false);
          }}
          className={
            (state_DC_SC !== false ? "" : "activeButtonDC_SC") +
            " m-2 px-8 py-3 font-semibold rounded bg-gray-100 border-2 border-gray-800 transition-all"
          }
        >
          PHIM SẮP CHIẾU
        </button>
      </div>
      <OwlCarousel options={options} events={events}>
        {renderFilms()}
      </OwlCarousel>
    </div>
  );
}
