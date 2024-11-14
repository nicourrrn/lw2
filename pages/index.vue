<template>
  <div>
    <header></header>
    <main class="sm flex flex-col flex-auto justify-center content-center p-8">
      <h2 class="font-mono text-xl font-bold">Hello from cool messanger</h2>
      <div>
        <label for="username" class="font-mono text-lg">Username:</label>
        <input
          id="username"
          v-model="username"
          class="border-dashed border-2 border-red-300 w-80"
        />
      </div>
      <div>
        <label for="ip" class="font-mono text-lg">IP:</label>
        <input
          id="ip"
          v-model="ip"
          class="border-dashed border-2 border-red-300 w-80"
        />
      </div>
      <input v-model="textField" class="border-2 border-dashed boder-red-300" />
      <button
        type="sumbit"
        class="border-dashed font-mono text-xl border-red-300 border-2 w-80"
        @click="encryptFromServer"
      >
        Encrypt message
      </button>
      <div v-for="message in messageStories">
        <p>{{ message }}</p>
      </div>
    </main>

    <footer></footer>
  </div>
</template>

<script setup lang="ts">
const username = useUsername();
const ip = useIP();
const messageStories = ref([]);
const textField = ref("");

const keys = ref({ publicKey: "", privateKey: "", verifyKey: "", signKey: "" });
fetch("api/generateKeys")
  .then((res) => res.json())
  .then((data) => {
    keys.value = data;
  });

const encryptFromServer = (message: string) => {
  fetch("api/encrypt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: textField.value, ...keys }),
  })
    .then((res) => res.json())
    .then((data) => {
      messageStories.value.push(data.result);
      console.log(messageStories.value.length);
    });
};

const decryptFromServer = (message: string) => {
  fetch("api/decrypt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: textField.value, ...keys }),
  })
    .then((res) => res.json())
    .then((data) => {
      messageStories.value.push(data.result);
    });
};

const tryToConnect = async () => {
  const resp = await fetch(`http://${ip}/connect`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username }),
  });
};
</script>
