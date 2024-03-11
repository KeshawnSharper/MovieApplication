import React from "react";
import "./Loader.scss";
export default function Loader() {
  return (
    <div className="camera__wrap">
      <div className="camera__body">
        <div className="camera__body-k7">
          <div className="tape">
            <div className="roll" />
            <div className="roll" />
            <div className="roll" />
            <div className="roll" />
            <div className="center" />
          </div>
          <div className="tape">
            <div className="roll" />
            <div className="roll" />
            <div className="roll" />
            <div className="roll" />
            <div className="center" />
          </div>
        </div>
        <div className="camera__body__stuff">
          <div className="camera__body__stuff-bat" />
          <div className="camera__body__stuff-pointer first" />
          <div className="camera__body__stuff-pointer" />
        </div>
      </div>
      <div className="camera__body-optic" />
      <div className="camera__body-light" />
    </div>
  );
}
