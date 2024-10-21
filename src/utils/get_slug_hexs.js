import { addHash } from './add_hash';
import { getSlug } from './getSlug';

const url =
  'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/_data/simple-icons.json';
let cache;
const fallback = '#000';

const primeCache = async () => {
  if (!cache) {
    try {
      const res = await fetch(url, { cache: 'force-cache' });
      const json = await res.json();
      cache = {};
      json.icons.forEach((icon) => {
        const iconSlug = getSlug({ title: icon.title });
        cache[iconSlug] = {
          hex: addHash(icon.hex ?? fallback),
          title: icon.title,
          slug: iconSlug,
        };
      });
    } catch (e) {
      console.error(e);
    }
  }
};

export const getSlugHexs = async (slugs) => {
  await primeCache();
  return {
    hexs: slugs.map((slug) => ({
      slug,
      hex: cache ? cache[slug]?.hex ?? fallback : fallback,
      title: cache ? cache[slug]?.title ?? 'icon' : 'icon',
    })),
    cache,
  };
};
