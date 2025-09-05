<template>
	<main id="result" class="container mt-4">
		<p v-if="noteStores.filterNote.length === 0" class="text-muted text-center">
			找不到「{{ noteStores.keyword }}」的筆記
		</p>
		<div v-else class="row d-flex justify-content-start">
			<div class="col-lg-4 col-md-6 mr-2 mb-4" v-for="note in noteStores.filterNote" :key="note.id">
				<router-link :to="{ name: 'edit_note', params: { id: note.id } }">
					<div class="card">
						<i :class="['fa-solid fa-thumbtack me-3', { rotate: note.is_pinned }]"></i>
						<div class="card-body">
							<h5 class="card-title">{{ note.title }}</h5>
							<hr>
							<p class="card-text">{{ note.content }}</p>
						</div>
					</div>
				</router-link>
			</div>
		</div>
	</main>
</template>

<script setup>
import { useNoteStore } from '../stores/note_stores';
const noteStores = useNoteStore();
</script>

<style scoped>
.card {
	position: relative;
	padding: 20px 0;
	transition: 0.3s;
}

.card:hover {
	background-color: skyblue;
	transform: scale(1.1);
}

.fa-thumbtack {
	position: absolute;
	top: 10px;
	left: 10px;
}

.rotate {
	transform: rotate(45deg);
	color: red;
}
</style>