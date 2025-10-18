// ===============================
// 1. Generate Navigation Menu
// ===============================
const menuItems = [
  { name: "Home", href: "#home" },
  { name: "Consultations", href: "#consultations" },
  { name: "Features", href: "#features" },
];

function initialiseMenu(currentPage) {
  const container = document.querySelector("#menu-container");
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
      a.setAttribute("href", menuItem.href);
      li.appendChild(a);
    }

    ul.appendChild(li);
  });

  container.appendChild(ul);
}

// Call function to highlight current page
initialiseMenu("Home");

// ===============================
// 2. Animate Warning Header
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
let topBtn = document.querySelector(".back-to-home");

window.addEventListener("scroll", () => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
});

topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// ===============================
// 4. Chat Form Submission
// ===============================
const form = document.getElementById("symptoms-form");
const chatInput = document.getElementById("chat-input");
const infoBox2 = document.getElementById("info-box-2");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent page reload
  const userMessage = chatInput.value.trim();
  if (!userMessage) return;

  // Show user message while waiting for response
  infoBox2.innerHTML = `<p>You: ${userMessage}</p><p>AI: Processing...</p>`;

  try {
    // Send message to Flask backend
    const response = await fetch("http://127.0.0.1:8080/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `msg=${encodeURIComponent(userMessage)}`,
    });

    const answer = await response.text();
    infoBox2.innerHTML = `<p>You: ${userMessage}</p><p>AI: ${answer}</p>`;
  } catch (error) {
    infoBox2.innerHTML = `<p>You: ${userMessage}</p><p>Error: Could not connect to server</p>`;
    console.error(error);
  }

  chatInput.value = ""; // Clear input
});

// ===============================
// 5. Placeholder for Suggestions Buttons
// ===============================
const suggestionButtons = document.querySelectorAll("#suggestions button");
suggestionButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Keep non-functional for now
    chatInput.value = btn.innerText;
  });
});

// ===============================
// 6. Placeholder for Download Report Button
// ===============================
const downloadBtn = document.querySelector("#downloadBtn button");
downloadBtn.addEventListener("click", () => {
  // Download feature not implemented yet
  alert("Download feature will be implemented here.");
});
