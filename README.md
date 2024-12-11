## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Assumptions and Shortcuts

##### I took the following shortcuts to meet the time constraint of the project
* I did not add a lot of styling to the message board layout. 
* I did not use a global state management tool like React.Context to store the logged in user's information and instead just stored the userId and jwt-token in localstorage
* I did not cover a lot of the functionality in the 'If You Have Extra Time' section besides the logout functionality as I think the logout button will help with application testing
* I did not create interfaces nor add types for the variables I used