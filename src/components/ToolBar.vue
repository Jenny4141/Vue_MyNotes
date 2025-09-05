<template>
	<section id="Primary">
		<nav class="navbar">
			<div class="container-fluid d-flex justify-content-between">
				<router-link :to="{ name: 'home' }">
					<div>
						<a class="btn d-lg-none p-0 text-black" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button">
							<i class="fa-solid fa-bars"></i>
						</a>
						<img src="/note_logo.png" alt="" class="logo ms-2">
						<span class="text-black">MyNotes</span>
					</div>
				</router-link>
				<div>
					<form class="d-flex me-2 d-none d-md-flex" role="search" @submit.prevent="searchKeyword">
						<input class="form-control me-2" type="search" placeholder="請輸入關鍵字" v-model="keyword"
							@keyup.enter="searchKeyword" />
						<button class="btn" type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
					</form>
					<button class="btn d-md-none" type="submit" data-bs-toggle="collapse" data-bs-target="#collapseExample">
						<i class="fa-solid fa-magnifying-glass"></i>
					</button>
				</div>
			</div>
		</nav>
	</section>
	<div class="collapse d-md-none" id="collapseExample">
		<input class="form-control mx-auto mt-1" type="search" placeholder="請輸入關鍵字" v-model="keyword"
			@keyup.enter="searchKeyword" />
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { useNoteStore } from '../stores/note_stores';
const noteStores = useNoteStore();
const keyword = ref('');
function searchKeyword() {
	noteStores.searchNote(keyword.value)
}
</script>

<style scoped>
.navbar {
	background-color: rgb(193, 229, 243);
}

.logo {
	width: 50px;
}

.btn {
	transition: 0.2s;
}

.btn:hover {
	transform: scale(1.3);
}

.btn:focus {
	outline: 0;
	box-shadow: none;
}
</style>