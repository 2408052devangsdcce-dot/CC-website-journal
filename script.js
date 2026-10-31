// 1. After deploying your Google Apps Script, paste its Web App URL below.
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycby2zWHW-ozMfnM1xnSHxNGA6hc_dBolpCJICT5hK-UTxcXYd9kEPyiZRPcVKX720z41fQ/exec";

const form = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const buttonText = document.getElementById("buttonText");
const statusMessage = document.getElementById("formStatus");
const messageInput = document.getElementById("message");
const charCount = document.getElementById("charCount");

document.getElementById("year").textContent = new Date().getFullYear();

messageInput.addEventListener("input", () => {
  charCount.textContent = messageInput.value.length;
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  statusMessage.textContent = "";
  statusMessage.className = "form-status";

  if (!form.reportValidity()) return;

  if (SCRIPT_URL.includes("PASTE_YOUR_GOOGLE")) {
    statusMessage.textContent = "Setup needed: add your Google Apps Script Web App URL in script.js.";
    statusMessage.classList.add("error");
    return;
  }

  // Basic bot check. The hidden field should always remain empty.
  if (document.getElementById("website").value.trim() !== "") return;

  submitBtn.disabled = true;
  buttonText.textContent = "Sending...";

  const formData = new FormData(form);
  const payload = new URLSearchParams();
  ["name", "email", "phone", "subject", "message", "website"].forEach((key) => {
    payload.append(key, formData.get(key) || "");
  });

  try {
    // Apps Script accepts URL-encoded POST data. no-cors means the browser
    // cannot read Google's response, so this confirms the request was sent,
    // not independently verified by the browser.
    await fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      body: payload
    });

    form.reset();
    charCount.textContent = "0";
    statusMessage.textContent = "Your message has been sent. Thank you for reaching out!";
    statusMessage.classList.add("success");
  } catch (error) {
    statusMessage.textContent = "Something went wrong. Please try again in a moment.";
    statusMessage.classList.add("error");
  } finally {
    submitBtn.disabled = false;
    buttonText.textContent = "Send message";
  }
});
