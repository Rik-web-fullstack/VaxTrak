document.getElementById("askGemini").addEventListener("click", async () => {
    const prompt = document.getElementById("geminiPrompt").value.trim();
    const responseDiv = document.getElementById("geminiResponse");

    if (!prompt) {
        responseDiv.textContent = "Please enter a query.";
        return;
    }

    try {
        const res = await fetch("/gemini_health_query", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt })
        });

        const data = await res.json();

        if (res.ok) {
            responseDiv.textContent = data.response;
        } else {
            responseDiv.textContent = data.error || "Something went wrong.";
        }
    } catch (err) {
        console.error(err);
        responseDiv.textContent = "Error contacting server.";
    }
});