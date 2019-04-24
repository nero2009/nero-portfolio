---
path: /redux-devtools-stack-trace
date: 2019-03-11
title: Redux Devtools - Action Stack Trace
author: Nero Adaware
description: New feature added to Redux devtools, it helps you track where a particular redux action was dispatched from.
---

![Cover image](./redux.png)

I recently watched on Youtube Mark Erikson's talk 'The State of Redux' in Reacthaton 2019. Apart from talking about the current state of redux(Yes!! Redux is not dead) he also spoke about a new feature added to the Redux developer tools. This is called the action stack trace, it helps you track where a particular Redux action was dispatched from. This feature is disabled by default when enabled a Trace tab is added to your Redux devtools and when you click on a particular action it shows you the stack trace of where that action was dispatched from.

I think this is a big addition to the Redux devtools because not long ago I had to deal with a bug where an action was dispatched in my application but I didn't know where or what dispatched that action.

![Action stack trace demo](https://user-images.githubusercontent.com/7957859/50161148-a1639300-02e3-11e9-80e7-18d3215a0bf8.gif)

> The above image was gotten from [Redux Devtools Extension Docs](https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/Features/Trace.md)

To enable this feature set the `trace` option to `true` when you are setting up the redux devtools. Examples are below on are to enable this feature.

```js
// Without middleware

//import { composeWithDevTools } from "redux-devtools-extension";
//import * as actionCreators from "./actions/index";

const composeEnhancers = composeWithDevTools({
  actionCreators,
  trace: true,
  traceLimit: 25,
})
const store = createStore(reducer, composeEnhancers())
```

```js
// With thunk middleware

//import { composeWithDevTools } from "redux-devtools-extension";

const composeEnhancers = composeWithDevTools({
  actionCreators,
  trace: true,
  traceLimit: 25,
})
const store = createStore(
  reducer,
  preloadedState,
  composeEnhancers(applyMiddleware(invariant(), thunk))
)
```

```js
// With redux-saga middleware
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&

    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    trace: true,
    traceLimit: 25
}) || compose;
const store = createStore( reducer, composeEnhancers(applyMiddleware(sagaMiddleware))
```

You can check out the docs for [examples](https://github.com/zalmoxisus/redux-devtools-extension/commit/64717bb9b3534ff616d9db56c2be680627c7b09d)

I use create react app for most of my React application so I don't need any additional setup but if you setup your own application using webpack configuration you will need to set the `devtool` in your webpack config to `source-map` for development. This helps Redux devtools provide a mapping between the original code and the transformed source code.
