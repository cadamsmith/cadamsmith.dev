<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { Marker, GeoJSON, LeafletMap, TileLayer } from 'svelte-leafletjs';
	import type { GeoJSONOptions, MapOptions, TileLayerOptions } from 'leaflet';
	import 'leaflet/dist/leaflet.css';

	let leafletMap: LeafletMap;
	let mapOptions: MapOptions;
	let tileLayerOptions: TileLayerOptions;
	let geoJsonOptions: GeoJSONOptions;
	let tileUrl: string;

	onMount(() => {
		if (!browser) return;

		mapOptions = {
			center: [32.60986, -85.48059],
			zoom: 12,
			scrollWheelZoom: false
		};

		tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

		tileLayerOptions = {
			minZoom: 0,
			maxZoom: 20,
			maxNativeZoom: 19,
			attribution: '© OpenStreetMap contributors'
		};

		geoJsonOptions = {
			style: function (geoJsonFeature) {
				console.log('style', geoJsonFeature);
				return {};
			},
			onEachFeature: function (feature, layer) {
				console.log('onEachFeature', feature, layer);
			}
		};
	});
</script>

<div class="example" style="width: 100%; height: 100%;">
	{#if mapOptions}
		<LeafletMap bind:this={leafletMap} options={mapOptions}>
			<TileLayer url={tileUrl} options={tileLayerOptions} />
			<GeoJSON options={geoJsonOptions} />
			<Marker latLng={[32.60986, -85.48059]}></Marker>
		</LeafletMap>
	{/if}
</div>
