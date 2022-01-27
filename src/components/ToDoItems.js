import React, { Component } from 'react';
import { Link } from "react-router-dom";
export default class ToDoItems extends Component {
  render() {
    return <div className="container list-group">
    <Link to="/userpage" className="list-group-item list-group-item-action my-2" aria-current="true" style={{backgroundColor:"blueviolet",color:"white"}}>
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">List group item heading</h5>
        <small>3 days ago</small>
      </div>
      <p className="mb-1">Some placeholder content in a paragraph.</p>
      <small>And some small print.</small>
    </Link>
  </div>;
  }
}

// import React, { Component } from 'react';

// export default class DocumentItems extends Component {
//   render() {
//     return <div className='d-flex justify-content-center'>
//         <div id="list-example" class="list-group">
//   <a class="list-group-item list-group-item-action" href="#list-item-1">Item 1</a>
//   <a class="list-group-item list-group-item-action" href="#list-item-2">Item 2</a>
//   <a class="list-group-item list-group-item-action" href="#list-item-3">Item 3</a>
//   <a class="list-group-item list-group-item-action" href="#list-item-4">Item 4</a>
// </div>
// <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-offset="0" class="scrollspy-example" tabindex="0">
//   <h4 id="list-item-1">Item 1</h4>
//   <p>...</p>
//   <h4 id="list-item-2">Item 2</h4>
//   <p>...</p>
//   <h4 id="list-item-3">Item 3</h4>
//   <p>...</p>
//   <h4 id="list-item-4">Item 4</h4>
//   <p>...</p>
// </div>

//     </div>;
//   }
// }

