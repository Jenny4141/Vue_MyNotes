<template>
	<div class="container p-5">
		<div class="alert alert-success text-left" role="alert" v-if="showSuccessAlert">
			更新成功
		</div>
		<h2 class="mb-5">
			編輯筆記
		</h2>
		<form @submit.prevent="updateNote">
			<div class="mb-3">
				<input type="text" class="form-control" id="title" placeholder="請輸入標題..." v-model="newNoteTitle">
			</div>
			<div class="mb-3">
				<textarea class="form-control" id="note" rows="20" v-model="newNoteContent"></textarea>
			</div>
			<button class="btn btn-outline-success" type="submit">更新 <i class="fa-solid fa-floppy-disk"></i></button>
		</form>
	</div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useNoteStore } from '../stores/note_stores'
import { useRouter, useRoute } from 'vue-router'
const route = useRoute() // 取得網址列資訊
const router = useRouter() // 跳轉頁面指向用
const noteStores = useNoteStore()
const currentNote = computed(() => noteStores.notes.find(note => note.id === parseInt(route.params.id)));
const newNoteTitle = ref(currentNote.value.title)
const newNoteContent = ref(currentNote.value.content)
const showSuccessAlert = ref(false)

watch(currentNote, (note) => {
	newNoteTitle.value = note.title;
	newNoteContent.value = note.content;
})

function updateNote() {
	if (newNoteTitle.value == '' || newNoteContent.value == '') {
		alert('資料不能為空')
		newNoteTitle.value = currentNote.value.title;
		newNoteContent.value = currentNote.value.content;
		return
	} else if (currentNote.value) {
		noteStores.editNote(currentNote.value.id, newNoteTitle.value, newNoteContent.value);
		// 顯示更新成功消息
		showSuccessAlert.value = true;

		// 設置一個計時器，在 2 秒後隱藏消息
		setTimeout(() => {
			showSuccessAlert.value = false;
			router.push({ name: 'home' });
		}, 1000);
	}
}
</script>

<style scoped></style>