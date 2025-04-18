import Answer from "../Answer";
import questionStyled from "./Question.module.scss";

const Question = ({ data, number, event, value }) => {
  const { question, answer, achoice } = data;
  const keys = Object.keys(answer);

  const handleChangeInput = (e) => {
    if (achoice === "FALSE") {
      if (value.includes(e.target.value)) {
        const filteredItems = value.filter((item) => item !== e.target.value);
        event(filteredItems);
      } else {
        event((prev) => [...prev, e.target.value]);
      }
    } else {
      event([e.target.value]);
    }
  };

  return (
    <>
      <div className={questionStyled["title"]}>
        <span className={questionStyled["number"]}>{number + 1}</span>
        <span>{question}</span>
      </div>
      <div className={questionStyled["list"]} onChange={handleChangeInput}>
        {keys.map((item) => (
          <Answer
            key={item}
            content={answer[item]}
            value={value}
            checkbox={achoice}
          />
        ))}
      </div>
    </>
  );
};

export default Question;
