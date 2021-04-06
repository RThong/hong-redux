import React, { useState, useContext, useEffect } from "react";

// 统一将state保存在外部而不是作为顶级组件的state   避免全部子组件render
export const store = {
  state: {
    user: { name: "hong", age: 18 },
  },
  setState: (newVal) => {
    store.state = newVal;
    store.listeners.forEach((fn) => {
      fn(store.state);
    });
  },
  listeners: [],
  // 订阅state的变动
  subscribe(fn) {
    store.listeners.push(fn);

    return () => {
      const index = store.listeners.indexOf(fn);

      store.listeners.splice(index, 1);
    };
  },
};

export const appContext = React.createContext(null);

/**
 * 规范state创建流程：  基于旧state生成新state的处理函数
 */
export const reducer = (state, { type, payload }) => {
  if (type === "updateState") {
    return {
      ...state,
      user: {
        ...state.user,
        ...payload,
      },
    };
  }
  return state;
};

/**
 * connect：  连接组件与全局状态
 */
export const connect = (Component) => {
  /**
   * 规范setState的流程：  基于高阶组件来向下传递state和dispatch
   */
  return (props) => {
    const { state, setState, subscribe } = useContext(appContext);

    const update = useState({})[1];

    // 订阅state变更去更新组件   只在connect连接全局state的组件进行render
    useEffect(() => {
      subscribe(() => update({}));
    }, [subscribe]);

    const dispatch = (action) => {
      setState(reducer(state, action));
    };

    return <Component {...props} dispatch={dispatch} state={state} />;
  };
};
