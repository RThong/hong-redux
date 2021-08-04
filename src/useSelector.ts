import { useContext, useState, useEffect } from "react";
import { appContext } from "./redux";

/**
 * 简单判断两次state对象是否改变
 */
const isChange = (newVal, oldVal) => {
  let changed = false;
  for (const key in oldVal) {
    if (oldVal[key] !== newVal[key]) {
      changed = true;
    }
  }

  return changed;
};

const useSelector = (selector, mapDispatchToProps) => {
  // 这里直接从store对象去取值的话，那使用处包裹Provider就没有意义
  const { state, setState, reducer, subscribe } = useContext(appContext);

  const dispatch = (action) => {
    setState(reducer(state, action));
  };

  const update = useState({})[1];

  const data = selector ? selector(state) : state;

  const dispatchSelector = mapDispatchToProps
    ? mapDispatchToProps(dispatch)
    : { dispatch };

  // 订阅state变更去更新组件   只在connect连接全局state的组件进行render
  useEffect(() => {
    const unsubscribe = subscribe((val) => {
      // state发生变更时获取最新的数据
      const newData = selector ? selector(val) : val;

      if (isChange(newData, data)) {
        update({});
      }
    });

    return () => {
      unsubscribe();
    };
  }, [selector]);

  return data;
};

export default useSelector;
