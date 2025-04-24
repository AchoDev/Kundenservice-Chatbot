<template>
  <div id="body" class="flex justify-center items-center size-full flex-col">
    <h1 class="text-4xl">Chatbot</h1>

    <div class="flex flex-col max-h-1/2 overflow-y-scroll">

      <div v-for="message in messages" class="message">
        <div v-if="message.role === 'user'" class="bg-blue-500 text-white p-2 m-2 rounded" v-html="message.content">
        </div>
        <div v-else v-html="message.content"  class="bg-gray-500 text-white p-2 m-2 rounded">

        </div>
      </div>

      <div class="message">
        <div v-if="thinking" class="bg-gray-500 text-white p-2 m-2 rounded">
          Thinking...
        </div>
      </div>

    </div>

    <form @submit.prevent="send()" :disabled="thinking"  class="flex gap-2">
      <input type="text" v-model="input">
      <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Send
      </button>
    </form>
  </div>

</template>



<script setup lang="ts">

const input = ref("");
const thinking = ref(false)

const messages = ref([
  {
    role: "user",
    content: "Hello, how are you?"
  },
  {
    role: "assistant",
    content: "I am fine, thank you!"
  }
])

async function send() {
  
  messages.value.push ({
    role: "user",
    content: input.value
  })

  thinking.value = true

  const question = input.value
  input.value = ""
  
  const response = await fetch("/api/sendMessage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      conversationID: "1234567890",
      customerMessage: question,
    })
  })
  
  const data = await response.json()

  messages.value.push({
    role: "assistant",
    content: data.response
  })

  thinking.value = false
}

</script>

<style>

body {
  background: rgb(58, 58, 58);
  color: white;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;

  height: 100vh;
}

ol {
  list-style: decimal;
  margin-left: 1rem;
}

li {
  margin-bottom: 0.5rem;
  margin-left: 1rem;
}

input {
  outline: none;
  background: white;
  color: black;
  padding: 0.5rem;
}

#__nuxt {
  height: 100%;
  width: 100%;
}

html {
  margin: 0;
  padding: 0;
}

.message {
  max-width: 300px;
}


</style>

