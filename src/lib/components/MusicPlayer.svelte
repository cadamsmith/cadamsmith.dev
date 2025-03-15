<script lang="ts">
	import { onMount } from 'svelte';

	const youTubeUrls = [
        // gangplank galleon (donkey kong country)
		'https://www.youtube.com/embed/yMBFdtRbFD0?si=7F-yTnkU8LR1GoFR',
        // paper machete (queens of the stone age)
        'https://www.youtube.com/embed/sL4HpIixKiI?si=BaBylYw8BZUXfPV3',
        // soul sanctum (hollow knight)
        'https://www.youtube.com/embed/pvpCX9qtyZE?si=0kGfOmBFvFR1-igj',
        // scorch 'n' torch (donkey kong tropical freeze)
        'https://www.youtube.com/embed/JFP4wn0dejc?si=i-UTTpNuo5SaVuMV',
        // decidely spooky (astro bot)
        'https://www.youtube.com/embed/JX_xqrpJVes?si=9mvlY5-2ACMPe252',
        // vault of heaven (pixies)
        'https://www.youtube.com/embed/qHUO0dVrALo?si=jOTgWhyEVVtF1uHX',
        // jigsaw falling into place (radiohead)
        'https://www.youtube.com/embed/TR2HPSjcJ7I?si=zSHCmlAHqu7ZCyiK',
        // ballad of sir frankie crisp (george harrison)
        'https://www.youtube.com/embed/A3LPDSfL1BM?si=v_HA9NvduMKIvDTE',
        // superman (goldfinger)
        'https://www.youtube.com/embed/0di6EY1p20U?si=32CaCCPerHhYAYMn',
        // the dripping tap (king gizzard and the lizard wizard)
        'https://www.youtube.com/embed/oDMldn7hFZo?si=vX_ty8b55xxADre7',
        // brooklyn bridge to chorus (the strokes)
        'https://www.youtube.com/embed/XlmyLnNfu8M?si=jQzTKJETjnpe5frs',
        // i summon you (spoon)
        'https://www.youtube.com/embed/iRXE3NNaiks?si=ek81Bz6UYKnyf--e',
        // turn to stone (elo)
        'https://www.youtube.com/embed/BDhJU_cNCZE?si=GVmv8thhSKTmhKeM',
        // down by the seaside (led zeppelin)
        'https://www.youtube.com/embed/g2U1BhziqzM?si=fmlAhbTgoKvB_vgI'
	];

    let randomized: string[] = [];
    let index = $state(0);
    let isPlaying = $state(false);

    onMount(() => {
        randomized = youTubeUrls.sort(() => Math.random() - 0.5);
        index = getRandomIndex();
    });

	function getRandomIndex() {
		return Math.floor(Math.random() * youTubeUrls.length);
	}

    function nextSong() {
        index = (index + 1) % randomized.length;
        isPlaying = true;
    }

    function previousSong() {
        index = (index - 1 + randomized.length) % randomized.length;
        isPlaying = true;
    }

    let url = $derived(randomized[index] ?? youTubeUrls[0]);
</script>

<div class="controls">
    <button onclick={previousSong} aria-label="Previous Song">
        <iconify-icon class="iconify-icon" icon="mdi:skip-previous"></iconify-icon>
    </button>

    <iconify-icon class="iconify-icon music-icon" icon="mdi:music"></iconify-icon>

    <button onclick={nextSong} aria-label="Next Song">
        <iconify-icon class="iconify-icon" icon="mdi:skip-next"></iconify-icon>
    </button>
</div>

<iframe width="344" height="210"
    src="{url}&controls=0&rel=0{isPlaying ? '&autoplay=1' : ''}"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
></iframe>

<style>
    .controls {
        background-color: #000;
        border: 2px solid #000;
        display: flex;
        justify-content: space-between;
        gap: .5rem;
        padding: .5rem;
        margin-bottom: .2rem;
    }

    .music-icon {
        color: #fff;
    }

    .controls button {
        border: 2px solid #000;
    }
</style>
