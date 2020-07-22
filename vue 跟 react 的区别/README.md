# vue 与 react 的区别

## 共同点

React 和 Vue 有许多相似之处，它们都有：

使用 Virtual DOM
提供了响应式 (Reactive) 和组件化 (Composable) 的视图组件。
将注意力集中保持在核心库，而将其他功能如路由和全局状态管理交给相关的库。


## 数据流不同

Vue 是双向数据绑定，组件与DOM之间可以通过 v-model 双向绑定

React 默认是单向数据流，如果要实现双向数据绑定，需要自行实现或者使用社区现成的库，例如 mobx。

## 监听数据变化的实现原理不同

Vue 通过 Object.defineProperty 定义 getter/setter，对数据进行劫持，精确的检测数据的变化，不需要特别的优化就能达到很好的性能。

React 默认是通过比较引用的方式进行的，如果不优化（PureComponent/shouldComponentUpdate）可能导致大量不必要的VDOM的重新渲染

为什么 React 不精确监听数据变化呢？这是因为 Vue 和 React 设计理念上的区别，Vue 使用的是可变数据，而React更强调数据的不可变。所以应该说没有好坏之分，Vue更加简单，而React构建大型应用的时候更加棒。

## 虚拟DOM与 Diff 算法

Vue 与 React 都有 虚拟 DOM，但再 DOM Diff 算法实现上有一些区别。

## HOC 和 mixins

在 Vue 中我们组合不同功能的方式是通过 mixin，而在React中我们通过 HoC (高阶组件）。

Vue3.0 开始放弃 mixin，因为 mixin 混入的功能比较难发现其来源。

## 构建工具

Vue 使用 vue-cli 快速生成项目模板，模板比较丰富，可以选使用配置、库，有 ui 操作界面，并且可以修改扩展 webpack 的配置。

React 使用 create-react-app 快速生成项目模板，并没有太多其他功能。默认预设好一套模板。如果要修改 webpack 需要进行 eject，操作不可逆。

## 模板渲染方式的不同

在表层上， 模板的语法不同

React 是通过JSX渲染模板

而Vue是通过一种拓展的HTML语法进行渲染

但其实这只是表面现象，毕竟React并不必须依赖JSX。

在深层上，模板的原理不同，这才是他们的本质区别：

React是在组件JS代码中，通过原生JS实现模板中的常见语法，比如插值，条件，循环等，都是通过JS语法实现的

Vue是在和组件JS代码分离的单独的模板中，通过指令来实现的，比如条件语句就需要 v-if 来实现

对这一点，我个人比较喜欢React的做法，因为他更加纯粹更加原生，而Vue的做法显得有些独特，会把HTML弄得很乱。举个例子，说明React的好处：

react中render函数是支持闭包特性的，所以我们import的组件在render中可以直接调用。但是在Vue中，由于模板中使用的数据都必须挂在 this 上进行一次中转，所以我们import 一个组件完了之后，还需要在 components 中再声明下，这样显然是很奇怪但又不得不这样的做法。

## 生态方面的区别

Vue 大部分常用的扩展库都是官方开发维护的
React 则是大部分库都由社区维护


## Vuex 和 Redux 的区别

从表面上来说，store 注入和使用方式有一些区别。

在 Vuex 中，$store 被直接注入到了组件实例中，因此可以比较灵活的使用：

使用 dispatch 和 commit 提交更新

通过 mapState 或者直接通过 this.$store 来读取数据

在 Redux 中，我们每一个组件都需要显示的用 connect 把需要的 props 和 dispatch 连接起来。

另外 Vuex 更加灵活一些，组件中既可以 dispatch action 也可以 commit updates，而 Redux 中只能进行 dispatch，并不能直接调用 reducer 进行修改。

从实现原理上来说，最大的区别是两点：

Redux 使用的是不可变数据，而Vuex的数据是可变的。Redux每次都是用新的state替换旧的state，而Vuex是直接修改

Redux 在检测数据变化的时候，是通过 diff 的方式比较差异的，而Vuex其实和Vue的原理一样，是通过 getter/setter来比较的（如果看Vuex源码会知道，其实他内部直接创建一个Vue实例用来跟踪数据变化）

而这两点的区别，其实也是因为 React 和 Vue的设计理念上的区别。React更偏向于构建稳定大型的应用，非常的科班化。相比之下，Vue更偏向于简单迅速的解决问题，更灵活，不那么严格遵循条条框框。因此也会给人一种大型项目用React，小型项目用 Vue 的感觉。
