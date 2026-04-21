<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements'

	let { team, ...props }: { team: MLB.Team } & HTMLAttributes<HTMLImageElement> = $props()
</script>

<img
	src="https://www.mlbstatic.com/team-logos/team-cap-on-dark/{team.id}.svg"
	alt={team.name}
	width={72}
	height={72}
	loading="lazy"
	draggable="false"
	{...props}
/>
