/**
 * Blob(File)物件 -> 可透過 input取得/ajax取得/new Blob建立
 * Blob 可以透過 URL.createObjectURL(blob) 轉為 Blob Url (存在覽器記憶體), 提供下載
 * Blob 可以透過 FileReader 的 readAsDataURL 讀取為 base64 data url
 * base64 data url 可以當作 image 的 src 使用
 */

/**
 * blob to base64
 **/
function blobToDataURI(blob, callback) {
  var reader = new FileReader();
  reader.onload = function (e) {
    callback(e.target.result);
  };
  reader.readAsDataURL(blob);
}

/**
 * base64 to blob
 */
function dataURItoBlob(dataURI) {
  var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0]; // mime類型
  var byteString = atob(dataURI.split(",")[1]); //base64 解碼
  var arrayBuffer = new ArrayBuffer(byteString.length); //建立緩衝
  var intArray = new Uint8Array(arrayBuffer); //建立視圖

  for (var i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i);
  }
  return new Blob([intArray], { type: mimeString });
}
