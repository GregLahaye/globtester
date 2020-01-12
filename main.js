const minimatch = require('minimatch');

/*
const array = [
  '/myapp/readme.md',
  '/myapp/config/staging.js',
  '/myapp/config/production.js',
  '/myapp/src/services/utils.js',
  '/myapp/src/services/timezone.ts',
  '/myapp/src/controllers/health.js',
  '/myapp/src/controllers/user.module.ts',
  '/myapp/assets/logo.png',
  '/myapp/assets/logo_small.png',
  '/myapp/assets/favicon.ico',
  '/file',
  '/folder/',
];
*/


function recurse(glob, tree, parentList, parentPath) {
  for (const key of Object.keys(tree)) {
    const item = $('<li>' + key + '</li>');
    parentList.append(item);

    const currentPath = [...parentPath, key];

    if (Object.keys(tree[key]).length) {
      const currentList = $('<ul></ul>');
      parentList.append(currentList);

      recurse(glob, tree[key], currentList, currentPath);
    } else if (key) {
      const pathString = currentPath.join('/');
      if (minimatch(pathString, glob)) {
        $(item).addClass('match');
      }
    }
  }
}

function f() {
  const glob = $('#glob').val();
  const paths = $('#editor').val().split('\n');
  if (glob !== '' && paths.length > 0) {
    const tree = {};
    paths.forEach(p => p.split('/').reduce((o, k) => o[k] = o[k] || {}, tree));
    $('.root').empty();
    recurse(glob, tree, $('.root'), []);
  }
}

$('#glob').on('input', (e) => {
  f();
});

$('#editor').on('input', (e) => {
  f();
});

