import React from "react";

export default function Widthtracker() {
  let [windowwidth, setWindowwidth] = React.useState(window.innerWidth);
  React.useEffect(
    function () {
      function showwidth() {
        setWindowwidth(window.innerWidth);
      }
      window.addEventListener("resize", showwidth);

      return function () {
        window.removeEventListener("resize", showwidth);
      };
    },
    //  return function(){
    //     window.removeEventListener("resize",showwidth)}

    []
  );

  return (
    <>
      <h1> window width : {windowwidth} </h1>
    </>
  );
}
