<img src="https://ordinarycoders.com/_next/image?url=https%3A%2F%2Fd2gdtie5ivbdow.cloudfront.net%2Fmedia%2Fimages%2Fcover_react_tailwind.png&w=1920&q=75"/>

# Frontend


### Tailwind
Why we chose [Tailwind](https://tailwindcss.com)
- You can use pre-built CSS classes for styling, which saves you the time and effort of writing custom CSS from scratch

### Components


In react we work with components. This is because we want no overlapping code. We can re-use these components to avoid overlapping code.

### FetchAPI
We use fetchAPI as our way to connect our frontend to our backend. 

## What is FetchAPI?
The Fetch API provides a JavaScript interface for accessing and manipulating parts of the protocol, such as requests and responses. It also provides a global fetch() method that provides an easy, logical way to fetch resources asynchronously across the network.

Unlike XMLHttpRequest that is a callback-based API, Fetch is promise-based and provides a better alternative that can be easily used in service workers. Fetch also integrates advanced HTTP concepts such as CORS and other extensions to HTTP. (Using the Fetch API - Web APIs | MDN, 2023)[^1]

## How we use FetchAPI

We use FetchAPI to gather data from our backend to display at our frontend. In the codeblock you can see how we do this.
```javascript
useEffect(() => {
    fetch("http://127.0.0.1:5000/journey/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setJourneyData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);
```

### Sources
[^1]: Using the Fetch API - Web APIs | MDN. (2023, August 18). Retrieved September 22, 2023, from https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
