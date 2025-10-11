import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface ChatMessage {
    id: string
    from: string
    to: string
    text: string
    time: number
    read?: boolean
}

export const useChatMessagesStore = defineStore('chatMessages', () => {
    const messages = ref<ChatMessage[]>([
        {
            id: crypto.randomUUID(),
            from: 'u2',
            to: 'u1',
            text: 'Hey Abdallah! 👋 How’s your new dashboard project going?',
            time: Date.now() - 3600 * 1000 * 4,
        },
        {
            id: crypto.randomUUID(),
            from: 'u1',
            to: 'u2',
            text: 'Hi Sara! Almost done — now adding floating chat 😎',
            time: Date.now() - 3600 * 1000 * 3.8,
        },
        {
            id: crypto.randomUUID(),
            from: 'u3',
            to: 'u1',
            text: 'Good morning bro! Can you check my PR later?',
            time: Date.now() - 3600 * 1000 * 1.2,
        },
    ])

    const byUser = (userId: string, meId: string) =>
        messages.value.filter(
            m => (m.from === userId && m.to === meId) || (m.from === meId && m.to === userId)
        )

    const sendMessage = (from: string, to: string, text: string) => {
        const msg = {
            id: crypto.randomUUID(),
            from,
            to,
            text,
            time: Date.now(),
            read: false,
        }
        messages.value.push(msg)
        return msg
    }

    const autoReply = (to: string, from: string) => {
        const replies = [
            'Got it! 👍',
            'Sounds great!',
            'Let’s catch up later.',
            '😂 Haha nice one!',
            'I’m checking that now.',
            'Sure! I’ll get back soon.',
            '🔥🔥🔥',
        ]
        const reply = replies[Math.floor(Math.random() * replies.length)]
        setTimeout(() => {
            messages.value.push({
                id: crypto.randomUUID(),
                from,
                to,
                text: reply as string,
                time: Date.now(),
            })
        }, 1000 + Math.random() * 2000)
    }

    return { messages, byUser, sendMessage, autoReply }
})
