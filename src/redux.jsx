import React, { useState, useContext, useEffect } from "react";

// 统一将state保存在外部而不是作为顶级组件的state   避免全部子组件render
export const store = {
  state: {
    user: { name: "hong", age: 18 },
    group: { name: "前端组" },
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
const reducer = (state, { type, payload }) => {
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

/**
 * connect：  连接组件与全局状态
 * selector:  组件中需要的state发生变更才去重新render
 */
export const connect = (selector) => (Component) => {
  /**
   * 规范setState的流程：  基于高阶组件来向下传递state和dispatch
   */
  return (props) => {
    const update = useState({})[1];

    const data = selector ? selector(store.state) : store.state;

    // 订阅state变更去更新组件   只在connect连接全局state的组件进行render
    useEffect(() => {
      const unsubscribe = store.subscribe(() => {
        // state发生变更时获取最新的数据
        const newData = selector ? selector(store.state) : store.state;

        if (isChange(newData, data)) {
          update({});
        }
      });

      return () => {
        unsubscribe();
      };
    }, [selector]);

    const dispatch = (action) => {
      store.setState(reducer(store.state, action));
    };

    return <Component {...props} {...data} dispatch={dispatch} />;
  };
};
