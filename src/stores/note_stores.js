import { defineStore } from "pinia";

export const useNoteStore = defineStore("todos", {
  state: () => ({
    // 定義要使用的相關變數資料
    notes: [
      {
        id: 1,
        title: "今日特餐",
        content: "推出牛排套餐，附贈飲料一杯。",
        is_pinned: true,
      },
      {
        id: 2,
        title: "食材進貨",
        content: "明天早上需補貨新鮮蔬菜與海鮮。",
        is_pinned: false,
      },
      {
        id: 3,
        title: "員工會議",
        content: "本週五下午三點舉行員工會議，請準時出席。",
        is_pinned: false,
      },
      {
        id: 4,
        title: "廚房維修",
        content: "下週一廚房設備將進行維修保養。",
        is_pinned: true,
      },
      {
        id: 5,
        title: "顧客回饋",
        content: "收到顧客對甜點的好評，考慮增加新口味。",
        is_pinned: false,
      },
      {
        id: 6,
        title: "促銷活動",
        content: "下個月舉辦週年慶，規劃折扣與贈品。",
        is_pinned: false,
      },
    ],
    keyword: "",
  }),
  getters: {
    // 定義預設可以直接取得資料的函式
    sortNote(state) {
      return [...state.notes].sort((a, b) => {
        if (a.is_pinned !== b.is_pinned) return a.is_pinned ? -1 : 1;
        return b.id - a.id;
      });
    },
    filterNote(state) {
      const searchText = state.keyword.trim().toLowerCase();
      const allNotes = state.notes;
      const searchResult = searchText
        ? allNotes.filter(
            (a) =>
              a.title.toLowerCase().includes(searchText) ||
              a.content.toLowerCase().includes(searchText)
          )
        : allNotes;
      return [...searchResult].sort((a, b) => {
        if (a.is_pinned !== b.is_pinned) return a.is_pinned ? -1 : 1;
        return b.id - a.id;
      });
    },
  },
  actions: {
    // 定義要使用取得/寫入資料的函式
    addNote(newTitle, newContent) {
      const newId = this.notes.length + 1;
      this.notes.push({
        id: newId,
        title: newTitle,
        content: newContent,
        is_pinned: false,
      });
    },
    editNote(id, title, content) {
      const note = this.notes.find((note) => note.id === id);
      if (note) {
        note.title = title;
        note.content = content;
      }
    },
    deleteNote(noteId) {
      const index = this.notes.findIndex((note) => note.id === noteId);
      if (index !== -1) {
        this.notes.splice(index, 1);
      }
    },
    togglePin(noteId) {
      const note = this.notes.find((note) => note.id === noteId);
      if (note) {
        note.is_pinned = !note.is_pinned;
      }
    },
    searchNote(k) {
      this.keyword = k || ""; // 如果k是undefined或null就是空字串
    },
  },
});
