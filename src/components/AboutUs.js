import React from "react";

export default function AboutUs() {
  return (
    <div className="container">
      <div className="d-flex flex-column align-items-center justify-content-between">
        <div className="col fs-1 text-light">About Us</div>
        <div
          className="col fs-6 text-light p-2"
          style={{ backgroundColor: "rgb(10,32,42)" }}
        >
          Web developers design and build websites. They are typically
          responsible for the appearance, of the site and technical aspects,
          such as site speed and how much traffic the site can handle. Web
          developers may also create site content that requires technical
          features.They are sometimes known as web designers or full-stack
          developers if they can do both front-end and back-end development.
        </div>
        <div className="card my-4 text-center" style={{ width: "18rem" }}>
          <img
            src="https://insights.dice.com/wp-content/uploads/2019/07/Software-Developer-Software-Engineer-Dice.png"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <p className="card-text">
              <b>Developed By</b>{" "}
              <h3 className="text-primary" style={{ fontFamily: "serif" }}>
                <a href="https://github.com/pauljayanta17" target="_blank" rel="noreferrer" class="link-primary">
                  Cool Coder
                </a>
              </h3>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
