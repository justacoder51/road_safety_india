// Every bundled file stays under Vite's deployment base, including project Pages sites.
export const assetUrl = path => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
