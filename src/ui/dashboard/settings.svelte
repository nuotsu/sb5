<script lang="ts">
	let { name }: { name?: string } = $props()
</script>

<details class="dropdown" style:--anchor="--dashboard-settings" {name}>
	<summary class="link">Dashboard</summary>

	<menu class="p-ch">
		<li>
			<label>
				<input id="edit-dashboard" type="checkbox" />
				Edit
			</label>
		</li>
	</menu>
</details>
