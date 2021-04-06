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
    <UserModifier />
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

const UserModifier = () => {
  const { appState, setAppState } = useContext(appContext);

  const onChange = (e) => {
    setAppState(
      reducer(appState, {
        type: "updateState",
        payload: { name: e.target.value },
      })
    );
  };

  return (
    <div>
      <input value={appState.user.name} onChange={onChange} />
    </div>
  );
};
