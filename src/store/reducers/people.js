import * as actionTypes from "../actions/actionTypes";
const initialState = {
  popularPeople: null,
  personDetails: null,
  personActing: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POPULAR_PEOPLE:
      return {
        ...state,
        popularPeople: [...action.popularPeople]
      };
    case actionTypes.PERSON_DETAILS:
      return {
        ...state,
        personDetails: action.personDetails
      };
    case actionTypes.PERSON_ACTING_HISTORY:
      return {
        ...state,
        personActing: [...action.personActing]
      };
    default:
      return state;
  }
};

export default reducer;
