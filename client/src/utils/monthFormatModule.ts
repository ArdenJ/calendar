import moment from 'moment'

// This is over-typed
interface IDateMod {
  _firstSun: string
  _additionalDays: number
}

// This didn't work the way I thought it worked.
// What I thought: i was incremented and the value of i was subtracted from first day on each loop
// What actually is happening i remains = 1 and the value of first day is mumtated. This is an issue.
// Original code at the bottom
//
// Change made: create new constant === to the initial argument passed to the module an calculate the
// difference between that and the first sunday on exiting the loop.
// TODO: Refactor - don't mutate initial argument
const monthFormatModule = (function() {
  let _firstSun: string
  let _additionalDays: number

  function findSunday(firstDay: string): IDateMod {
    let sun = moment(firstDay, 'DD-MM-YYYY').format('ddd')
    const start = moment(firstDay, 'DD-MM-YYYY')
    if (sun === 'Sun') {
      _firstSun = firstDay
      _additionalDays = 1
      return { _firstSun, _additionalDays }
    } else {
      do {
        firstDay = `${moment(firstDay, 'DD-MM-YYYY')
          .add(-1, 'days')
          .format('DD-MM-YYYY')}`
        let days = moment(firstDay, 'DD-MM-YYYY').diff(start, 'days')
        _firstSun = firstDay
        _additionalDays = days
        sun = moment(_firstSun, 'DD-MM-YYYY').format('ddd')
      } while (sun !== 'Sun')
      return { _firstSun, _additionalDays }
    }
  }

  return {
    getStartDate: function(firstDay: string): string {
      return findSunday(firstDay)._firstSun
    },
    getAdditionalDays: function(firstDay: string): number {
      return findSunday(firstDay)._additionalDays
    },
  }
})()

export const { getStartDate, getAdditionalDays } = monthFormatModule

// function findSunday(firstDay: string): IDateMod {
//   let sun = moment(firstDay, 'DD-MM-YYYY').format('ddd')
//   let i = 1
//   if (sun === 'Sun') {
//     _firstSun = firstDay
//     _additionalDays = i
//     debugger
//     return { _firstSun, _additionalDays }
//   } else {
//     do {
//       i = i++
//       firstDay = `${moment(firstDay, 'DD-MM-YYYY')
//         .add(-i, 'days')
//         .format('DD-MM-YYYY')}`
//       _firstSun = firstDay
//       _additionalDays = i
//       debugger
//       sun = moment(_firstSun, 'DD-MM-YYYY').format('ddd')
//     } while (sun !== 'Sun')
//     return { _firstSun, _additionalDays }
//   }
// }
