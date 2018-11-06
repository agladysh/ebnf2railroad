const {
  searchReferencesFromIdentifier,
  searchReferencesToIdentifier
} = require("./references");

const createAlphabeticalToc = ast =>
  ast
    .filter(production => production.identifier)
    .map(production => production.identifier)
    .reduce((acc, item) => acc.concat(item), [])
    .filter((item, index, list) => list.indexOf(item) === index)
    .sort()
    .map(node => ({ name: node }));

const createPath = (production, ast, path) => {
  const leaf = {
    name: production.identifier
  };
  if (path.includes(leaf.name)) {
    leaf.recursive = true;
  } else {
    const subPath = path.concat(production.identifier);
    const children = searchReferencesFromIdentifier(
      production.identifier,
      ast
    ).map(child =>
      createPath(
        ast.find(production => production.identifier === child),
        ast,
        subPath
      )
    );
    if (children.length > 0) {
      leaf.children = children;
    }
  }

  return leaf;
};

const flatList = children =>
  children
    .map(child => [child.name].concat(flatList(child.children || [])))
    .reduce((acc, elem) => acc.concat(elem), []);

const createStructuralToc = ast => {
  const declarations = ast
    .filter(production => production.identifier)
    .map(production => production.identifier);

  const cleanRoots = ast
    .filter(production => production.identifier)
    .filter(
      production =>
        searchReferencesToIdentifier(production.identifier, ast).length === 0
    )
    .map(production => createPath(production, ast, []));

  const recursiveTrees = ast
    .filter(production => production.identifier)
    .map(production => createPath(production, ast, []))
    // Check if tree is recursive
    .filter(tree => flatList(tree.children || []).includes(tree.name))
    // Tree contained in a clean (non-recursive) root? remove.
    .filter(
      recursiveTree =>
        !cleanRoots
          .map(root => flatList(root.children || []))
          .some(list => list.includes(recursiveTree.name))
    )
    // The trees left are now
    // a -> b -> c -> a, vs.
    // b -> c -> a -> b, vs.
    // c -> a -> b -> c. Check which one is defined first, that one wins
    .filter((root, index, list) => {
      const childIndex = Math.min(
        flatList(root.children || [])
          .filter(node => node !== root.name)
          .map(node => list.map(p => p.name).indexOf(node))
          .filter(e => e !== -1)
      );
      return index < childIndex;
    });

  return cleanRoots
    .concat(recursiveTrees)
    .sort(
      (a, b) => declarations.indexOf(a.name) - declarations.indexOf(b.name)
    );
};

module.exports = {
  createAlphabeticalToc,
  createStructuralToc
};