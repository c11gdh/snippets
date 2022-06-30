/**
 * 利用時間戳在例外處理中取得線路回應的時間
 */
(async () => {
  const START_TIMESTAMP = new Date().getTime();
  try {
    const res = await fetch("https://google.com");
    if (res.status !== 200) throw new Error("請求失敗");
    console.log("[請求成功]");
  } catch (e) {
    console.log(e.message);
  } finally {
    const END_TIMESTAMP = new Date().getTime();
    const RESPONSE_TIME = END_TIMESTAMP - START_TIMESTAMP;
    console.log("[線路回應時間]", `${RESPONSE_TIME} ms`);
  }
})();
