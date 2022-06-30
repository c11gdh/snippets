/**
 *  快速選取表單元素並送出
 *  可當作 Bookmarklet 來使用的程式小書籤
 */
(() => {
  const myForm = document.forms[0];
  const { username, password } = myForm.elements;
  username.value = "myUserName";
  password.value = "myPassword";
  myForm.submit();
})();
