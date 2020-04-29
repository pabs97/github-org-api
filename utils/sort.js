function sortRepos(reposList, sortKey) {
  switch (sortKey) {
    case 'name':
      reposList.sort((a, b) => b[sortKey].toLowerCase() < a[sortKey].toLowerCase() ? 1 : -1);
      break;
    case 'stargazers_count':
    case 'forks_count':
    case 'watchers_count':
      reposList.sort((a, b) => b[sortKey] - a[sortKey]);
      break;
    default:
      break
  }
}

module.exports.sortRepos = sortRepos;
