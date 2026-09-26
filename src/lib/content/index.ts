import { en } from './en';
import { ko } from './ko';
import type { Lang, Resume } from './types';

export { profile } from './profile';

export const content: Record<Lang, Resume> = { ko, en };
