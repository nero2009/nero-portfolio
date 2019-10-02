---
path: /hooks-introduced-in-react-router
date: 2019-09-27
title: Hooks Introduced in React-Router v5.1 
author: Nero Adaware
description: I am always excited when there is a new release of any of my favourite libraries/frameworks/languages, At about 6 pm yesterday while scrolling through twitter I saw that a new version of react-router was released so I went to look it up and the react-router team added some really nice new API's and functionality.
---

<img src="./React-Router.jpg" width="100%" />

I am always excited when there is a new release of any of my favourite libraries/frameworks/languages, At about 6 pm yesterday while scrolling through twitter I saw that a new version of react-router was released so I went to look it up and the react-router team added some really nice new API's and functionality.
The react-router team added to the ongoing React hooks buzz by releasing some hooks API in its version 5.1 with the release of the `useParams`, `useLocation`, `useHistory` and `useRouteMatch` hooks. These hooks give us new ways to manage the router's state. Apart from the hooks added to the v5.1 there is now support for `forwardRef` in the `<Link>`and they reintroduced the ability to pass functions in the `to` prop of the `<Link>` and `<NavLink>`.

I will be walking through how those hooks work and how do they change the way we write our routes.

### useParams

This hook gives us access to the params of that particular route. params are parameters whose values are set dynamically in a URL. Usually, the way we access the params in previous versions of react-router was through the match props passed to the component.

```jsx
// <= V5.0

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

const Portfolio = props => {
	const { match } = props;

	let id = match.params;
	return (
		<div>
			Portfolio component
			<p>Url params: {id}</p>
		</div>
	);
};

function App() {
	return (
		<div className="App">
			<Router>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/contact">Contact</Link>
					</li>
					<li>
						<Link to="/portfolio/6">Portfolio</Link>
					</li>
				</ul>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/portfolio/:id" component={Portfolio} />
					<Route path="/contact" component={Contact} />
				</Switch>
			</Router>
		</div>
	);
}
```

Above is the approach we use to access the URL params in previous versions of react-router. But with the introduction of useParams hook, all users can get access to the params from the hook.


```jsx
// > V5.1
import { useParams} from "react-router";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Portfolio = () => {
	let { id } = useParams();
	return (
		<div>
			Portfolio component
			<p>Topic: {id}</p>
		</div>
	);
};


```

### useLocation

This is another hook released in v5.1, if you use react-router a lot I assume that you have used the location object before either to get the `pathname` property or the state property. I usually pass state through the react-router `Link` so I think I will be refactoring my components to use the useLocation hook, this will probably be my first react hook in production 👀(I know I am late to the party).

*Note*: Passing state through react-router's `<Link>` isn't a new feature, it has been there since I started using React.

```jsx
// > V5.1
import { useLocation} from "react-router";

const Settings = () => {
	let location = useLocation();
	console.log(location);
	return <div>settings component</div>;
};

function App() {
	return (
		<div className="App">
			<Router>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					
					<li>
						<Link
							to={{
								pathname: "/settings",
								state: {
									fromNavBar: true
								}
							}}
						>
							Settings
						</Link>
					</li>
				</ul>
				<Switch>
					<Route exact path="/" component={Home} />
                                       //
					<Route path="/settings" component={Settings} />
				</Switch>
			</Router>
		</div>
	);
}

// console
// {
//   "pathname": "/settings",
//   "state": {
//     "fromNavBar": true
//   },
//   "search": "",
//   "hash": "",
//   "key": "x8vmq3"
// }
```

The `useLocation` hook returns the location object which contains the `pathname`, `search`, `hash`, `key` and the `state` properties of the current location.

### useHistory

The `useHistory` gives us access to the `history` object which helps us programmatically navigate or change routes.

```jsx
// > V5.1
import { useHistory } from "react-router-dom";

export const Profile = () => {
	let history = useHistory();
	return (
		<div>
			<button onClick={() => history.goBack()}>Back</button>
			<button onClick={() => history.push("/")}>Home</button>
			<section>
				<p>profile page</p>
			</section>
		</div>
	);
};
```

The history object also returns the location object as one of its properties but it is advised to not to use the location returned by it because [history is mutable](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/history.md#history-is-mutable), so use the `useLocation` hook for that.


### useRouteMatch

This is the final hook added to this release, `useRouteMatch` gives you access to the `match` property without rendering a `<Route>` component. It matches the URL just like a Route would and it accepts an `exact`, `strict`, `path` and `sensitive` options just like a `<Route>`. Before V5.1 the ways to access the `match` object are through:

- Route component as this.props.match
- Route render as ({ match }) => ()
- Route children as ({ match }) => ()
- withRouter as this.props.match
- matchPath as the return value

```jsx
// <= V5.0
function App() {
	return (
		<div className="App">
			<Router>
				<Route
					path="'/Movies/:id/'"
					strict
					sensitive
					render={({ match }) => {
						return match && <Movies match={match} />;
					}}
				/>
			</Router>
		</div>
	);
}

// > V5.1
import { useRouteMatch } from "react-router";

function App() {
	let match = useRouteMatch({
		path: "/Movies/:id/",
		strict: true,
		sensitive: true
	});

	return (
		<div>
			{match && <Movies match={match} />}
		</div>
	);
}
```

`useRouteMatch` gives us a new way to access the match object and if you have an `<Route>` that is not inside a `Switch` it makes sense to use `useRouteMatch`. I mean it is hooks szn!!!

### Conclusion

I really love these hooks added to the react-router API, they give us the ability to compose router state which opens new possibilities in term of building application. Excited to see what other new features and APIs are introduced in future releases also the react-router team is hoping to release version 6 early next year.