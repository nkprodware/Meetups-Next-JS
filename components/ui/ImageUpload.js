import { useState } from "react";
import classes from "./ImageUpload.module.css";

const ImageUpload = (props) => {
  const [preview, setPreview] = useState(null);

  const onChangeImageHandler = (event) => {
    const [file] = event.target.files;

    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
    if (props.onChangeImageHandler) {
      props.onChangeImageHandler(file);
    }
  };

  return (
    <>
      <input
        type="file"
        id={props.id}
        accept="image/*"
        onChange={onChangeImageHandler}
      />
      {preview && (
        <div className={classes.image}>
          <img src={preview} alt="" role="presentation" />
        </div>
      )}
    </>
  );
};

export default ImageUpload;
