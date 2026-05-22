const speaker = document.querySelector(".speaker");
const container = document.querySelector(".notes-container");

speaker.addEventListener("mousemove", (e) => {
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = "♪";

  const rect = speaker.getBoundingClientRect();
  note.style.left = (e.clientX - rect.left) + "px";
  note.style.top = (e.clientY - rect.top) + "px";

  container.appendChild(note);

  setTimeout(() => note.remove(), 2000);
});

