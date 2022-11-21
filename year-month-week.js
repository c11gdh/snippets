import dayjs from "dayjs";

export const time = {
  data() {
    return {
      /** 年度 清單 */
      yearList: [],
      /** 月份 清單 */
      monthList: [],
      /** 週 清單 */
      weekList: [],
      // 年月日
      editData: {
        year: dayjs().year(),
        month: 1,
        week: 1,
      },
    };
  },
  methods: {
    // 初始化
    initDate() {
      this.setYeatList();
      this.setMonthList();
      const currentYear = dayjs().year();
      const currentMonth = dayjs().month() + 1;
      this.editData.year = currentYear;
      this.editData.month = currentMonth;
      this.getWeeks(this.editData.year, this.editData.month);
    },
    /** 設定年度清單 */
    setYeatList() {
      const currentYear = dayjs().year();
      for (let i = currentYear; i <= currentYear + 10; i++) {
        this.yearList.push({
          value: i,
          label: i,
        });
      }
    },
    /** 設定月份清單 */
    setMonthList() {
      for (let i = 1; i <= 12; i++) {
        this.monthList.push({
          value: i,
          label: i,
        });
      }
    },
    /** 取得 當前月份是第幾週 */
    getMonthWeek(date = new Date()) {
      const w = dayjs(date).day();
      const d = dayjs(date).date();
      return Math.ceil((d + 6 - w) / 7);
    },
    /** 設定週清單 */
    getWeeks(year, month) {
      const fromStart = 1;
      const date = new Date(String(month));
      // w ->計算該月1號是週幾, 0是週日 .
      const w = date.getDay();
      const m = date.getMonth() + 1;
      date.setMonth(m);
      date.setDate(0);
      // 該月的天數
      const d = date.getDate();
      // 根據fromStart和w的结果,算出該月有幾天
      const firstWeekDays = w
        ? (7 + fromStart - w) % 7
        : fromStart
        ? fromStart
        : 7 - fromStart;
      // 計算該月有幾週
      const weekNum = Math.ceil((d - firstWeekDays) / 7) + 1;
      this.weekList = [];
      for (let i = 1; i <= weekNum; i++) {
        this.weekList.push({
          label: `第${i}週`,
          value: i,
        });
      }
    },
  },
  watch: {
    "editData.year"(val) {
      const currentYear = dayjs().year();
      const currentMonth = dayjs().month() + 1;
      if (currentYear === val) {
        this.editData.month = currentMonth;
        this.getMonthWeek();
      } else {
        this.editData.month = 1;
      }
    },
    "editData.month"(val) {
      const currentYear = dayjs().year();
      const currentMonth = dayjs().month() + 1;
      this.getWeeks(this.editData.year, val);
      if (currentYear === this.editData.year && currentMonth === val) {
        this.getMonthWeek();
      } else {
        this.editData.week = 1;
      }
    },
  },
};
