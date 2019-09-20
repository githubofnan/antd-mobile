import { CALENDAR } from '../constants/index'

export const pushLoser = data => ({
  type: CALENDAR.LOSER,
  data
})

export const clearLoser = () => ({
  type: CALENDAR.CLEARLOSER,
})