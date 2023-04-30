async function callNodeAPI(message) {
  try {
    const response = await fetch("http://localhost:3000/api/gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return null;
  }
}

document.getElementById("gptForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const prompt = document.getElementById("prompt").value;
  const result = await callNodeAPI(prompt);
  document.getElementById("result").textContent = result;
});
