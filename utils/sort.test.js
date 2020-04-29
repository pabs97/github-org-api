const { sortRepos } = require('./sort');

const reposList = [
  { name: 'beta', stargazers_count: 10 },
  { name: 'alpha', stargazers_count: 30 },
  { name: 'delta', stargazers_count: 20 },
];

describe('Sorting functions for repo lists', () => {
  let testList;

  beforeEach(() => {
    testList = reposList.map(repo => ({ ...repo }));
  });

  test('alphabetical sort', () => {
    sortRepos(testList, 'name');

    expect(testList[0].name).toBe('alpha');
    expect(testList[1].name).toBe('beta');
    expect(testList[2].name).toBe('delta');
  });

  test('numerical sort', () => {
    sortRepos(testList, 'stargazers_count');

    expect(testList[0].stargazers_count).toBe(30);
    expect(testList[1].stargazers_count).toBe(20);
    expect(testList[2].stargazers_count).toBe(10);
  });
});