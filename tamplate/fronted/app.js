// ===============================
// 1. Navigation Menu
// ===============================
const menuItems = [
  { name: "Home", href: "#home" },
  { name: "Consultations", href: "#consultations" },
  { name: "Features", href: "#features" },
];

function initialiseMenu(currentPage) {
  const container = document.querySelector("#menu-container");
  if (!container) return;

  container.innerHTML = "";
  const ul = document.createElement("ul");
  ul.classList.add("menu");

  menuItems.forEach((menuItem) => {
    const li = document.createElement("li");
    li.classList.add("menu-item");
    if (menuItem.name.toLowerCase() === currentPage.toLowerCase()) {
      li.innerText = menuItem.name;
      li.classList.add("active");
    } else {
      const a = document.createElement("a");
      a.innerText = menuItem.name;
      a.href = menuItem.href;
      li.appendChild(a);
    }
    ul.appendChild(li);
  });

  container.appendChild(ul);
}

initialiseMenu("Home");

// ===============================
// 2. Animate Disclaimer
// ===============================
gsap.from("#health-disclaimer p", { opacity: 0, duration: 5 });
gsap.to("#health-disclaimer p", {
  color: "#70c5ce",
  duration: 0.95,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut",
});

// ===============================
// 3. Back-to-Top Button
// ===============================
const topBtn = document.querySelector(".back-to-home");
window.addEventListener("scroll", () => {
  if (!topBtn) return;
  topBtn.style.display =
    document.body.scrollTop > 20 || document.documentElement.scrollTop > 20
      ? "block"
      : "none";
});
topBtn?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// ===============================
// 4. Chat Form Submission (Flask RAG)
// ===============================
const form = document.getElementById("symptoms-form");
const chatInput = document.getElementById("chat-input");
const infoBox2 = document.getElementById("info-box-2");
const infoBox3 = document.getElementById("info-box-3");

form?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userMessage = chatInput.value.trim();
  if (!userMessage) return;

  // Show processing text
  infoBox2.innerHTML = `<p>You: ${userMessage}</p><p>AI: Processing...</p>`;
  infoBox3.innerHTML = `<p>Recommendations: Processing...</p>`;

  try {
    // Call your Flask backend
    const response = await fetch("http://127.0.0.1:8080/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ msg: userMessage }),
    });

    if (!response.ok) throw new Error("Network response not ok");
    const data = await response.json();

    // Update frontend with returned data
    infoBox2.innerHTML = `<p>You: ${userMessage}</p><p>AI: ${data.diagnosis}</p>`;
    infoBox3.innerHTML = `<p>Recommendations:</p><ul><li>${data.recommendations}</li></ul>`;
  } catch (err) {
    console.error(err);
    infoBox2.innerHTML = `<p>You: ${userMessage}</p><p>Error: Could not connect to server</p>`;
    infoBox3.innerHTML = `<p>Error: Could not fetch recommendations</p>`;
  }

  chatInput.value = "";
});

// ===============================
// 5. Suggestions Buttons
// ===============================
document.querySelectorAll("#suggestions button").forEach((btn) => {
  btn.addEventListener("click", () => (chatInput.value = btn.innerText));
});

// ===============================
// 6. Download Report
// ===============================
document.getElementById("download-report")?.addEventListener("click", () => {
  window.open("http://127.0.0.1:8080/api/download-report", "_blank");
});
