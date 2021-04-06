import React, { useState, useContext } from "react";

const appContext = React.createContext(null);

export const App = () => {
  const [appState, setAppState] = useState({
    user: { name: "hong", age: 18 },
  });

  const contextValue = { appState, setAppState };

  return (
    <appContext.Provider value={contextValue}>
      <大儿子 />
      <二儿子 />
      <幺儿子 />
    </appContext.Provider>
  );
};
const 大儿子 = () => (
  <section>
    大儿子
    <User />
  </section>
);

const 二儿子 = () => (
  <section>
    二儿子
    <UserModifier></UserModifier>
  </section>
);

const 幺儿子 = () => <section>幺儿子</section>;

const User = () => {
  const contextValue = useContext(appContext);
  return <div>User: {contextValue.appState.user.name}</div>;
};

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
 * connect：  连接组件与全局状态
 */
const connect = (Component) => {
  /**
   * 规范setState的流程：  基于高阶组件来向下传递state和dispatch
   */
  return (props) => {
    const { appState, setAppState } = useContext(appContext);

    const dispatch = (action) => {
      setAppState(reducer(appState, action));
    };

    return <Component {...props} dispatch={dispatch} state={appState} />;
  };
};

const UserModifier = connect((props) => {
  const { state, dispatch } = props;
  const onChange = (e) => {
    dispatch({
      type: "updateState",
      payload: { name: e.target.value },
    });
  };

  return (
    <div>
      <input value={state.user.name} onChange={onChange} />
    </div>
  );
});
