import { useEffect, useState, useRef } from "react";

const config = [
  "http://domain1.error",
  "https://cat-fact.herokuapp.com",
  "http://domain2.error",
];
// NOTE: 在背景程式中以遞迴方式取得設定檔中的第一條可用線路
const BackgroundProcess = () => {
  const isMounted = useRef(false);
  const [availableLine, setAvailableLine] = useState(null);

  const recurision = async (index = 0, lines = config) => {
    if (index === lines.length) return console.log("All Lines are Failed");

    try {
      const res = await fetch(lines[index]);
      if (res.status !== 200) throw new Error(`${lines[index]} is Failed`);
      setAvailableLine(lines[index]);
    } catch (err) {
      const { name, message } = err;
      if (name === "Error") {
        console.log(message);
      } else {
        console.log(`${lines[index]} is Failed`);
      }
      recurision(index + 1);
    }
  };

  useEffect(() => {
    recurision();
  }, []);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      console.log("[Available Line]", availableLine);
    }
  }, [availableLine]);

  return null;
};

export default BackgroundProcess;
