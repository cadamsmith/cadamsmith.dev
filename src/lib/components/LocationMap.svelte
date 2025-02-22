<script lang="ts">
    import {onMount} from 'svelte';
    import {browser} from '$app/environment';
    import {CircleMarker, GeoJSON, LeafletMap, TileLayer} from 'svelte-leafletjs';
    import type {GeoJSONOptions, MapOptions, TileLayerOptions} from 'leaflet';
    import 'leaflet/dist/leaflet.css';

    let leafletMap: LeafletMap;
    let mapOptions: MapOptions;
    let tileLayerOptions: TileLayerOptions;
    let geoJsonOptions: GeoJSONOptions;
    let tileUrl: string;

    onMount(() => {
        if (!browser) return;

        mapOptions = {
            center: [1.250111, 103.830933],
            zoom: 13,
        };
        
        tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
        
        tileLayerOptions = {
            minZoom: 0,
            maxZoom: 20,
            maxNativeZoom: 19,
            attribution: "© OpenStreetMap contributors",
        };

        geoJsonOptions = {
            style: function (geoJsonFeature) {
                console.log('style', geoJsonFeature);
                return {};
            },
            onEachFeature: function (feature, layer) {
                console.log('onEachFeature', feature, layer);
            },
        };

        /* if (leafletMap) {
            const map = leafletMap.getMap();
            if (map) {
                map.fitBounds([[1.266835, 103.796403], [1.232988, 103.854861]]);
            }
        } */
    });
</script>

<div class="example" style="width: 100%; height: 100%;">
    {#if mapOptions}
        <LeafletMap bind:this={leafletMap} options={mapOptions}>
            <TileLayer url={tileUrl} options={tileLayerOptions}/>
            <GeoJSON options={geoJsonOptions}/>
            <CircleMarker latLng={[1.2461196,103.8298412]}></CircleMarker>
        </LeafletMap>
    {/if}
</div>
 