<script lang="ts">
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
        'https://www.youtube.com/embed/oDMldn7hFZo?si=vX_ty8b55xxADre7'
	];

    const randomized = youTubeUrls.sort(() => Math.random() - 0.5);

	function getRandomIndex() {
		return Math.floor(Math.random() * randomized.length);
	}

	let index = $state(getRandomIndex());

    let url = $derived(randomized[index]);
</script>

<iframe width="344" height="210"
    src="{url}"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
></iframe>
