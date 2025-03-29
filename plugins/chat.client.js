// plugins/chat.client.js
import { useChatStore } from '~/stores/chat'

export default defineNuxtPlugin(({ $pinia }) => {
  // Initialize chat store
  const chatStore = useChatStore($pinia)
  
  // Only run on client-side
  if (process.client) {
    chatStore.initChat()
  }
})
