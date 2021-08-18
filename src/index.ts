window.addEventListener("load", () => {
  const header = document.createElement("h1");
  header.innerText = "test";

  const body = document.querySelector("body");
  body.appendChild(header);
});
