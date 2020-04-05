import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "../constants/Constants";

export default function Upload() {
  const [file, setFile] = useState("");
  const saveFile = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post(baseUrl + "file/upload", formData)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <form onSubmit={uploadFile}>
        <input type="file" name="file" onChange={saveFile}></input>
        <input type="submit" />
      </form>
    </div>
  );
}
