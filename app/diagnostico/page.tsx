import React from "react";
import Prediction from "../(components)/Prediction";
import Nav from "../(components)/Nav";
import Footer from "../(components)/Footer";

type Props = {};

export default function page({}: Props) {
  return (
    <div className="flex flex-col h-screen max-h-screen">
      <Nav />
      <div className="flex flex-col justify-center items-center flex-grow relative">
        <Prediction />
      </div>
      <Footer />
    </div>
  );
}
