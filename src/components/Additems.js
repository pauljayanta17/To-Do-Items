import React from "react";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";
function Additems(props) {
  const titleError = useSelector((state) => state.addItemsHandle.titleError);
  const commentError = useSelector(
    (state) => state.addItemsHandle.commentError
  );
  const dateError = useSelector((state) => state.addItemsHandle.dateError);
  const date = useSelector((state) => state.addItemsHandle.date);
  const time = useSelector((state) => state.addItemsHandle.time);

  return (
    <>
      <form>
        <div className="container my-2 d-flex flex-column align-items-start">
          {/* Title Label Here */}
          <label htmlFor="titleid" className="form-label text-light fs-5">
            Title
          </label>
          {/* Input field for title */}
          <div className="col-auto">
            <input
              type="text"
              className="form-control"
              id="titleid"
              style={{ border: `2px solid ${titleError}` }}
              aria-describedby="emailHelp"
              placeholder="Title"
              value={props.title}
              onChange={props.onTitleChange}
              disabled={props.onSave}
              required
            />
          </div>
        </div>
        <div className="container my-2 d-flex flex-column align-items-start">
          {/* Set reminder  */}
          <label htmlFor="titleid" className="form-label text-light fs-5">
            Set Reminder
          </label>
          {/* Pick up date and time field */}
          <div className="col-auto">
            <input
              type="datetime-local"
              id="setreminder"
              style={{ border: `2px solid ${dateError}` }}
              onChange={props.handleDateChanged}
              value={`${date}T${time}`}
            />
          </div>
        </div>
        {/* Define Comment field here */}
        <div className="container">
          <div className="input-group">
            <div className="col-6">
              <textarea
                className="form-control"
                aria-label="With textarea"
                placeholder="Place Your Comment Here"
                style={{ border: `2px solid ${commentError}` }}
                value={props.content}
                onChange={props.onContentChange}
                disabled={props.onSave}
                required
              ></textarea>
            </div>
          </div>
        </div>
        {/* Define Button and click on this button the add the items*/}
        <div className="container my-2 d-flex justify-content-start">
          <button
            type="button"
            className="btn btn-primary bg-gradient"
            style={{ width: "10rem" }}
            onClick={props.handleItemAddToDatabase}
          >
            {props.loading ? <Spinner /> : props.btnTitle}
          </button>
        </div>
      </form>
    </>
  );
}

export default Additems;
