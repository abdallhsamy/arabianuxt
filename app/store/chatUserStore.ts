import { ref } from "vue";
import { defineStore } from "pinia";

export interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  online?: boolean;
}

export const useChatUserStore = defineStore("chatUser", () => {
  const me = ref<ChatUser>({
    id: "u1",
    name: "Abdallah Samy",
    avatar: "https://i.pravatar.cc/150?img=11",
    online: true,
  });

  const users = ref<ChatUser[]>([
    me.value,
    {
      id: "u2",
      name: "Sara Ali",
      avatar: "https://i.pravatar.cc/150?img=45",
      online: true,
    },
    {
      id: "u3",
      name: "Mohamed Khalid",
      avatar: "https://i.pravatar.cc/150?img=56",
      online: false,
    },
    {
      id: "u4",
      name: "Lina Ahmed",
      avatar: "https://i.pravatar.cc/150?img=23",
      online: true,
    },
  ]);

  return { me, users };
});
