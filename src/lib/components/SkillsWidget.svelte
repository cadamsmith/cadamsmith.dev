<script lang="ts">
	import type { Skill } from '$lib/types/Skill';
	import SkillCard from './SkillCard.svelte';

	export let skills: Skill[];

    let groups = skills.map(s => s.group)
        .filter((value, index, arr) => index === arr.indexOf(value))
        .sort();

    let currentGroup = groups[0];

    function changeCurrentGroup(group: string) {
        currentGroup = group;
    }
</script>

<div class="skills-widget">
    <div class="tab-row">
        {#each groups as group}
            <button type="button" class:selected={group === currentGroup} on:click={() => changeCurrentGroup(group)}>{group}</button>
        {/each}
    </div>

    <div class="grid">
        {#each skills as skill}
            <SkillCard {skill} selected={skill.group === currentGroup} />
        {/each}
    </div>
</div>

<style>
    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
        grid-template-rows: auto; 
        column-gap: 5px;
        row-gap: 5px;

        background-color: #D5BF86;

        padding: 1rem;
    }

    .skills-widget {
        margin: 1rem 0;
    }

    .tab-row {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        display: inline-block;
        background-color: #000;
    }

    button {
        border: 0;
        color: white;
        padding: .5rem;
        font-weight: bold;
        background-color: transparent;
        cursor: pointer;
        margin: .5em .5em 0 .5em;
    }

    button.selected {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background-color: #D5BF86;
        color: #000;
    }
</style>