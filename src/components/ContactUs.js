import React from "react";

function ContactUs() {
  return (
    <div className="container">
      <form>
        <div>
          <h4 className="text-light text-center my-2">Send Your Feedback</h4>
        </div>
        <div className="row g-2 justify-content-center">
          <div className="col-12">
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
              />
              <label htmlFor="floatingInput">Your Email Address</label>
            </div>
          </div>
        </div>

        <div className="row g-2 justify-content-center">
          <div className="col-12">
            <div className="form-floating">
              <textarea
                className="form-control"
                placeholder="Leave a comment here"
                id="floatingTextarea2"
                style={{ height: "100px" }}
              ></textarea>
              <label htmlFor="floatingTextarea2">Comments</label>
            </div>
          </div>
        </div>

        <div className="row g-2 justify-content-center my-1">
          <div className="col">
            <button type="button" className="btn btn-primary col-12 my-1 my-2">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ContactUs;
