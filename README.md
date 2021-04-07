### state

跨组件共享状态需要使用`React.createContext`配合`useContext`来将顶层的`state`注入给子组件。

### reducer

直接通过`context`中的`setState`去修改顶层状态不太方便，所以需要一个统一的规范去修改状态，于是就约定通过`reducer`去生成新的`state`

### dispatch

每次通过`useContext`返回的`setState`去修改状态会需要写很多样板代码，于是就想在组件外层包一层去定义一个专门用来写`state`的方法`dispatch`，并将它作为`props`传给子组件，这样就能够调用`dispatch`并传入一些用于修改的数据就能够修改`state`

### action

传给`dispatch`用于描述修改数据的对象，包括`type`操作类型，`payload`修改后的新数据

### store

存储全局`state`以及`对state的一些相关操作`，包括外部传入的 reducer、直接修改 state 的 setState 方法、回调列表、以及订阅修改数据回调的 subscribe

### connect

用于连接组件和全局`state`，通过`useContext`拿到全局`state`并将它作为 props 传给组件来实现`读state`，通过定义`dispatch`来实现`写state`

### mapStateToProps

封装`读state`，控制只有所需的 state 发生变更时才去重新渲染组件，做到精准渲染

### mapDispatchToProps

封装`写state`，控制组件中具体操作 state 的方法

## 手动 setState 一个空对象来达到控制渲染的效果

如果将顶层组件的状态作为 initialState 传给`React.createContext`，那么在修改状态时会导致所有子组件都重新渲染，即使是那些没有使用到 state 的组件。

为了解决这个问题，需要将 state 集中放到全局变量`store`中，这样传给`Provider`的`value`就是一个不会改变的对象，修改 state 不会引发任何渲染。同时，我们去订阅 state 的变更，并且在回调中去手动通过 setState 空对象的方式实现只重新渲染包裹了 connect 的组件。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/51f9f69ead7646009f4f0461d30c9e1c~tplv-k3u1fbpfcp-watermark.image)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/92f467005c814df8841bcf40dae94800~tplv-k3u1fbpfcp-watermark.image)
