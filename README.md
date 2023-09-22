<img src="https://ordinarycoders.com/_next/image?url=https%3A%2F%2Fd2gdtie5ivbdow.cloudfront.net%2Fmedia%2Fimages%2Fcover_react_tailwind.png&w=1920&q=75"/>

# Frontend

### Tailwind
Why we chose [Tailwind](https://tailwindcss.com)
- You can use pre-built CSS classes for styling, which saves you the time and effort of writing custom CSS from scratch

### Components


In react we work with components. This is because we want no overlapping code. We can re-use these components to avoid overlapping code.

### FetchAPI
We use fetchAPI as our way to connect our frontend to our backend. 
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
