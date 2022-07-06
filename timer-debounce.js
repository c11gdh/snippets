/**
 * 視窗滑動事件的去抖動
 * 利用定時器在停止滑動的 50ms 後觸發Ｙ座標顯示
 */

const showWindowYPosition = () => {
  console.log(window.pageYOffset);
};

let timer;
window.addEventListener("scroll", (e) => {
  clearTimeout(timer);
  timer = setTimeout(showWindowYPosition, 50);
});
