const form = document.getElementById("myForm");

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const textbox = document.getElementById("input");

    const errorContainer = document.getElementById("error-container");
    const text = textbox.value;
    if (text.trim().length === 0) {
      errorContainer.classList.remove("hidden");
      textbox.classList.add("error-box");
      errorContainer.innerHTML = "Error: Please enter a word or phrase";
      form.reset();
      textbox.focus();
      return;
    }
    const text2 = text.toLowerCase();
    const text3 = text2.replace(/[^a-zA-Z0-9]/g, "");
    if (text3.trim().length === 0) {
      errorContainer.classList.remove("hidden");
      textbox.classList.add("error-box");
      errorContainer.innerHTML = "Error: Please enter a word or phrase";
      form.reset();
      textbox.focus();
      return;
    }
    errorContainer.classList.add("hidden");
    const text4 = text3.split("");
    const text5 = text4.reverse();
    const text6 = text5.join("");

    const ol = document.getElementById("attempts");
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(text));
    if (text6 === text3) {
      textbox.classList.remove("error-box");
      li.classList.add("is-palindrome");
      ol.appendChild(li);
      textbox.value = "";
      textbox.focus();
    } else {
      textbox.classList.remove("error-box");
      li.classList.add("not-palindrome");
      ol.appendChild(li);
      textbox.value = "";
      textbox.focus();
    }
  });
}
