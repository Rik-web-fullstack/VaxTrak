// const chatPopup = document.getElementById("chatPopup");

//     function toggleChat() {
//       if (chatPopup.style.display === "flex") {
//         chatPopup.style.display = "none";
//       } else {
//         chatPopup.style.display = "flex";
//       }
//     }

//     function sendChat() {
//       const input = document.getElementById("chatInput");
//       const msg = input.value.trim();
//       const chatBody = document.getElementById("chatBody");

//       if (msg) {
//         const userMsg = document.createElement("p");
//         userMsg.innerHTML = `<strong>You:</strong> ${msg}`;
//         chatBody.appendChild(userMsg);
//         input.value = "";
//         chatBody.scrollTop = chatBody.scrollHeight;
//       }
//     }

//     document.querySelectorAll('.scroll-link').forEach(link => {
//       link.addEventListener('click', function(e) {
//         e.preventDefault();
//         const targetId = this.getAttribute('href').substring(1);
//         const targetElement = document.getElementById(targetId);
    
//         if (targetElement) {
//           targetElement.scrollIntoView({
//             behavior: 'smooth'
//           });
//         }
//       });
//     });


//     document.getElementById("askGemini").addEventListener("click", async () => {
//       const prompt = document.getElementById("geminiPrompt").value.trim();
//       const responseDiv = document.getElementById("geminiResponse");
  
//       if (!prompt) {
//           responseDiv.textContent = "Please enter a query.";
//           return;
//       }
  
//       try {
//           const res = await fetch("/gemini_health_query", {
//               method: "POST",
//               headers: {
//                   "Content-Type": "application/json"
//               },
//               body: JSON.stringify({ prompt })
//           });
  
//           const data = await res.json();
  
//           if (res.ok) {
//               responseDiv.textContent = data.response;
//           } else {
//               responseDiv.textContent = data.error || "Something went wrong.";
//           }
//       } catch (err) {
//           console.error(err);
//           responseDiv.textContent = "Error contacting server.";
//       }
//   });
    

    
const chatPopup = document.getElementById("chatPopup");

function toggleChat() {
  if (chatPopup.style.display === "flex") {
    chatPopup.style.display = "none";
  } else {
    chatPopup.style.display = "flex";
  }
}

async function sendChat() {
  const input = document.getElementById("chatInput");
  const msg = input.value.trim();
  const chatBody = document.getElementById("chatBody");

  if (msg) {
    const userMsg = document.createElement("p");
    userMsg.innerHTML = `<strong>You:</strong> ${msg}`;
    chatBody.appendChild(userMsg);
    input.value = "";
    chatBody.scrollTop = chatBody.scrollHeight;

    try {
      const res = await fetch("/gemini_health_query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: msg }),
      });

      const data = await res.json();

      if (res.ok) {
        const botMsg = document.createElement("p");
        botMsg.innerHTML = `<strong>Bot:</strong> ${data.response}`;
        chatBody.appendChild(botMsg);
        chatBody.scrollTop = chatBody.scrollHeight;
      } else {
        const botMsg = document.createElement("p");
        botMsg.innerHTML = `<strong>Bot:</strong> ${data.error || "Something went wrong."}`;
        chatBody.appendChild(botMsg);
        chatBody.scrollTop = chatBody.scrollHeight;
      }
    } catch (err) {
      console.error(err);
      const botMsg = document.createElement("p");
      botMsg.innerHTML = `<strong>Bot:</strong> Error contacting server.`;
      chatBody.appendChild(botMsg);
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  }
}

document.querySelectorAll('.scroll-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default anchor jump
    const targetId = this.getAttribute('href').substring(1); // Remove the #
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});
