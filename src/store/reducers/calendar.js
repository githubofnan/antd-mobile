import { CALENDAR } from "../constants"

const defaultData = [];

export default (state=defaultData, action) => {
  switch (action.type) {
    case CALENDAR.LOSER:
      return [...new Set([...state, action.data])];
    case CALENDAR.CLEARLOSER:
      return [];
    default:
      return state;
  }
}