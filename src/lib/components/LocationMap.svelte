<script lang="ts">
	import { onMount } from 'svelte';
	import L from 'leaflet';
	import 'leaflet/dist/leaflet.css';

	const { initialCoordinates }: { initialCoordinates: { lat: number; lng: number } } =
		$props();

	let mapContainer: HTMLDivElement;

	onMount(() => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		delete (L.Icon.Default.prototype as any)._getIconUrl;
		L.Icon.Default.mergeOptions({
			iconUrl: '/leaflet/marker-icon.png',
			iconRetinaUrl: '/leaflet/marker-icon-2x.png',
			shadowUrl: '/leaflet/marker-shadow.png'
		});

		const map = L.map(mapContainer, {
			center: [initialCoordinates.lat, initialCoordinates.lng],
			zoom: 12,
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
			map.panTo([lat, lng]);
		});
	});
</script>

<div bind:this={mapContainer} style="width: 100%; height: 100%;"></div>
