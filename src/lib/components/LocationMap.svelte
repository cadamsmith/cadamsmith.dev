<script lang="ts">
	import { onMount } from 'svelte';
	import L from 'leaflet';
	import 'leaflet/dist/leaflet.css';

	const { initialCoordinates }: { initialCoordinates: { lat: number; lng: number } } =
		$props();

	let mapContainer: HTMLDivElement;

	onMount(() => {
		const map = L.map(mapContainer, {
			center: [initialCoordinates.lat, initialCoordinates.lng],
			zoom: 10,
			scrollWheelZoom: false
		});

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			minZoom: 0,
			maxZoom: 20,
			maxNativeZoom: 19,
			attribution: '&copy; OpenStreetMap contributors'
		}).addTo(map);

		const marker = L.marker([initialCoordinates.lat, initialCoordinates.lng]).addTo(map);

		window.addEventListener('location-change', (e) => {
			const { lat, lng } = (e as CustomEvent<{ lat: number; lng: number }>).detail;
			marker.setLatLng([lat, lng]);
			map.setView([lat, lng], 12);
		});
	});
</script>

<div bind:this={mapContainer} style="width: 100%; height: 100%;"></div>
