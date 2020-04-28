export const splitDayArray = (arg: JSX.Element[], rowLength: number) => {
  let innerArr = arg;
  let memo: any[] = [];
  const slicer = (innerArr: JSX.Element[]) => {
    if (innerArr.length === 0) return memo;
    for (let day of innerArr) {
      if (innerArr.indexOf(day) + 1 === rowLength) {
        let arr = innerArr.slice(0, innerArr.indexOf(day) + 1);
        memo.push(arr);
        slicer(innerArr.slice(innerArr.indexOf(day) + 1));
      }
    }
    return memo;
  };
  return slicer(innerArr);
};