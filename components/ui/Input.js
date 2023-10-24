import TextField from "@mui/material/TextField";
import classes from "./Input.module.css";

const Input = ({ id, label, ...props }) => {
  return (
    <div className={classes.control}>
      <label htmlFor={id}>{label}</label>
      <TextField id={id} {...props} />
    </div>
  );
};

export default Input;
