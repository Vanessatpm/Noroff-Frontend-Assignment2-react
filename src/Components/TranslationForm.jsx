import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addTranslation, updateTranslationAsync } from "./State/userReducer";

function TranslationForm() {
  const [translation, setTranslation] = useState();
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const onSubmit = ({ translation }) => {
    //When the state is updated, call the api and update that.
    dispatch(addTranslation(translation));
    const charArray = translation.split("").map((char, index) => {
      if (char === " ") {
        //Looking for spaces in the translation
        //Next word comes on the next line
        return <br />;
      } else {
        //Picking out the pictures from the img folder in public
        const signChar = char.toLowerCase();
        const imgPath = "/img/" + signChar + ".png";
        return (
          <img src={imgPath} alt={signChar} key={index + "-" + signChar} />
        );
      }
    });
    setTranslation(charArray);
    dispatch(updateTranslationAsync(user));
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="translation"></label>
        <input
          type="text"
          placeholder="Your translation here"
          {...register("translation")}
        />
        <button type="submit">Translate</button>
      </form>

      <h3>Text to Sign Language: </h3>
      {translation && <p>{translation}</p>}
    </>
  );
}

export default TranslationForm;
