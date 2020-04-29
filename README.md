# github-org-api

This is the caching component for this project https://github.com/pabs97/github-org-app
Set this up first before running the web app component

This is a middleware cache for getting repo and commits requests from the github api. The results are cached for performance and for more complex data manipulation such as sorting.

## Setup
2. Clone this repo 
```
git clone git@github.com:pabs97/github-org-api.git
```
3. Install it 
```
npm i
```
4. Start
```
npm start
```

## Available Endpoints
### /:org?sortkey=:sortkey
This will return a list of repos for the given org, and sort them by the sortkey

Example: http://localhost:3001/org/netflix?sortkey=name

### /commits/:org/:repo
This will return a list of recent commits for the given org and repo

Example: http://localhost:3001/commits/Netflix/aminator

## Available Scripts

In the project directory, you can run:

### `npm start`
Starts the server

### `npm test`
Runs the Jest tests


## TODO
- [x] sorting not working
- [ ] more unit tests
- [ ] caching the whole org's repos
- [ ] better caching naming
