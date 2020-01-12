const minimatch = require('minimatch');

const defaultPatterns = `/myapp/readme.md
/myapp/config/staging.js
/myapp/config/production.js
/myapp/src/services/utils.js
/myapp/src/services/timezone.ts
/myapp/src/controllers/health.js
/myapp/src/controllers/user.module.ts
/myapp/assets/logo.png
/myapp/assets/logo_small.png
/myapp/assets/favicon.ico`;

const defaultGlob = '**/*.ts';

$('#patterns').val(defaultPatterns);
$('#glob').val(defaultGlob);

function updateTreeRecursive(glob, tree, parentList, parentPath) {
  for (const key of Object.keys(tree)) {
    const s = key ? key : '/';
    const item = $('<li>' + s + '</li>');
    parentList.append(item);

    const currentPath = [...parentPath, key];

    if (Object.keys(tree[key]).length) {
      const currentList = $('<ul></ul>');
      parentList.append(currentList);

      updateTreeRecursive(glob, tree[key], currentList, currentPath);
    } else if (key) {
      const pathString = currentPath.join('/');
      if (minimatch(pathString, glob)) {
        $(item).addClass('match');
      }
    }
  }
}

function updateTree() {
  const glob = $('#glob').val();
  const paths = $('#patterns')
    .val()
    .split('\n');
  $('#root').empty();
  const tree = {};
  paths.forEach((p) =>
    p.split('/').reduce((o, k) => (o[k] = o[k] || {}), tree)
  );
  updateTreeRecursive(glob, tree, $('#root'), []);
}

$('#glob').on('input', (e) => {
  updateTree();
});

$('#patterns').on('input', (e) => {
  updateTree();
});

updateTree();

