## Prerequisites

Before running the application, ensure the following tools are installed on your system:

- Node.js
- npm
- git

## Steps to Run the Application

1. Clone the Repository

```bash
git clone https://github.com/agluck2920/stellar-coding-challenge.git
```

2. Navigate to the Project Directory

```bash
cd stellar-coding-challenge
```

3. Install Dependencies

```bash
npm install
```

4. Start the Development Server

```bash
npm run dev
```

## Assumptions and Shortcuts

##### I took the following shortcuts to meet the time constraint of the project
* I did not add a lot of styling to the message board. 
* I did not use a global state management tool like React.Context to store the logged in user's information and instead just stored the userId and jwt-token in localstorage
* I did not cover a lot of the functionality in the 'If You Have Extra Time' section besides the logout functionality as I think the logout button will help with application testing
* I did not create interfaces nor add types for the variables I used