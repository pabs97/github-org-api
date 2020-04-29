const express = require('express');
const app = express();
const request = require('request');
const NodeCache = require('node-cache');
const cache = new NodeCache({ useClones: false });
const { promisify } = require('util');
const get = promisify(request.get);
const { sortRepos } = require('./utils/sort');

const GITHUB_API = `https://api.github.com`;
const PORT = 3001;
const TTL = 10 * 60 * 1000; // 10 minutes
const OPTIONS = { headers: { 'User-Agent': 'request' } };


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
  next();
});

app.get('/org/:org', async (req, res) => {
  console.log(req.params.org);
  const { org } = req.params;
  const { sortkey } = req.query;
  let reposList = cache.get(org);

  try {
    if (reposList) {
      console.log('fetching repos from cache...');
    } else {
      const reposEndpoint = `${GITHUB_API}/orgs/${org}/repos`;
      console.log('not in cache, requesting from', reposEndpoint);
      const response = await get(reposEndpoint, OPTIONS);
      reposList = JSON.parse(response.body);
      cache.set(org, reposList, TTL);
    }
    if (reposList.message === 'Not Found') reposList = [];

    sortRepos(reposList, sortkey);
    res.send(reposList);

  } catch (e) {
    res.send(e);
    throw e;
  }
});

app.get('/commits/:owner/:repo', async (req, res) => {
  console.log(req.params);
  const { owner, repo } = req.params;
  const repoKey = owner + '/' + repo;
  let commitsList = cache.get(repoKey);

  try {
    if (commitsList) {
      console.log('fetching commits from cache...');
    } else {

      const commitsEnpoint = `${GITHUB_API}/repos/${owner}/${repo}/commits`;
      console.log('not in cache, requesting from', commitsEnpoint);
      const response = await get(commitsEnpoint, OPTIONS);
      commitsList = JSON.parse(response.body);
      cache.set(repoKey, commitsList, TTL);
    }

    res.send(commitsList);
  } catch (e) {
    res.send(e);
    throw e;
  }
});

app.listen(PORT);
console.log(`started server on ${PORT}...`);
