import { getSlugsPath } from './get_slugs_path';
import { getSlugHexs } from './get_slug_hexs';

export const fetchSimpleIcons = async ({ slugs }) => {
  const [paths, { hexs, cache }] = await Promise.all([
    getSlugsPath(slugs),
    getSlugHexs(slugs),
  ]);
  const map = {};
  hexs.forEach(hex => {
    map[hex.slug] = hex;
  });
  paths.forEach(path => {
    map[path.slug].path = path.path;
  });
  slugs.forEach(s => {
    const o = map[s];
    if (!o.hex || !o.path) {
      if (import.meta.env.NODE_ENV !== 'production') {
        console.error(
          `'react-icon-cloud/fetchSimpleIcons': the response of ${o.slug} was malformed and it will be ignored.`
        );
      }
      delete map[s];
    }
  });
  return {
    simpleIcons: map,
    allIcon: cache,
  };
};

export default fetchSimpleIcons;
