// utils/categoryHelpers.js
export const flattenCategoryTree = (cats, prefix = '') => {
  return cats.reduce((acc, cat) => {
    const label = prefix ? `${prefix} > ${cat.name}` : cat.name;
    acc.push({ id: cat.id, name: label });
    if (cat.children && cat.children.length > 0) {
      acc.push(...flattenCategoryTree(cat.children, label));
    }
    return acc;
  }, []);
};
