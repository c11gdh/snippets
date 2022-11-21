const downloadBlobImage = async (baseUrl = "", fileId = "", fileName = "") => {
  try {
    // 取得圖片二進制緩衝資料
    const res = await this.$axios.post(
      baseUrl,
      { fileId },
      { responseType: "arraybuffer" }
    );

    // 圖片二進制緩衝資料 -> 轉換二進制資料
    const blob = new Blob([res], { type: "image/jpeg" });

    // 建立圖片物件位置(存在瀏覽器記憶體中)
    const url = URL.createObjectURL(blob);

    // 模擬檔案下載
    const aTag = document.createElement("a");
    aTag.href = url;
    aTag.download = fileName;
    aTag.click();

    // 清掉暫存
    aTag.href = "";
    URL.revokeObjectURL(url);

    if (rtnCode !== "0000") throw new Error(msg);
  } catch (err) {
    console.log(err.message);
  }
};
