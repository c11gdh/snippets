/**
 * Promise 來判斷線路的回應速度
 * all -> 全部成功則成功, 一個不成功全部失敗
 * race -> 回應最快的線路, 不論其失敗與否
 * any -> 成功回傳的第一條線路
 */
const LINES_CONFIG = [
  "https://anime-facts-rest-api.herokuapp.com/api/v1",
  "https://cat-fact.herokuapp.com",
  "https://domain.error",
];

const LINES_PROMISE = LINES_CONFIG.map(
  (line) =>
    new Promise((resolve, reject) => {
      (async () => {
        try {
          const res = await fetch(line);
          if (res.status !== 200) throw new Error();
          resolve(line);
        } catch (e) {
          reject(false);
        }
      })();
    })
);

(async () => {
  try {
    const response = await Promise.any(LINES_PROMISE);
    console.log("[Response]", response);
  } catch (e) {
    console.log("Error", "Promise is Failed");
  }
})();

// const LINES_PROMISE = LINES_CONFIG.map(
//   (line) =>
//     new Promise((resolve, reject) => {
//       fetch(line)
//         .then((res) => {
//           if (res.status !== 200) throw new Error();
//           resolve(line);
//         })
//         .catch(() => reject(false));
//     })
// );
