export const YMD = date => {
  date = date || new Date().getTime();
  return {
    y: new Date(date).getFullYear(),
    m: new Date(date).getMonth() + 1,
    d: new Date(date).getDate(),
    w: new Date(date).getDay(),
  }
}

export const monthList = (y = YMD().y, m = YMD().m) => {
  const todayString = `${YMD().y}/${YMD().m}/${YMD().d}`;
  let weekRow = [], monthArr = [], dayTime = 24 * 60 * 60 * 1000, dayNum;
  let monthFirDay = new Date(`${y}/${m}/01`).getTime(); //本月第一天时间戳
  if(Number(m) === 12){
    dayNum = YMD(new Date(`${y-0+1}/01/01`) - dayTime).d; //本月天数
  } else {
    dayNum = YMD(new Date(`${y}/${m - 0 + 1}/01`) - dayTime).d; //本月天数
  }
  /* 本月天数 */
  for (let i = 0; i < dayNum; i++) {
    let itemDate = YMD(monthFirDay + dayTime * i);
    let item = {
      isMonth: 1,
      date: itemDate,
      item: itemDate.d,
      dateString: `${itemDate.y}/${itemDate.m}/${itemDate.d}`,
    }
    if (todayString === item.dateString)  item.today = true;
    weekRow.push(item);
    if ((itemDate.w >= 6 && weekRow.length) || i === dayNum - 1) {
      monthArr.push(weekRow);
      weekRow = [];
    }
  }
  if (monthArr[0].length < 7) {
    let preNum = 7 - monthArr[0].length;
    for (let i = 1; i <= preNum; i++) {
      let itemDate = YMD(monthFirDay - dayTime * i);
      let item = {
        isMonth: 0,
        date: itemDate,
        item: itemDate.d,
        dateString: `${itemDate.y}/${itemDate.m}/${itemDate.d}`,
      }
      monthArr[0].unshift(item)
    }
  }
  if (monthArr[monthArr.length - 1].length < 7) {
    let preNum = 7 - monthArr[monthArr.length - 1].length;
    for (let i = 0; i < preNum; i++) {
      let itemDate = YMD(monthFirDay + dayTime * (i + dayNum));
      let item = {
        isMonth: 0,
        date: itemDate,
        item: itemDate.d,
        dateString: `${itemDate.y}/${itemDate.m}/${itemDate.d}`,
      }
      monthArr[monthArr.length - 1].push(item)
    }
  }
  return monthArr;
}