1. What is the difference between Component and PureComponent? Give an example where it might break my app.

The main difference between **Component** and **PureComponent** is the way they handle the shouldComponentUpdate lifecycle method.
Component does not implement shouldComponentUpdate and will re-render on every state/props update. The shouldComponentUpdate can be manually implemented.
PureComponent implements shouldComponentUpdate, and it only re-renders if there is a difference in state or props.
In PureComponent, the app might break because of the deeply nested state/props objects. It may happen that some updates are not detectable by shallow comparison and this will lead to not re-render when it actually should.

2. Context + ShouldComponentUpdate might be dangerous. Why is that?

When manually implementing the **shouldComponentUpdate** method in the component, you control whether the component should update or not depending on the state/props. However, shouldComponentUpdate does not detect changes in **context**. If the context value changes but the props and state do not, the component will not re-render and will not receive the updated context value.

3. Describe 3 ways to pass information from a component to its PARENT.

The most simple method is to create a **callback** function in the parent component and to pass it as a prop to the child. Then, the child component can call this function and pass some arguments inside.
Similar to the first example, you can create a react state in the parent component using useState hook, and pass the **set** function as a prop to the child.
Another way is more complex and suitable for cases when you need to avoid prop drilling. This method is about using the react **context**. In order to pass information from child to parent, first off all it should be created a context using createContext hook, then the child should be wrapped into the Provider component of the created context and also pass to the Provider component the value prop that can be either a callback function or a set function from the useState hook. Then, in the child component access the data from the context using the useContext hook and use the function to update the state in the parent component.

4. Give 2 ways to prevent components from re-rendering.

You can prevent a functional component from re-rendering by using the **React.memo** HOC. The component should be wrapped into the React.memo and it will be re-rendered only if its props will change.
In order to achieve this in a class component, you should use the **shouldComponentUpdate** lifecycle method. This method is called before re-render process and determines whether the component should re-render or not.

5. What is a fragment and why do we need it? Give an example where it might break my app.

Fragment is a special react **feature** that represents an empty element. It is useful when you need to wrap a piece of code but do not need an extra node in the DOM. In complex applications the fragment can help to improve the performance by reducing such extra nodes in the DOM.

6. Give 3 examples of the HOC pattern.

- **withDataFetching**: share common data-fetching logic across multiple components


    const withDataFetching = (WrappedComponent, url) => {
        return props => {
            const [data, setData] = useState(null);
        
            // fetch the url and call setData(data)
        
            return <WrappedComponent data={data} {...props} />;
        };
    };



- **withFormFieldHandling**: manage state for the input fields and handle changes


    const withFormFieldHandling = (WrappedComponent) => {
        return props => {
            const [fields, setFields] = useState({});

            const handleChange = (event) => {
                // call setFields() and pass event.target.value for each field
             };

            return (
              <WrappedComponent
                {...props}
                fields={fields}
                handleChange={handleChange}
                />
            );
        };
    };

- **withAuthentication**: check if a user is authenticated and render the component accordingly


    const withAuthentication = WrappedComponent => {
        return props => {
            const isAuthenticated = /* some logic to check if user is authenticated */;

            if (!isAuthenticated) {
              // Redirect or return null
            }

        return <WrappedComponent {...props} />;
        };
    };


7. What's the difference in handling exceptions in promises, callbacks and async...await?

In **callbacks** functions, the errors should be manually checked at the beginning of the callback function.
For example:

    const getData = (callback) => {
        someAsyncOperation((err, data) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, data);
        });
    }


    getData((err, data) => {
        if (err) {
            console.error('error:', err);
            return;
        }
        console.log(‘data:', data);
    });


In **promises**, errors are handled by using the .catch() method, which catches any errors that occur in any .then() called before it.

    const getData = () => {
        return new Promise((resolve, reject) => {
            someAsyncOperation((err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(data);
            });
        });
    }

    getData()
    .then(data => console.log('data:', data))
    .catch(err => console.error('error:', err));

In **async/await**, errors can be catched by using try/catch blocks.

    const getData = async () => {
        try {
            const data = await someAsyncFunction();
            console.log('data:', data);
        } catch (err) {
            console.error('error:', err);
        }
    }

    getData();  

8. How many arguments does setState take and why is it async.

The setState method in class components can take one or two arguments. First argument is **state update** that can be an object or a function that represents or computes the new state.
The second argument is an **optional callback** function that gets executed after the state has been updated and the component has re-rendered.
In react, the state is async because of performance reasons. React waits and updates the states of all components together in a single batch at the end of the event loop.

9. List the steps needed to migrate a Class to Function Component.

- Change the class initialization into a function initialization and pass the props as arguments
- Convert state into useState hook
- Convert all lifecycle methods into its analogue hooks (if they are)
- Convert refs to useRef hook
- Convert Context to useContext hook
- Convert instance methods into functions

10. List a few ways styles can be used with components.

One popular (but not personally preferable) way is to use **inline styles**. This requires passing styles as a string/object to the style attribute of the component.
For example: 

    <div style={{ width: '100%' }}>

Another way is to use **css stylesheets**. It is a traditional way of styling. This requires creating a .css file that contains css selectors. Import the stylesheet into the component file, apply styles by giving the className/id attributes of elements.

My most preferred method is to use **css modules**. It allows to style the component but with a scope limited to the component itself, avoiding global scope. In order to use css modules, you should create a css file named like [component_name].module.css, that contains css selectors. After, just import the module into the component file.
For better performance and more features use **sass/scss**. This can add such features like variables, nesting, mixins, inheritance, etc. After preprocessing, it compiles down to standard css.

I have also been experienced with **styled components**. It is a library that allows writing css in js and can be used for building custom components.
For example:

    import styled from 'styled-components';

    const StyledDiv = styled.div`
        width: '100%'
    `;

    const MyComponent = () => {
        return <StyledDiv>Hello, Deel!</StyledDiv>;
    }

11. How to render an HTML string coming from the server.

You can pass the html string into the attribute **dangerouslySetInnerHTML** provided by react.
For example:

    <div dangerouslySetInnerHTML={{ __html: htmlString }} />.

Also, in one of my pet projects I used the **html-react-parser** library because I needed a fast solution and because this dependency was not critical for the app bundle.


