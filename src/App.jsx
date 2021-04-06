import React from "react";
import { store, connect, appContext } from "./redux";

export const App = () => {
  return (
    <appContext.Provider value={store}>
      <大儿子 />
      <二儿子 />
      <幺儿子 />
    </appContext.Provider>
  );
};
const 大儿子 = () => {
  console.log("【大儿子 执行】", Math.random());
  return (
    <section>
      大儿子
      <User />
    </section>
  );
};

const 二儿子 = () => {
  console.log("【二儿子 执行】", Math.random());
  return (
    <section>
      二儿子
      <UserModifier></UserModifier>
    </section>
  );
};

const 幺儿子 = () => {
  console.log("【幺儿子 执行】", Math.random());
  return <section>幺儿子</section>;
};

const User = connect((props) => {
  console.log("【User 执行】", Math.random());
  const { state } = props;
  return <div>User: {state.user.name}</div>;
});

const UserModifier = connect((props) => {
  console.log("【UserModifier 执行】", Math.random());

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
