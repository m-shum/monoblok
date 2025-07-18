const _METHOD = {
  GET: 'get',
  DELETE: 'delete',
  POST: 'post',
  PUT: 'put',
} as const;

type ObjectValues<T> = T[keyof T];
type Method = ObjectValues<typeof _METHOD>;

export default Method;

export const STORYBLOK_AGENT = 'SB-Agent';

export const STORYBLOK_JS_CLIENT_AGENT = {
  defaultAgentName: 'SB-JS-CLIENT',
  defaultAgentVersion: 'SB-Agent-Version',
  packageVersion: '7.0.0',
};

export const StoryblokContentVersion = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
} as const;

export type StoryblokContentVersionKeys =
  typeof StoryblokContentVersion[keyof typeof StoryblokContentVersion];

export const StoryblokContentVersionValues = Object.values(
  StoryblokContentVersion,
) as StoryblokContentVersionKeys[];
