import type { SvelteComponent } from "svelte";

export interface MarkdownModule {
    default: SvelteComponent;
    metadata: { [key: string]: string | number | boolean | undefined };
}
