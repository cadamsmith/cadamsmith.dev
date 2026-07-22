// Minimal typings for the subset of the YouTube IFrame Player API we use.
// https://developers.google.com/youtube/iframe_api_reference

export interface YTPlayer {
	loadVideoById(videoId: string): void;
	cueVideoById(videoId: string): void;
	playVideo(): void;
	pauseVideo(): void;
	destroy(): void;
}

export interface YTStateChangeEvent {
	data: number;
}

export interface YTPlayerOptions {
	videoId?: string;
	width?: string | number;
	height?: string | number;
	playerVars?: Record<string, number | string>;
	events?: {
		onReady?: () => void;
		onStateChange?: (event: YTStateChangeEvent) => void;
	};
}

export interface YTNamespace {
	Player: new (element: HTMLElement | string, options: YTPlayerOptions) => YTPlayer;
	PlayerState: {
		UNSTARTED: number;
		ENDED: number;
		PLAYING: number;
		PAUSED: number;
		BUFFERING: number;
		CUED: number;
	};
}

declare global {
	interface Window {
		YT?: YTNamespace;
		onYouTubeIframeAPIReady?: () => void;
	}
}
