import { svgToPath } from './svg_to_path';

const url = 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/';
const cache = {};
const fallback = '';

const getSlugPath = async (slug) => {
  if (!cache[slug]) {
    try {
      const urlSlug = `${url}${slug}.svg`;
      const res = await fetch(urlSlug, { cache: 'force-cache' });
      const text = await res.text();
      const path = svgToPath(text);
      cache[slug] = path;
    } catch (e) {}
  }

  if (cache[slug]) {
    return cache[slug];
  }

  return fallback;
};

export const getSlugsPath = async (slugs) => {
  const map = {};
  slugs.forEach((s) => {
    map[s] = s;
  });
  await Promise.all(Object.keys(map).map(getSlugPath));
  return slugs.map((slug) => ({
    slug,
    path: cache[slug] ?? fallback,
  }));
};
