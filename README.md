# Standup-manager

`standup-manager` is a small React web app I created as part of work experience with the software development team at Audio Network.

## Goals

The purpose of this project was to provide an easy-to-use interface for managing standup meetings over a video call.

### The problem

Since the covid lockdowns, many more of the standup meetings between ANW team members happened paritally or entirely over Microsoft Teams. This presented a problem: under normal circumstances, the order of speaking in a meeting is clear - you go (anti-)clockwise from the person who starts. On a video call, however, there is no obvious order in which people should speak and this leads to wasted time while people decide who should speak next.

### The solution

The way `standup-manager` works is extremely simple: it generates a list based on user input of names, and randomises it. Some other functionality is provided for convenience, e.g. a copy button to copy the list to the clipboard.

## Running locally

In the project directory, you can run `npm start` to run in development mode on [http://localhost:3000](http://localhost:3000), or `npm run build` to build for production in the `build` folder.

`npm test` launches the test runner in watch mode.
