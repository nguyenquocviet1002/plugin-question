import resultStyled from "./Result.module.scss";

const Result = ({ data }) => {
  return (
    <>
      <div className={resultStyled["img"]}>
        <img
          src="https://scigroup.com.vn/ky-luat-lao-dong/wp-content/uploads/2025/02/page-result.png"
          alt=""
        />
      </div>
      <div className={resultStyled["title"]}>
        Thông tin khách hàng: <span className="name">{data.name}</span>
      </div>
      <div className={resultStyled["table"]}>
        <div className={`${resultStyled["row"]} ${resultStyled["row--1"]}`}>
          <div className={resultStyled["col"]}>Tình trạng</div>
          <div className={resultStyled["col"]}>Kết quả</div>
        </div>
        <div className="modal__tbody">
          {data.question.length > 0 &&
            data.question.map((item, index) => (
              <div className={`${resultStyled["row"]}`} key={index}>
                <div className={resultStyled["col"]}>{item.title}</div>
                <div className={resultStyled["col"]}>
                  {item.answer.map((col) => (
                    <p key={col}>{col}</p>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Result;
