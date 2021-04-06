import { connect } from "../redux";

const selector = (state) => {
  return {
    user: state.user,
  };
};

const dispatchSelector = (dispatch) => {
  return {
    updateUser: (val) =>
      dispatch({
        type: "updateState",
        payload: val,
      }),
  };
};

const connectToUser = connect(selector, dispatchSelector);

export default connectToUser;
