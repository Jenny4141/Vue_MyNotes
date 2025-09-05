<template>
	<div class="pcSidebar d-none d-lg-block">
		<div class="container">
			<router-link :to="{ name: 'add_note' }">
				<button class="mt-4 mb-3 btn btn-info addBtn">新增筆記</button>
			</router-link>
			<ul class="list-group">
				<li class="list-group-item d-flex justify-content-between align-items-center" v-for="note in notes"
					:key="note.id">
					<router-link :to="{ name: 'edit_note', params: { id: note.id } }">
						<span class="text-black">{{ note.title }}</span>
					</router-link>
					<div class="icon-group d-flex justify-content-between">
						<i :class="['fa-solid fa-thumbtack me-3', { rotate: note.is_pinned }]"
							@click="noteStores.togglePin(note.id)"></i>
						<i class="fa-solid fa-trash" @click="showDeleteModal(note)"></i>
					</div>
				</li>
			</ul>
		</div>
	</div>
	<div class="modal fade" tabindex="-1" id="deleteModal">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">刪除資料</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<p>確定刪除此筆資料?</p>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
					<button type="button" class="btn btn-primary" @click="confirmDelete">確定</button>
				</div>
			</div>
		</div>
	</div>

	<div class="offcanvas offcanvas-start mobileSidebar d-lg-none" tabindex="-1" id="offcanvasExample">
		<div class="offcanvas-header">
			<h5 class="offcanvas-title" id="offcanvasExampleLabel">筆記列表</h5>
			<button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
		</div>
		<div class="offcanvas-body">
			<router-link :to="{ name: 'add_note' }">
				<button class="mt-4 mb-3 btn btn-info addBtn" data-bs-dismiss="offcanvas">新增筆記</button>
			</router-link>
			<ul class="list-group">
				<li class="list-group-item d-flex justify-content-between align-items-center" v-for="note in notes"
					:key="note.id" data-bs-dismiss="offcanvas">
					<router-link :to="{ name: 'edit_note', params: { id: note.id } }">
						<span class="text-black">{{ note.title }}</span>
					</router-link>
					<div class="icon-group d-flex justify-content-between">
						<i :class="['fa-solid fa-thumbtack me-3', { rotate: note.is_pinned }]"
							@click="noteStores.togglePin(note.id)"></i>
						<i class="fa-solid fa-trash" @click="showDeleteModal(note)"></i>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup>
import { useNoteStore } from '../stores/note_stores';
import { ref, computed } from 'vue';
const noteStores = useNoteStore();
const notes = computed(() => noteStores.sortNote)
let selectedNoteId = ref(null)

const showDeleteModal = (note) => {
	selectedNoteId.value = note.id;
	const modal = new bootstrap.Modal(document.getElementById('deleteModal'))
	modal.show()
}

function confirmDelete() {
	noteStores.deleteNote(selectedNoteId.value);
	const modal = document.getElementById('deleteModal')
	const inst = bootstrap.Modal.getInstance(modal) || new bootstrap.Modal(modal)
	inst.hide()
}
</script>

<style scoped>
.pcSidebar {
	background-color: rgb(209, 237, 248);
	min-height: 100vh;
	width: 250px;
}

.mobileSidebar {
	border: 0;
	width: 60vw
}

.addBtn {
	width: 100%;
}

.list-group {
	width: 100%;
	border-radius: 0px;
}

.list-group-item {
	width: 100%;
	border: 0;
	background: transparent;
}

.list-group-item:hover {
	background-color: skyblue;
}

.icon-group {
	width: 50px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.icon-group i {
	cursor: pointer;
}

.icon-group i:hover {
	color: coral;
}

.rotate {
	transform: rotate(45deg);
	color: red;
}
</style>