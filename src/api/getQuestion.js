const urlQuestion =
  "https://benhvienthammykangnam.vn/wp-content/plugins/sheet-api/question.php";
const urlAnswer = "https://scigroup.com.vn/app/api/store/?d=knAnswer";
const urlSend = "https://benhvienthammykangnam.com.vn/css/api/sendform";
const urlLocation = "https://ipinfo.io/json";

export const getQuestion = async () => {
  const response = await fetch(urlQuestion);
  const data = await response.json();
  return data;
};

export const getAnswer = async () => {
  const response = await fetch(urlAnswer);
  const data = await response.json();
  return data;
};

export const getAnswerById = async (id) => {
  const response = await fetch(`${urlAnswer}&id=${id}`);
  const data = await response.json();
  return data;
};

export const createAnswer = async (body) => {
  const response = await fetch(urlAnswer, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
};

export const sendForm = async (info) => {
  const response = await fetch(
    `${urlSend}?contact_name=${info.name}&phone=${info.phone}&email_from=${info.email}&description=${info.itext}&code_campaign=${info.code_campaign}&name_campaign=${info.name_campaign}&first_link=${info.url}&referred=${info.referred}&website=${info.website}&location=${info.location}`
  );
  const data = await response.json();
  return data;
};

export const getLocation = async () => {
  const response = await fetch(urlLocation);
  const data = await response.json();
  return data;
};
