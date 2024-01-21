<script>
	import { fetchChrono } from './fetchChrono';
	let inputSize = 2;
	let chrono = fetchChrono();
</script>

<div class="main">
	{#await chrono}
		<span>Loading...</span>
	{:then chrono}
		<h1>Chrono:</h1>
		<ul>
			{#each chrono.body as data}
				<li class="chrono">
					<div class={data.chronoClass}>
						<a href="/article/{data.id}">
							<div class="chrono_header">
								<div class="chrono_time">
									{data.date}
								</div>
								{#if data.premium}
									<div class="pellet">&bull;</div>
								{:else}
									&nbsp;-&nbsp;
								{/if}
                                <div class="chrono_tags">
                                    {data.header}
                                </div>
                                —
							</div>
                            <div class="chrono_title">
                                {data.title}
                            </div>
						</a>
					</div>
				</li>
			{/each}
		</ul>
	{/await}
</div>

<style>
</style>
