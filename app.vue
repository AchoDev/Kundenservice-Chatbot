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

    <div v-show="!thinking">
      <button 
        v-for="prompt in availablePrompts" 
        :key="prompt.id" 
        class="button"            
        @click="send(prompt.prompt, 'prompt', prompt.id)"
      >
        {{ prompt.prompt }}
      </button>
    </div>


    <form @submit.prevent="send(input)" :disabled="thinking"  class="flex gap-2">
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



interface Prompt {
  id: string;
  prompt: string;
  answer: string;
  children?: Prompt[];
}

const availablePrompts = ref<Prompt[]>([])

interface Message {
  role: string;
  content: string;
  id: string;
  type?: string;
}

const messages = ref<Message[]>([])

async function send(text: string, type: string = "text", id: string = "0") {
  messages.value.push ({
    role: "user",
    content: text,
    id: id
  })

  thinking.value = true

  // const question = {
  //   text: text,
  //   type: type,
  //   id: id
  // }

  const questions = messages.value.map(m => ({
    text: m.content,
    role: m.role,
    id: m.id,
    type: m.type
  }))

  questions[questions.length - 1].type = type

  input.value = ""
  
  const response = await fetch("/api/send-message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      conversationID: "1234567890",
      customerMessages: questions,
    })
  })
  
  const data = await response.json()

  messages.value.push({
    role: "assistant",
    content: data.message,
    id: data.id
  })

  availablePrompts.value = data.prompts

  thinking.value = false
}

onMounted(() => {
  fetch("/api/get-prompts")
    .then((response) => response.json())
    .then((data) => {
      console.log("Prompts:", data)
      availablePrompts.value = data

      messages.value.push({
        role: "assistant",
        content: "Hallo! Wie kann ich Ihnen behilflich sein?",
        id: "0"
      })
    })
    .catch((error) => {
      console.error("Error fetching prompts:", error)
    })
})

</script>

<style lang="scss">

.button {
  background: rgb(46, 46, 46);
  color: white;
  border: none;
  padding: 0.5rem;
  margin: 0.5rem;
  cursor: pointer;

  &:hover {
    background: rgb(100, 100, 100);
  }
}

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

