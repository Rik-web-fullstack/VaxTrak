const apiKey = "4775be7e30a584a803d1de033a0c7197";
const endpoint = `https://gnews.io/api/v4/search?q=vaccine&lang=en&max=10&apikey=${apiKey}`;
let currentIndex = 0;
let newsItems = [];

async function fetchNews() {
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    newsItems = data.articles;
    displayNews();
  } catch (error) {
    console.error("Failed to fetch news:", error);
  }
}

function displayNews() {
  const slider = document.getElementById("news-slider");
  slider.innerHTML = "";

  newsItems.forEach((article, index) => {
    const div = document.createElement("div");
    div.className = `news-item${index === 0 ? " active" : ""}`;
    div.innerHTML = `
      <h3>${article.title}</h3>
      <p>${article.description || "No description available."}</p>
      <a href="${article.url}" target="_blank">Read more</a>
    `;
    slider.appendChild(div);
  });
}

function showNews(index) {
  const items = document.querySelectorAll(".news-item");
  items.forEach((item, i) => {
    item.classList.remove("active");
  });
  if (items[index]) {
    items[index].classList.add("active");
  }
}

function nextNews() {
  currentIndex = (currentIndex + 1) % newsItems.length;
  showNews(currentIndex);
}

function prevNews() {
  currentIndex = (currentIndex - 1 + newsItems.length) % newsItems.length;
  showNews(currentIndex);
}

fetchNews();