const fileList = [];

// 圖片轉 base64 格式
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

//  上傳檔案
const addFile = async (uploadFile) => {
  let files = uploadFile;
  const fileData = files[0];
  const base64 = await toBase64(fileData);
  const fileName = fileData.name;
  fileList.push({ fileName, base64 });
};
