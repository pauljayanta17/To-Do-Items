import React from "react";

export default function AboutUs() {
  return (
    <div className="container">
      <div className="d-flex flex-column align-items-center justify-content-between">
        <div className="col fs-1 text-light">About Me</div>
        <div
          className="col fs-6 text-light p-2"
          style={{ backgroundColor: "rgb(10,32,42)" }}
        >
          {/* Web developers design and build websites. They are typically
          responsible for the appearance, of the site and technical aspects,
          such as site speed and how much traffic the site can handle. Web
          developers may also create site content that requires technical
          features.They are sometimes known as web designers or full-stack
          developers if they can do both front-end and back-end development. */}
          <p className="fs-5 mx-4 text-info">Hello I'm Jayanta Paul an intermediate web and mobile application developer.<br/> I have experience in Flutter, React Js, C, C++, Firebase also .</p>
        </div>
        <div className="card my-4 text-center" style={{ width: "18rem" }}>
          <img
            src="https://insights.dice.com/wp-content/uploads/2019/07/Software-Developer-Software-Engineer-Dice.png"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <div className="card-text">
              <b>Developed By</b>{" "}
              <div className="text-primary" style={{ fontFamily: "serif" }}>
                <a
                  href="https://github.com/pauljayanta17"
                  target="_blank"
                  rel="noreferrer"
                  className="link-primary fs-5"
                >
                  Cool Coder
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
