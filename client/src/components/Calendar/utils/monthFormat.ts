import moment from 'moment'

interface IDateMod {
  _firstSun: string
  _additionalDays: number
}

// TODO: Refactor - don't mutate initial argument
const monthFormat = (function() {
  let _firstSun: string
  let _additionalDays: number

  function findSunday(firstDay: string): IDateMod {
    let sun = moment(firstDay, 'DD-MM-YYYY').format('ddd')
    const start = moment(firstDay, 'DD-MM-YYYY')
    if (sun === 'Sun') {
      _firstSun = firstDay
      _additionalDays = 0
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

export const { getStartDate, getAdditionalDays } = monthFormat
