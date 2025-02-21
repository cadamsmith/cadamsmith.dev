import type { None } from './None';
import type { Some } from './Some';

export type Option<T> = Some<T> | None;
