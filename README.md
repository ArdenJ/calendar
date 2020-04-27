# React/Apollo Calendar

tldr: this is a to-do list attached to some form of calendar

## Getting Started

The setup is currently a little fiddly. After cloning the repo, open the project and install dependencies in the root and client. Then:

First terminal:

```
cd .. //back into root
npm run dev //build dist
```

Second terminal:

```
npm run development //runs the mock database (3001), apollo server (4000), and client (3000). Allow some time for the project to open.
```

A live demo of the project will be available on Codesandbox [here](#). Until then the still below links to a short demo video!

[![Project as of 02 Feb](./images/27Apr.jpg)](https://drive.google.com/file/d/1eiy_-kSahI7kw28D-icBHoDfMv2voY3T/preview)

## At present:

- On load the calendar renders displaying the correct month ✅
- Individual date cards contain a list of events ✅
- Clicking on an individual card will populate the summary with the date and any existing events ✅
- New events can be added to the list by using the input ✅
- Events can be removed from the list by pressing the cross ✅
- Clicking the home button returns to the present month ✅
- Events can be updated using the pencil button ✅

## Todos

- Make the project more friendly to different screen sizes 
- test on something other than Chrome
- update component composition to avoid prop drilling (looking at you themeHook)
- Make interactions more interesting
- Tidy up typescript (remove lazy 'anys')
- Accessibility!
    - Most HTML elements are semantic but as the project has changed the flow is a little skewed.
    - Focus on event list when drawer opens 
        - and then on close, make sure focus returns to the Card that opened the drawer

[mobile ui plan](https://excalidraw.com/#json=5189794522988544,rlBA6Yad0hDKROXslnmRPg)

## Built With

- [React](https://reactjs.org/) - The Js framework used
- [TypeScript](https://www.typescriptlang.org/docs/home.html) - Strong typing
- [Styled-Components](https://styled-components.com/) - CSS in Js
- [Apollo](https://www.apollographql.com/docs/) - GraphQL data layer
- [Json-Server](https://www.npmjs.com/package/json-server) - A library that
  mocks a simple database using a JSON file
- [Webpack](https://webpack.js.org/) - bundling the Apollo Server
- [Jest](https://jestjs.io/docs/en/getting-started) - Testing
- [Testing-Library](https://testing-library.com/docs/intro) - for testing React
  components in the DOM

## Acknowledgements

The listed articles/projects/tutorials have each helped me with this project one
way or another:

- [How to Use React Context Effectively](https://kentcdodds.com/blog/how-to-use-react-context-effectively) 
- [Setting up Webpack with Apollo-Server and Typescript](https://medium.com/free-code-camp/build-an-apollo-graphql-server-with-typescript-and-webpack-hot-module-replacement-hmr-3c339d05184f) -
  This tutorial was fairly comprehensive and helped clear up a whole bunch of questions.
