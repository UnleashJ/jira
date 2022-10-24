# 配置

1. 在项目中使用 prettier 进行代码格式化，并使用 lint-staged 和 husky 在 pre-commit 代码提交前进行格式化处理。
2. 使用 commitlint 对代码的 commit 信息规范化。
3. 使用 json-server 对 mock 数据进行管理。

## TypeScript 部分

interface 与 type，使用 interface 无法实现联合类型与交叉类型，type 可以。

interface 无法实现 Utility type [工具类型](http://www.patrickzhong.com/TypeScript/zh/reference/utility-types.html#实用工具类型)。

[`Partial`](http://www.patrickzhong.com/TypeScript/zh/reference/utility-types.html#partialtype)的实现

keyof 把一个对象类型的键值取出类，形成一个联合类型。

```ts
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

## CRACO

使用 CRACO 改变 create-react-app 的配置。

**C**reate **R**eact **A**pp **C**onfiguration **O**verride is an easy and comprehensible configuration layer for create-react-app.

## [Emotion](https://emotion.sh/docs/install)

使用 Emotion 作为 CSS-In-JS 方案。

## SVG

将 SVG 作为 React 组件引入，

```js
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
```

## 错误边界

错误边界 https://zh-hans.reactjs.org/docs/error-boundaries.html
