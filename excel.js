// import XLSX from "xlsx";
// import dayjs from "dayjs";
const XLSX = require('xlsx')
const dayjs = require('dayjs')

const date = dayjs();
const daysInMonth = date.daysInMonth();
const dates = new Array(daysInMonth).fill(0).map((_, index) => {
  const currentDate = date.startOf("month").add(index, "day").format("M/D ddd");
  return currentDate.split(" ");
});

const isWeekEnd = (str) => {
  return ["Sat", "Sun"].indexOf(str) !== -1;
};

const data = dates.map((i) => {
  const r1 = ~~(Math.random() * 15);
  const r2 = ~~(Math.random() * 20);

  const startTime =
    r1 === 0 ? "9:00" : `8:${(60 - r1).toString().padStart(2, 0)}`;
  const endTime = `6:${r2.toString().padStart(2, 0)}`;

  return {
    日期: i[0],
    星期: i[1],
    上班時間: isWeekEnd(i[1]) ? "" : `${startTime} AM`,
    下班時間: isWeekEnd(i[1]) ? "" : `${endTime} PM`,
  };
});

const workbook = XLSX.utils.book_new();
const worksheet = XLSX.utils.json_to_sheet(data);

XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
XLSX.writeFile(workbook, "output.xlsx");
