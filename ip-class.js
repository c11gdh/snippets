/**
 * 根據設定檔來判斷使用者的IP類型
 * 並回傳 Your IP [xxx.xxx.x.x] is Class X 的資訊
 */

const IP_ADDRESS_CLASSES = {
  A: {
    text: "Class A",
    range: [0, 127],
  },
  B: {
    text: "Class B",
    range: [128, 191],
  },
  C: {
    text: "Class C",
    range: [192, 223],
  },
  D: {
    text: "Class D",
    range: [224, 239],
  },
  E: {
    text: "Class E",
    range: [240, 255],
  },
};

const checkYourIPClass = (ip = null) => {
  if (ip === null) return console.log("IP doesnt exist");
  const firstBits = +ip.split(".").slice(0, 1)[0];
  const classesConfig = Object.entries(IP_ADDRESS_CLASSES);
  const ipClass = classesConfig.find(([key, value]) => {
    const { range } = value;
    if (firstBits >= range[0] && firstBits <= range[1]) return true;
    return false;
  });
  if (!ipClass) return console.log("IP class doesnt exist");
  console.log(`Your IP [${ip}] is ${ipClass[1].text}`);
};

(async () => {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    if (res.status !== 200) throw new Error(`Code: ${res.status}`);
    const json = await res.json();
    const { ip } = json;
    checkYourIPClass(ip);
  } catch (error) {
    console.log("Error", error.message);
  }
})();
