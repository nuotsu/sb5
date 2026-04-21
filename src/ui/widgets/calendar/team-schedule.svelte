<script lang="ts">
	import fetchMLB from '$lib/mlb/fetch'
	import TeamLogo from '$ui/team-logo.svelte'
	import { getContext } from 'svelte'
	import Month from './month.svelte'

	const { registerOptions } = getContext<Dashboard.CellContext>('cell')

	let teamId = $state('119')

	$effect(() => {
		registerOptions(options)
	})

	async function fetchTeamSchedule(date: Date) {
		const response = await fetchMLB<MLB.ScheduleResponse>('/api/v1/schedule', {
			sportId: '1',
			date: date.toISOString().slice(0, 10),
			teamId,
			hydrate: 'team',
		})

		return response.dates?.[0]?.games ?? []
	}
</script>

<div class="team-schedule flex min-h-full flex-col">
	<Month {cells} />
</div>

{#snippet cells({ date }: { date: Date })}
	{#await fetchTeamSchedule(date)}
		<loading class="block"></loading>
	{:then games}
		{#each games as game (game.gamePk)}
			{@const opponent =
				game.teams.home.team.id.toString() === teamId ? game.teams.away.team : game.teams.home.team}

			<div>
				{#if game.teams.away.team.id.toString() === teamId}@{:else}vs{/if}
				<TeamLogo team={opponent} class="inline-block size-lh" />
			</div>
		{/each}
	{/await}
{/snippet}

{#snippet options()}
	<fieldset>
		<legend>Team</legend>
		<select>
			<option value="119">LAD</option>
		</select>
	</fieldset>
{/snippet}

<style>
	.team-schedule {
		:global(> .grid) {
			flex-grow: 1;
			grid-template-rows: 1lh auto;
		}
	}
</style>
