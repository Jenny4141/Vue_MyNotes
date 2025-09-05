<template>
	<div class="container p-5">
		<div class="alert alert-success text-left" role="alert" v-show="showSuccessAlert">
			更新成功
		</div>
		<h2 class="mb-5">
			新增筆記
		</h2>
		<form @submit.prevent="createNote">
			<div class="mb-3">
				<input type="text" v-model="newNoteTitle" class="form-control" id="title" placeholder="請輸入標題..."
					@focus="clearPlaceholder">
			</div>
			<div class="mb-3">
				<textarea class="form-control" id="note" rows="20" v-model="newNoteContent"
					@focus="clearTextArea">筆記內容...</textarea>
			</div>
			<button class="btn btn-outline-success" type="submit">儲存 <i class="fa-solid fa-floppy-disk"></i></button>
		</form>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { useNoteStore } from '../stores/note_stores'
import { useRouter } from 'vue-router'
const router = useRouter();
const noteStores = useNoteStore()
const newNoteTitle = ref('')
const newNoteContent = ref('筆記內容...')
const showSuccessAlert = ref(false)

//清空標題的input placeholder
const clearPlaceholder = () => {
	document.querySelector('#title').placeholder = ''

}
//清空文字輸入區域
const clearTextArea = () => {
	newNoteContent.value = ''
}
function createNote() {
	if (newNoteTitle.value != null && newNoteContent.value != null) {
		noteStores.addNote(newNoteTitle.value, newNoteContent.value);
		// 顯示更新成功消息
		showSuccessAlert.value = true;
	} else {
		alert('資料不得為空！')
	}
	// 設置一個計時器，在 2 秒後隱藏消息
	setTimeout(() => {
		showSuccessAlert.value = false;
		router.push({ name: "home" });
	}, 1000);
}
</script>

<style scoped></style>