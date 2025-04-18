import { useEffect, useState } from "react";
import formStyled from "./Form.module.scss";
import { createAnswer, getLocation, sendForm } from "../../api/getQuestion";
import { addGclid } from "../../utils/setup";

const Form = ({ topic, answer }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "no@email.benhvienthammykangnam.vn",
    itext: "",
    code_campaign: "583971142",
    name_campaign: "[Kangnam] Sale Kangnam",
    url: "",
    referred: "",
    website: "",
    location: "",
  });
  const [errors, setErrors] = useState({});
  const [isSeen, setIsSeen] = useState(false);

  useEffect(() => {
    const first_link = window.location.href;
    const url = first_link.replaceAll("&", "___");
    const ref = document.referrer;

    getLocation().then((data) => {
      setFormData((prev) => ({
        ...prev,
        location: data.city,
      }));
    });

    setFormData((prev) => ({
      ...prev,
      url: url,
      referred: addGclid(),
      website: ref,
    }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Vui lòng nhập tên";
      isValid = false;
    }

    if (!formData.phone) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
      isValid = false;
    }

    if (
      formData.phone &&
      !/(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(formData.phone)
    ) {
      newErrors.phone = "Số điện thoại không chính xác";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSeen(true);
      const body = {
        name: formData.name,
        phone: formData.phone,
        toppic: topic,
        question: answer,
      };
      createAnswer(body).then((response) => {
        sendForm({
          ...formData,
          itext: `Tình trạng của khách hàng: https://benhvienthammykangnam.vn/wp-content/plugins/sheet-api/dist/?id=${response.data.id}`,
        });
      });
      setTimeout(() => {
        setIsSeen(false);
        window.top.location.href = "/dang-ky-thanh-cong";
      }, 3000);
    } else {
      // Form is not valid, display error messages
    }
  };

  return (
    <>
      <div className={formStyled["title"]}>Hoàn thiện thông tin</div>
      <div className={formStyled["box"]}>
        <div className={formStyled["top"]}>
          Chúng tôi sẽ gửi thông tin cho bác sĩ và trả kết quả trong vòng 48h
        </div>
        <div className={formStyled["form"]}>
          <form onSubmit={handleSubmit}>
            <div
              className={`${formStyled["group"]} ${
                errors.name ? formStyled["invalid"] : ""
              }`}
            >
              <input
                type="text"
                placeholder="Họ và tên"
                name="name"
                onChange={handleInputChange}
                value={formData.name}
              />
              {errors.name && (
                <div className={formStyled["error"]}>{errors.name}</div>
              )}
            </div>
            <div
              className={`${formStyled["group"]} ${
                errors.phone ? formStyled["invalid"] : ""
              }`}
            >
              <input
                type="text"
                placeholder="Số điện thoại"
                name="phone"
                onChange={handleInputChange}
                value={formData.phone}
              />
              {errors.phone && (
                <div className={formStyled["error"]}>{errors.phone}</div>
              )}
            </div>
            <div className={formStyled["btn"]}>
              <button
                type="submit"
                disabled={isSeen}
                className={isSeen ? formStyled["disabled"] : ""}
              >
                {isSeen ? "Đang gửi..." : "NHẬN TƯ VẤN"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
