import { createRouter, createWebHistory } from "vue-router";
import NoteGrid from "./components/NoteGrid.vue";
import AddNote from "./components/AddNote.vue";
import EditNote from "./components/EditNote.vue";

const routes = [
  { path: "/", name: "home", component: NoteGrid },
  { path: "/add", name: "add_note", component: AddNote },
  { path: "/edit/:id", name: "edit_note", component: EditNote },
];

const router = createRouter({
  routes,
  history: createWebHistory('/Vue_MyNotes/'),
});

export default router;
