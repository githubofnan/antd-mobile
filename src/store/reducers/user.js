import { USER } from "../constants/index";

const defaultData = {
  id: 0,
  sex: 0,
  name: '',
  mobile: ''
};

export default (state=defaultData, action) => {
  switch (action.type) {
    case USER.LOGIN:
      return Object.assign({}, state, action.data)
    case USER.LOGINOUT:
      return Object.assign({}, defaultData)
    default:
      return state;
  }
}