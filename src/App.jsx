import React from "react";
import { createStore, connect, Provider } from "./redux";
import connectToUser from "./connectors/connectToUser";

const initialState = {
  user: { name: "hong", age: 18 },
  group: { name: "前端组" },
};

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

const store = createStore(reducer, initialState);

export const App = () => {
  return (
    <>
      <Provider store={store}>
        <大儿子 />
        <二儿子 />
        <幺儿子 />
      </Provider>
    </>
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

const 幺儿子 = connect((state) => {
  return {
    group: state.group,
  };
})((props) => {
  console.log("【幺儿子 执行】", Math.random());
  const { group } = props;
  return (
    <section>
      幺儿子
      <div>{group.name}</div>
      {/* <div>{props.group.name}</div> */}
    </section>
  );
});

const User = connectToUser((props) => {
  console.log("【User 执行】", Math.random());
  const { user } = props;
  return <div>User: {user.name}</div>;
});

const UserModifier = connectToUser((props) => {
  console.log("【UserModifier 执行】", Math.random());

  const { user, updateUser } = props;
  const onChange = (e) => {
    updateUser({ name: e.target.value });
  };

  return (
    <div>
      <input value={user.name} onChange={onChange} />
    </div>
  );
});
