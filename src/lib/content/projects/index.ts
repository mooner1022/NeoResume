import type { Lang, Project, ProjectDetail } from '../types';
import { agora } from './agora';
import { amoa } from './amoa';
import { hanriv } from './hanriv';
import { site } from './site';
import { starlight } from './starlight';

/** long-form content for /projects/<id>/, one file per project */
export const details: Record<Project['id'], Record<Lang, ProjectDetail>> = { amoa, agora, hanriv, starlight, site };
