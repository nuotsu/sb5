<script lang="ts">
	import TeamSchedule from '$ui/widgets/calendar/team-schedule.svelte'

	let { cell }: { cell: Dashboard.Cell } = $props()
</script>

{#if cell.type === 'Bogus'}
	<h2>Bogus</h2>
{:else if cell.type === 'Calendar'}
	<TeamSchedule />
{/if}
