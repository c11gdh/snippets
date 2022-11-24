// 傳統 Form Submit
const useFormSubmit = (actionUrl = "", data = {}) => {
  const formElement = document.createElement("form");
  formElement.action = actionUrl;
  formElement.method = "post";
  Object.entries(data).forEach((i) => {
    const inputName = i[0];
    const inputValue = i[1];
    const inputElement = document.createElement("input");
    inputElement.setAttribute("name", inputName);
    inputElement.setAttribute("value", inputValue);
    formElement.appendChild(inputElement);
  });
  document.body.appendChild(formElement);
  formElement.submit();
};

// Ajax 傳送 Form Data
/**
 * Ajax 模仿 Form 格式兩大重點
 * Content-Type -> application/x-www-form-urlencoded
 * body -> data 為序列化 如:'KEY1=VALUE1&KEY2=VALUE2'
 * 
 * 如果用 new FormData()
 * 預設格式 Content-Type 為 multipart/form-data
 * 而 body data 為 鍵值
 */
const useFormAjax = (actionUrl, data = {}) => {
  const formData = [];
  Object.entries(data).forEach((i) => {
    const inputName = i[0];
    const inputValue = i[1];
    const formDataString = `${inputName}=${inputValue}`;
    formData.push(formDataString);
  });
  fetch(actionUrl, {
    method: "POST",
    body: formData.join("&"),
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
};
