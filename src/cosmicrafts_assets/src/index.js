import { cosmicrafts } from "../../declarations/cosmicrafts";

document.getElementById("clickMeBtn").addEventListener("click", async () => {
  const name = document.getElementById("name").value.toString();
  // Interact with cosmicrafts actor, calling the greet method
  const greeting = await cosmicrafts.greet(name);

  document.getElementById("greeting").innerText = greeting;
});
