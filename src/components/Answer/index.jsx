import answerStyled from "./Answer.module.scss";

const Answer = ({ content, value, checkbox }) => {
  return (
    <div className={answerStyled["item"]}>
      {checkbox === "FALSE" ? (
        <input
          className={answerStyled["input"]}
          type="checkbox"
          id={content}
          value={content}
        />
      ) : (
        <input
          className={answerStyled["input"]}
          type="checkbox"
          id={content}
          value={content}
          checked={value[0] === content}
          readOnly
        />
      )}
      <label className={answerStyled["label"]} htmlFor={content}>
        {content}
      </label>
    </div>
  );
};

export default Answer;
