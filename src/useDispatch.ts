import { useContext } from "react";
import { appContext } from "./redux";

const useDispatch = () => {
  // 这里直接从store对象去取值的话，那使用处包裹Provider就没有意义
  const { state, setState, reducer, subscribe } = useContext(appContext);

  const dispatch = (action) => {
    setState(reducer(state, action));
  };

  return dispatch;
};

export default useDispatch;
