# React/Apollo Calendar

tldr: this is a to-do list attached to some form of calendar

## Getting Started

The setup is currently a little fiddly. After cloning the repo, open the project
and run 'npm i' in the root directory. Then cd into the client and run npm i
again. THEN:

First terminal:

```
cd .. //back into root
npm run dev //build dist
```

Second terminal:

```
npm run jsonserv //runs the mock database on 3001
```

Third terminal:

```
npm run start //runs the graphql endpoint on 4000
```

Fourth (final) terminal:

```
cd client
npm start //starts the client on 3000
```

A live demo of the project can be viewed on Codesanbox [here](#).

## Minimum requirements

- On loading the app renders a calendar displaying the present month with any
  events rendered on the appropriate date
- As a usher I can navigate between months using the UI
- As a user I can Create, Read, Update, and Delete events via the the UI

## To Dos

- So so many

## Built With

- [React](https://reactjs.org/) - The web framework used
- [TypeScript](#) - Strong typing
- [Styled-Components](https://styled-components.com/) - CSS in Js
- [Apollo](#) - GraphQl data layer
- [Json-Server](#) - mocks a simple database using a JSON file
