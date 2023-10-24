import { useRef } from "react";
import Card from "../ui/Card";
import classes from "./NewMeetupForm.module.css";
import useInput from "../hooks/useInput";
import { inputValue } from "../../utils/helper";
import Input from "../ui/Input";

function NewMeetupForm(props) {
  const {
    value: enteredName,
    isValid: nameInputIsValid,
    hasError: titleInputHasError,
    reset: resetNameInput,
    onChangeHandler: nameChangeHandler,
    onBlurHandler: nameBlurHandler,
  } = useInput("", inputValue);

  const {
    value: inputImage,
    isValid: imageIsValid,
    hasError: imageHasError,
    reset: resetImageInput,
    onChangeHandler: imageChangeHandler,
    onBlurHandler: imageBlurHandler,
  } = useInput("", inputValue);

  const {
    value: inputAddress,
    isValid: addressIsValid,
    hasError: inpAddHasError,
    reset: resetAddInput,
    onChangeHandler: addressChangeHandler,
    onBlurHandler: addressBlurHandler,
  } = useInput("", inputValue);

  const formIsValid = nameInputIsValid && imageIsValid && addressIsValid;

  const descriptionInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }
    const enteredTitle = enteredName;
    const enteredImage = inputImage;
    const enteredAddress = inputAddress;
    const enteredDescription = descriptionInputRef.current.value;

    const meetupData = {
      title: enteredTitle,
      image: enteredImage,
      address: enteredAddress,
      description: enteredDescription,
    };

    props.onAddMeetup(meetupData);
    resetNameInput();
    resetImageInput();
    resetAddInput();
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <Input
          label="Meetup Title"
          required
          fullWidth
          id="title"
          name="title"
          value={enteredName}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          error={titleInputHasError}
          helperText={titleInputHasError && "Name should not be empty"}
        />
        <Input
          label="Meetup Image"
          required
          fullWidth
          id="image"
          name="image"
          value={inputImage}
          onChange={imageChangeHandler}
          onBlur={imageBlurHandler}
          error={imageHasError}
          helperText={imageHasError && "Please add an image"}
        />
        {/* to be uncommented when endpoint is ready 
          <ImageUpload id="image" /> */}
        <Input
          label="Address"
          required
          id="address"
          name="address"
          fullWidth
          value={inputAddress}
          onChange={addressChangeHandler}
          onBlur={addressBlurHandler}
          error={inpAddHasError}
          helperText={inpAddHasError && "Please enter a valid address"}
        />
        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            required
            rows="5"
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button disabled={!formIsValid}>Add Meetup</button>
        </div>
      </form>
    </Card>
  );
}

export default NewMeetupForm;
