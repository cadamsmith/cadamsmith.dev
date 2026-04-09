<script lang="ts">
	import { onMount } from 'svelte';
	import L from 'leaflet';
	import 'leaflet/dist/leaflet.css';

	let mapContainer: HTMLDivElement;

	onMount(() => {
		const map = L.map(mapContainer, {
			center: [32.60986, -85.48059],
			zoom: 12,
			scrollWheelZoom: false
		});

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			minZoom: 0,
			maxZoom: 20,
			maxNativeZoom: 19,
			attribution: '&copy; OpenStreetMap contributors'
		}).addTo(map);

		L.marker([32.60986, -85.48059]).addTo(map);
	});
</script>

<div bind:this={mapContainer} style="width: 100%; height: 100%;"></div>
