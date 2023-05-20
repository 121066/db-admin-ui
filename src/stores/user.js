import { defineStore } from "pinia";
export const userList = defineStore("usrList", {
  state: () => ({
    user: [],
    userName: "管理员",
  }),
  actions: {
    async setUser(data) {
      this.user = data;
    },
  },
});
