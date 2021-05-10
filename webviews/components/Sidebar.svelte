<script lang="ts">
  let todos: Array<{ text: string; completed: boolean }> = [];
  let text = "";
</script>

<form
  on:submit|preventDefault={(e) => {
    todos = [{ text, completed: false }, ...todos];
    text = "";
  }}
>
  <input bind:value={text} />
</form>

<ul>
  {#each todos as todo (todo.text)}
    <li
      class:complete={todo.completed}
      on:click={() => {
        todo.completed = !todo.completed;
      }}
    >
      {todo.text}
    </li>
  {/each}
</ul>

<div>text: {text}</div>
<button
  on:click={() => {
    tsvscode.postMessage({
      type: "onInfo",
      value: " info meesage",
    });
  }}>Send Message</button
>

<button
  on:click={() => {
    tsvscode.postMessage({
      type: "onError",
      value: "error meesage",
    });
  }}>Send Error</button
>

<style>
  .complete {
    text-decoration: line-through;
  }
  div {
    text-align: center;
    color: rgb(255, 255, 255);
  }
</style>
