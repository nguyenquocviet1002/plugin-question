import "./App.css";
import { useEffect } from "react";
import { getAnswerById, getQuestion } from "./api/getQuestion";
import { useState } from "react";
import Question from "./components/Question";
import Form from "./components/Form";
import Result from "./components/Result";

function App() {
  const queryParameters = new URLSearchParams(window.location.search);
  const id = queryParameters.get("id");
  const queryURL = window.location.pathname;
  // const cate = queryURL.split("/")[1];
  const cate = "Tình trạng răng";

  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [result, setResult] = useState({});

  useEffect(() => {
    getQuestion()
      .then((response) => {
        const dataAll = response;
        const dataFilter = dataAll.filter((item) => item.toppic === cate);
        setData(dataFilter);
      })
      .catch((error) => console.log(error));
    if (id) {
      getAnswerById(id)
        .then((response) => {
          setResult(response);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  const nextQuestion = () => {
    if (value.length === 0) {
      alert("Vui lòng chọn đáp án");
    } else {
      setIndex(index + 1);
      setAnswer((prev) => [
        ...prev,
        { title: data[0].content[index].question, answer: value },
      ]);
      setValue([]);
    }
  };

  const setValueAnswer = (value) => {
    setValue(value);
  };

  return data.length > 0 ? (
    <div className="question">
      <div className="container">
        <div className="question__box">
          {data.length > 0 && !id ? (
            <>
              {index < data[0].content.length && (
                <>
                  <div className="question__title">
                    Gửi thông tin - Nhận kết quả
                  </div>
                  <div className="question__item">
                    <Question
                      key={index}
                      number={index}
                      data={data[0].content[index]}
                      event={setValueAnswer}
                      value={value}
                    />
                    <div onClick={nextQuestion} className="question__btn">
                      {index + 1 === data[0].content.length
                        ? "Gửi hoàn thiện"
                        : "Tiếp theo"}
                    </div>
                  </div>
                </>
              )}
              {index + 1 > data[0].content.length && (
                <Form topic={cate} answer={answer} />
              )}
            </>
          ) : (
            Object.keys(result).length > 0 && <Result data={result} />
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className="question">
      <div className="container" style={{ textAlign: "center" }}>
        <p>Không có dữ liệu</p>
      </div>
    </div>
  );
}

export default App;
