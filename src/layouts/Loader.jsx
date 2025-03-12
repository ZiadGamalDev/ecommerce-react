import React from "react";
import { BeatLoader } from "react-spinners";

export default function Loader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <BeatLoader color="#f04706" cssOverride={{}} size={10} />
    </div>
  );
}
