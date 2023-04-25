import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function HomePage() {
  return (
    <div className="wrapper">
      <section className="sliced">
        <div className="top">Welcome to Pizza Planet!</div>
        <div className="bottom" aria-hidden="true">Welcome to Pizza planet!</div>
      </section>
      <div className="background-image">
        <div className="content">
            Come in and see what all the "Buzz" is about.
            <br />
            Kindly use the navigation menu at the top.
        </div>
          <br />
          <Link to="/about-us">
            <button className="btn btn-primary">
              <span className="btn-text">About Us!</span>
            </button>
          </Link>
        </div>
      </div>
  );
}

export default HomePage;
