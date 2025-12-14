---
path: /using-websockets-in-react
date: 2019-08-19
title: Using WebSockets in React 
author: Oghenero Adaware
description: Recently I had to consume a WebSocket API in a React application I was working on, So in this article, I will briefly explain how to use it in a React Application.
tags: ["React", "WebSocket", "Real-time", "Tutorial"]
---

<img src="./websocket.png" width="100%" />

Recently I had to consume a WebSocket API in a React application I was working on, So in this article, I will briefly explain how to use it in a React Application.

## What is Websocket

According to MDN, _The WebSocket API is an advanced technology that makes it possible to open a two-way interactive communication session between the user's browser and a server. With this API, you can send messages to a server and receive event-driven responses without having to poll the server for a reply_, Simply WebSocket helps you maintain two-way communication between the client(in my case React app) and the Server.

## Why did I need WebSocket 

I worked on a project that required me sending a ping to the server every 30 seconds to tell the server that the application was still online and also keep track of a user that is logged on to the application and the duration they have been online. I don't want to go into too many details about that but I needed to constantly "communicate" with the server and using REST API's for that would have been inefficient.

## Basic Setup for React

Usually, I try to use only one instance of WebSocket high up my component tree then pass it down to other components that need to use the WebSocket instance to either listen or send messages to the server; this is assuming that you listening to a particular WebSocket instance in your child components.


```javascript
class Main extends Component {
    ......

    // instance of websocket connection as a class property
    ws = new WebSocket('ws://localhost:3000/ws')

    componentDidMount() {
		this.ws.onopen = () => {
        // on connecting, do nothing but log it to the console
        console.log('connected')
        }

        this.ws.onmessage = evt => {
        // listen to data sent from the websocket server
        const message = JSON.parse(evt.data)
        this.setState({dataFromServer: message})
        console.log(message)
        }

        this.ws.onclose = () => {
        console.log('disconnected')
        // automatically try to reconnect on connection loss

        }

    }

    render(){
        <ChildComponent websocket={this.ws} />
    }
}

```

In the snippet above I called it `Main` component because I assumed it should be like a parent to the child components that need to use the WebSocket instance. First of all, we create a new instance of the WebSocket as a class property `ws`. Then in the `componentDidMount` method we can subscribe and listen to some events provided to us by WebSocket.

- `onopen` : The onopen event listener is called when the WebSocket connection is established.
- `onmessage`: The onmessage event is sent when data is received from the server.
- `onclose` : The onclose listener is called when the WebSocket connection is closed.

So all these are set up in the `componentDidMount` because we want these event listeners available when the component is rendered in the DOM. Also, we can pass the instance of the WebSocket as props to the child component as we did in the `<ChildComponent/>` so we could listen to any event on that WebSocket instance without having to create a new instance in every component we need to use that WebSocket in.

But there is a problem with this setup, once there is an error or the WebSocket connection closes for some reason i.e server is down or network issues e.t.c The connection won't be reestablished until you the `componentDidMount` is called again maybe through a refresh of that page. And I don't think this is what we want.


## Advanced Setup

This setup was adapted from two StackOverflow answers, [How to reconnect to WebSocket after close connection](https://stackoverflow.com/questions/3780511/reconnection-of-client-when-server-reboots-in-websocket/37038217#37038217) and [WebSocket: How to automatically reconnect after it dies](https://stackoverflow.com/questions/22431751/websocket-how-to-automatically-reconnect-after-it-dies).


```javascript
class Main extends Component {
	constructor(props) {
		super(props);

		this.state = {
			ws: null
		};
	}

	// single websocket instance for the own application and constantly trying to reconnect.

	componentDidMount() {
		this.connect();
	}

	timeout = 250; // Initial timeout duration as a class variable

	/**
	 * @function connect
	 * This function establishes the connect with the websocket and also ensures constant reconnection if connection closes
	 */
	connect = () => {
		var ws = new WebSocket("ws://localhost:3000/ws");
		let that = this; // cache the this
		var connectInterval;

		// websocket onopen event listener
		ws.onopen = () => {
			console.log("connected websocket main component");

			this.setState({ ws: ws });

			that.timeout = 250; // reset timer to 250 on open of websocket connection 
			clearTimeout(connectInterval); // clear Interval on on open of websocket connection
		};

		// websocket onclose event listener
		ws.onclose = e => {
			console.log(
				`Socket is closed. Reconnect will be attempted in ${Math.min(
					10000 / 1000,
					(that.timeout + that.timeout) / 1000
				)} second.`,
				e.reason
			);

			that.timeout = that.timeout + that.timeout; //increment retry interval
			connectInterval = setTimeout(this.check, Math.min(10000, that.timeout)); //call check function after timeout
		};

		// websocket onerror event listener
		ws.onerror = err => {
			console.error(
				"Socket encountered error: ",
				err.message,
				"Closing socket"
			);

			ws.close();
		};
	};

	/**
	 * utilited by the @function connect to check if the connection is close, if so attempts to reconnect
	 */
	check = () => {
		const { ws } = this.state;
		if (!ws || ws.readyState == WebSocket.CLOSED) this.connect(); //check if websocket instance is closed, if so call `connect` function.
	};

	render() {
		return <ChildComponent websocket={this.state.ws} />;
	}
}
```

The advanced setup above simply ensures the WebSocket is always trying to connect if the server goes down or if there is network failure, so whenever the server is back up the client is reconnected.

I will run through what this setup does, the `connect` method is called to initiate the WebSocket connection in the `componentDidMount`. A class property called `timeout` is declared and set to 250ms then we have two functions `connect` and `check` I will go into details about what these functions do.

- `check` - This function is used to check if there is no WebSocket instance or the WebSocket connection is closed, if so the `connect` function is called.

- `connect` - This function is basically managing the WebSocket connection, here we listen to the `onopen`, `onclose` and `onerror` events. In the `onopen` listener, the websocket instance is added to the state so it could be passed as props to child components that want to listen to it. Then the timeout variable is set back `250ms` and the setInterval is cleared.

In the `onclose` listener the timeout value is increased and the `check` function is called in a setTimeout with the incremented timeout value, once the timeout value becomes greater than 10000ms(10 seconds) it stops incrementing. I did this to prevent aggressive attempts to reconnect to the server, instead it delays for a given period before it tries to reconnect.

There are libraries that help you achieve this like [ReconnectingWebSocket](https://github.com/joewalnes/reconnecting-websocket) but this library and my setup don't implement the Exponential Backoff algorithm which helps manage server flood when a lot of clients are trying to reconnect to the server. A library called [@gamestdio/websocket](https://github.com/gamestdio/websocket) implements the Exponential Backoff, so you could use it if you are dealing with a large number of client applications.

## Sending a message with the WebSocket

There is gotcha in this advanced setup being that when the WebSocket connection is closed `onclose` listener the WebSocket instance is might be set to `null` for some moments, the reason for this is to ensure we don't open a new WebSocket instance anytime the connection is closed and it opens again. The problem here is that if you try to send data to the server when the websocket instance is null it might break your application, so how do we solve this? The answer is to use try catch block anywhere you need to send data in your components.

```javascript


class ChildComponent extends Component {

	sendMessage=()=>{
		const {websocket} = this.props // websocket instance passed as props to the child component.

		try {
			websocket.send(data) //send data to the server
		} catch (error) {
			console.log(error) // catch error
		}
	}
	render() {
		return (
			<div>
				........
			</div>
		);
	}
}

export default ChildComponent;
```

### Conclusion

I hope this tutorial helps you setup WebSockets in your react application because that was my motivation to write this post.