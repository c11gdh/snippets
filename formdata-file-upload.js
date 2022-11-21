const uploadFileList = [{ name: "file1", base64: "base64code" }];

const uploadFile = async (BASE_URL, file) => {
  try {
    // 建立 FormData
    const formData = new FormData();

    // FormData 新增 key/value
    for (let i = 0; i < uploadFileList.length; i++) {
      formData.append("files", uploadFileList[i]);
    }

    // 送出 FormData
    await fetch(BASE_URL, {
      method: "POST",
      body: formData,
    });
  } catch (e) {
  } finally {
  }
};
