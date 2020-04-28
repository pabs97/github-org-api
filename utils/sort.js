const SORT_TYPES = ['name', 'stargazers_count', 'forks_count', 'watchers_count'];

function sortRepos(reposList, sortKey) {
  if (!SORT_TYPES.includes(sortKey)) return reposList;
  reposList.sort((a, b) => b[sortKey] - a[sortKey]);
  return reposList;


  // switch (sorKey) {
  //   case 'alphabetical':
  //     reposList.sort((a, b) => b[sortKey] - a[sortKey]);
  //     break;
  //   case 'stargazers_count':
  //   case 'forks_count':
  //   case 'watchers_count':
  //     reposList.sort((a, b) => b[sortKey] - a[sortKey]);
  //     break;
  //   default:
  //     break
  // }

  // return resposList;
}

module.exports.sortRepos = sortRepos;