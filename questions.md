# Part 2

1. **What is the difference between Component and PureComponent? Give
an example where it might break my app.**
- The main difference between the two is that a PureComponent can help prevent unnecessary re-renders, because it skips rendering when the props and state haven't changed. This can improve the performance of your app, especially when dealing with large or complex components. 
However, there are situations where using a PureComponent might not be appropriate, and can potentially break your app. For example, if you have a component that depends on mutable data such as an array or object, the shallow comparison performed by the PureComponent might not catch changes that occur within that data structure. In that case, you might need to use a regular Component and implement a custom shouldComponentUpdate() method that performs a deep comparison of the data. 
- Another situation where using a PureComponent might be problematic is when using certain third-party libraries that rely on modifying props or state directly. If these modifications are not picked up by the PureComponent's shallow comparison, it could result in incorrect behavior or bugs in your app.

2. **Context + ShouldComponentUpdate might be dangerous. Why is that?**
- Using shouldComponentUpdate in a component that depends on context can be dangerous. shouldComponentUpdate is a lifecycle method that is called before a component is re-rendered, and it returns a boolean value indicating whether the component should update or not. If the method returns false, the component will not update. 
- If a component that depends on context uses shouldComponentUpdate, it may not update when the context data changes, even if the new data should cause a re-render. This can result in outdated or incorrect data being displayed in the component, which can break the app.

3. **Describe 3 ways to pass information from a component to its PARENT.**
- Callback functions: The child component can pass data to its parent component through a callback function. The parent component can pass a function as a prop to the child component, which can then be invoked by the child to send data back to the parent. 
- Props drilling: In props drilling, the parent component passes props down to the child component, which can then pass them down to its own child components. This can be a useful way to pass data through multiple levels of components. However, it can become cumbersome if there are too many levels of nesting. 
- React Context: Context allows you to pass data down the component tree without having to manually pass props through every level. Context provides a way to share values like these between components without having to explicitly pass a prop through every level of the tree. 

4. **Give 2 ways to prevent components from re-rendering.**
- React.memo. React.memo is a higher-order component that you can use to memoize the result of a component based on its props.
- shouldComponentUpdate. If you have a component with many child components, you can use shouldComponentUpdate in the child components to prevent them from re-rendering when their props haven't changed.

5. **What is a fragment and why do we need it? Give an example where it might break my app.**
- A fragment is a built-in feature in React that allows you to group a list of children without adding extra nodes to the DOM. It's useful when you want to return multiple elements from a component, but you don't want to add a wrapper element around them.
- However, there are some cases where using a fragment might break your app. For example, if you're using a CSS selector to target a specific child element, a fragment might prevent the selector from working correctly. Additionally, if you're using a third-party library that expects a specific structure of elements, using a fragment might break the library's functionality.

6. Give 3 examples of the HOC pattern.
- Authentication HOC: This HOC is used to protect a component by requiring the user to be authenticated before accessing it. It takes a component as a parameter and returns a new component that checks if the user is authenticated before rendering the original component. If the user is not authenticated, the HOC can redirect the user to a login page or display an error message.

- Redux HOC: This HOC is used to connect a component to the Redux store. It takes a component as a parameter and returns a new component that can access the Redux state and dispatch actions. The HOC also subscribes to the Redux store, so any updates to the state will cause the component to re-render.

- Logging HOC: This HOC is used to add logging functionality to a component. It takes a component as a parameter and returns a new component that logs various events, such as when the component is mounted, updated, or unmounted. This can be useful for debugging and performance monitoring.

7. **What's the difference in handling exceptions in promises, callbacks
and async...await?**
- When using promises, you can handle exceptions by attaching a .catch() method to the end of the promise chain. Any exception that occurs in the chain will propagate to the first .catch() method.
- When using callbacks, you can pass an error object as the first argument to the callback function.
- When using async/await, you can use a try/catch block to handle exceptions. Any exception thrown within the async function will propagate to the first catch block.

8. **How many arguments does setState take and why is it async.**
- In React, setState is used to update a component's state. It takes an object or a function that returns an object as an argument. When an object is passed, it merges the new state with the previous state. When a function is passed, it receives the previous state and props as arguments and returns an object that represents the new state. The function signature for setState is: setState(updater[, callback]). The updater argument is either an object or a function that returns an object. The callback argument is an optional function that will be executed after the state has been updated.
- The reason why setState is asynchronous is that React batches state updates for performance reasons. This means that if you call setState several times in a row, React will merge all the updates into a single update and re-render the component only once. This batching mechanism allows React to optimize rendering and avoid unnecessary re-renders.

9. **List the steps needed to migrate a Class to Function Component.**
- Identify the state variables used in the Class component.
- Replace the state variables with the useState hook in the Function component.
- Replace lifecycle methods (such as componentDidMount or componentDidUpdate) with the useEffect hook.
- Replace any event handlers that use this with arrow functions.
- Remove the render method and return the JSX directly from the Function component.
- Remove the constructor method and any other unused methods.

10. **List a few ways styles can be used with components.**
- Inline styles
- CSS Modules
- CSS-in-JS
- CSS frameworks
- CSS preprocessors
11. **How to render an HTML string coming from the server.**
- To render an HTML string coming from the server, you can use the dangerouslySetInnerHTML prop in React. The dangerouslySetInnerHTML prop takes an object with a single key, __html, which is set to the HTML string that you want to render.