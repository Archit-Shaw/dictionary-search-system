const API_BASE = "/api";

async function addWord() {
  const word = document.getElementById("addWordInput").value;

  if (!word.trim()) {
    return;
  }

  const response = await fetch(`${API_BASE}/words`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      word,
    }),
  });

  const data = await response.json();

  document.getElementById("addResult").innerText = data.message;
}

async function searchWord() {
  const word = document.getElementById("searchInput").value;

  if (!word.trim()) {
    return;
  }

  const response = await fetch(`${API_BASE}/search/${word}`);

  const data = await response.json();

  if (data.status === "FOUND") {
    document.getElementById("searchResult").innerText =
      `FOUND (Frequency: ${data.frequency})`;
  } else {
    document.getElementById("searchResult").innerText = "NOT FOUND";
  }
}

async function getSuggestions() {
  const prefix = document.getElementById("prefixInput").value.trim();

  const list = document.getElementById("suggestionList");

  list.innerHTML = "";

  if (!prefix) {
    return;
  }

  const response = await fetch(`/api/suggest?prefix=${prefix}&k=5`);

  const data = await response.json();

  if (data.suggestions.length === 0) {
    const li = document.createElement("li");

    li.innerText = "No matching words found";

    list.appendChild(li);

    return;
  }

  data.suggestions.forEach((item) => {
  const li = document.createElement("li");

  li.innerText = item.word;

  list.appendChild(li);
});
}
