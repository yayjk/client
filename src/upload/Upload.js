import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "../constants/Constants";

export default function Upload() {
  const [file, setFile] = useState("");
  const saveFile = (e) => {
    document.getElementById("label").innerHTML = e.target.files[0].name;
    if (!e.target.files[0]) {
      document.getElementById("message").innerHTML =
        "<small>File not saved</small>";
    }
    setFile(e.target.files[0]);
    document.getElementById("message").style.display = "block";
  };

  const uploadFile = (e) => {
    e.preventDefault();
    document.getElementById("message").innerHTML =
      '<div class="d-flex justify-content-center"><div class="spinner-border" role="status"> <span class="sr-only">Loading...</span>  </div> </div>';
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post(baseUrl + "file/upload", formData)
      .then((res) => {
        if (res.status === 200 && res.data.message === "successful") {
          document.getElementById("message").innerHTML =
            "<small>File uploaded successfully</small>";
        } else {
          document.getElementById("message").innerHTML =
            "<small>File not uploaded</small>";
        }
      })
      .catch((error) => console.log(error));
  };

  // return (
  //   <div className="container" style={{ top: "12vh" }}>
  //     <form onSubmit={uploadFile}>
  //       <div className="input-group">
  //         <div className="custom-file">
  //           <input
  //             type="file"
  //             className="custom-file-input"
  //             id="file_upload"
  //             onChange={saveFile}
  //           />
  //           <label
  //             className="custom-file-label add-style"
  //             htmlFor="file_upload"
  //             id="label"
  //           >
  //             Choose file
  //           </label>
  //         </div>
  //       </div>
  //       <input
  //         className="btn btn-info w-100 my-3"
  //         type="submit"
  //         value="Upload file"
  //       />
  //       <div
  //         style={{ display: "none" }}
  //         className="text-center text-success w-100"
  //         id="message"
  //       >
  //         <small>File saved successfully. Now upload it.</small>
  //       </div>
  //     </form>
  //   </div>
  // );
  return <p>Site access has been disabled</p>;
}
