// === IndexedDB Setup ===
let db;
const request = indexedDB.open("CookMateDB", 1);

request.onerror = (event) => {
  console.error("IndexedDB error:", event);
};

request.onsuccess = (event) => {
  db = event.target.result;
  loadRecipesFromDB();
};

request.onupgradeneeded = (event) => {
  db = event.target.result;
  db.createObjectStore("recipes", { keyPath: "name" });
};

function loadRecipesFromDB() {
  const tx = db.transaction("recipes", "readonly");
  const store = tx.objectStore("recipes");
  const request = store.getAll();

  request.onsuccess = () => {
    const storedRecipes = request.result;
    storedRecipes.forEach(r => {
      const exists = recipes.some(base => base.name === r.name);
      if (!exists) recipes.push(r);
    });
  };
}

function saveRecipeToIndexedDB(recipe) {
  const tx = db.transaction("recipes", "readwrite");
  tx.objectStore("recipes").put(recipe);
  tx.oncomplete = () => {
    addMessage(`✅ "${recipe.name}" recipe saved to IndexedDB!`, "bot");
  };
}

function promptCustomRecipe() {
  const name = prompt("Enter your recipe name:");
  if (!name) return;
  const ing = prompt("Enter ingredients (space-separated):");
  const steps = prompt("Enter steps (use ; to separate steps):");
  const newRecipe = {
    name,
    ingredients: ing.toLowerCase().split(" "),
    steps: steps.split(";"),
    image: "",
    type: "custom",
    rating: 0,
    searchCount: 0
  };
  recipes.push(newRecipe);
  saveRecipeToIndexedDB(newRecipe);
  addMessage(`✅ Custom recipe "${name}" saved!`, "bot");
}

// List of recipes
const recipes = [
  {
    name: "Tomato Pasta",
    ingredients: ["tomato", "pasta", "garlic"],
    steps: [
      "1.Boil the pasta.",
      "2.Cook tomatoes with garlic.",
      "3.Mix pasta with the sauce made of tomatoes and garlic."
    ],
    image: "https://www.sandyathome.com/wp-content/uploads/2016/07/IMG_8395.jpg",
    type: "lunch",
    rating: 0,
    searchCount: 0
  },
  {
    name: "Grilled Cheese",
    ingredients: ["bread", "cheese", "butter"],
    steps: [
      "1.Butter the bread.",
      "2.Put cheese between slices.",
      "3.Grill until golden brown."
    ],
    image: "https://cdn.loveandlemons.com/wp-content/uploads/2023/01/grilled-cheese-sandwich-835x1024.jpg",
    type: "breakfast",
    rating: 0,
    searchCount: 0
  },
  {
    name: "Omelette",
    ingredients: ["eggs", "onion", "salt", "pepper"],
    steps: [
      "1.Crack the eggs into a bowl.",
      "2.Add chopped onion, salt, tomatoes, and pepper.",
      "3.Whisk and pour into a pan.",
      "4.Cook until set on both sides."
    ],
    image: "https://tse4.mm.bing.net/th?id=OIP.z7hcZAOXHxsEfmpL1JhFzAHaE8&pid=Api&P=0&h=180",
    type: "breakfast",
    rating: 0,
    searchCount: 0
  },
  {
    name: "Pancakes",
    ingredients: ["egg", "flour", "sugar", "baking powder","milk"],
    steps: [
      "1.Place flour, baking powder, sugar and salt in a bowl, whisk to combine.",
      "2.Add egg, milk and vanilla. Whisk until lump free – no longer than 30 seconds.",
      "3.Heat a non stick skillet – use medium heat if you have a strong stove, medium high if you have a weak one. Add a tiny bit of butter (about 1/2 tsp) and swirl to melt. Use paper towel to mostly wipe the butter off (this is the trick to avoid a dodgy 1st pancake).",
      "4.Pour 1/4 cup batter into the middle of the fry pan (I use a slightly heaped ice cream scoop with lever, standard is 1/4 cup).",
      "5.Swirl pan lightly to spread or use the ice cream scoop edge to spread into 11cm / 4.5″ circle (ruler is a must) (joking!).",
      "6.When bubbles rise to the surface (see video), flip and cook the other side until golden.",
      "7.Remove and keep warm in a low oven.",
      "8.Use more butter every 2 to 3 pancakes – depends how good your non stick coating is.",
      "9.Serve with toppings of choice!"
    ],
    image: "https://tse3.mm.bing.net/th?id=OIP.kDl2JuPZ3tRVTWGQq260bgHaKX&pid=Api&P=0&h=180",
    type: "breakfast",
    rating: 0,
    searchCount: 0
  },
  {
    name: "Pizza",
    ingredients: ["tomato ketchup", "flour", "tomato", "baking powder","onion","chilli flakes","olive oil"],
    steps: [
      "1.Prepare the pizza dough",
      "2.Prepare the pizza base",
      "3.Chop all the vegetables for the pizza",
      "4.Spread the sauce and veggies on the base",
      "5.Bake the pizza at 250 degree Celsius for 10 minutes"
    ],
    image: "https://tse4.mm.bing.net/th?id=OIP.ESp35ufawsPikvcTrUmPPgHaLH&pid=Api&P=0&h=180",
    type: "lunch",
    rating: 0,
    searchCount: 0
  },
  {
    name: "momos",
    ingredients: ["salt", "flour", "water ", "garlic","onion","ginger","olive oil","chilli","carrot","cabbag","pepper"],
    steps: [
      "1.firstly, prepare stuffing by heating 3 tsp oil and saute 3 clove garlic, 1 inch ginger and 2 chilli.",
      "2.also, add 2 tbsp spring onion and saute on high flame.",
      "3.further, add 1 cup carrot and 2 cup cabbage. stir fry on high flame.",
      "4.now add ½ tsp pepper and ½ tsp salt",
      "5.additionally, 2 tbsp spring onion and stuffing mixture is ready.",
      "6.further, pinch a small ball sized momos dough and flatten.",
      "7.now dust with some maida and start to roll using a rolling pin.",
      "8.roll to almost medium thin circle. around 4 – 5 inch in diameter. make sure you roll from sides and keep the centre slightly thick.",
      "9.now place a heaped tbsp of prepared stuffing in the centre.",
      "10.tart pleating the edges slowly and gather everything.",
      "11.press in middle and seal the momos forming a bundle.",
      "12.heat a steamer and arrange the momos in the tray without touching each other.",
      "13.furthermore, steam momos for 10-12 minutes or till shiny sheen appears over it.",
      "14.finally, veg momos recipe is ready to enjoy with momos chutney."
    ],
    image: "https://tse4.mm.bing.net/th?id=OIP.FHmX3vLEDmFes0t9ZRGPnwHaE8&pid=Api&P=0&h=180",
    type: "lunch",
    rating: 0,
    searchCount: 0
  },

];

let recentIngredients = [];

// Load chat and dark mode
window.onload = () => {
  const history = JSON.parse(localStorage.getItem("chatHistory")) || [];
  history.slice(-50).forEach(msg => addMessage(msg.text, msg.sender));
  const darkMode = localStorage.getItem("darkMode") === "true";
  if (darkMode) document.body.classList.add("dark");
  document.getElementById("userInput").focus();
};

// Add message to chat
function addMessage(text, sender) {
  const chatbox = document.getElementById("chatbox");

  const wrapper = document.createElement("div");
  wrapper.className = `bubble-wrapper ${sender}`;

  const bubble = document.createElement("div");
  bubble.className = `bubble ${sender}`;
  bubble.innerHTML = text;

  const timestamp = document.createElement("div");
  timestamp.className = "timestamp";
  const now = new Date();
  timestamp.innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  wrapper.appendChild(bubble);
  wrapper.appendChild(timestamp);
  chatbox.appendChild(wrapper);

  wrapper.scrollIntoView({ behavior: "smooth" });

  const history = JSON.parse(localStorage.getItem("chatHistory")) || [];
  history.push({ text, sender });
  if (history.length > 50) history.shift();
  localStorage.setItem("chatHistory", JSON.stringify(history));
}

function handleUserInput() {
  const input = document.getElementById("userInput");
  const userText = input.value.trim();
  if (!userText) return;

  addMessage(userText, "user");
  input.value = "";
  input.focus();

  setTimeout(() => addMessage("⏳ CookMate is thinking...", "bot"), 100);

  setTimeout(() => {
    document.querySelectorAll(".bubble.bot").forEach(el => {
      if (el.innerHTML === "⏳ CookMate is thinking...") el.parentElement.remove();
    });

    const filter = document.getElementById("mealFilter").value;
    const matchedByName = recipes.find(r => userText.toLowerCase().includes(r.name.toLowerCase()));

    if (/add custom recipe/i.test(userText)) return promptCustomRecipe();

    if (/step[- ]?by[- ]?step/i.test(userText) && matchedByName) {
      const steps = matchedByName.steps.map((s, i) => `${i + 1}. ${s}`).join("<br>");
      addMessage(`👣 Step-by-step for <strong>${matchedByName.name}</strong>:<br>${steps}`, "bot");
      return;
    }

    if (matchedByName) {
      matchedByName.searchCount++;
      showRecipe(matchedByName);
      return;
    }

    recentIngredients = userText.toLowerCase().split(" ").map(w => w.trim());

    const matched = findRecipes(userText, filter).sort((a, b) => b.matchedCount - a.matchedCount);
    if (matched.length) {
      matched.slice(0, 4).forEach(r => {
        r.searchCount++;
        showRecipe(r);
      });
    } else {
      addMessage("😕 No matching recipes found. Here are some popular ones:", "bot");
      recipes.sort((a, b) => b.searchCount - a.searchCount).slice(0, 3).forEach(r => showRecipe(r));
    }
  }, 1000);
}

function showRecipe(recipe) {
  let message = "";
  if (recipe.image) {
    message += `<img src="${recipe.image}" class="recipe-image"><br>`;
  }
  message += `🍽️ <strong>${recipe.name}</strong> <button onclick="addToFavorites('${recipe.name}')">❤️</button><br>`;
  message += recipe.steps.map(step => highlightMatched(step, recipe.matchedIngredients || recentIngredients)).join("<br>");
  message += `<br>Rate this recipe: `;
  for (let i = 1; i <= 5; i++) {
    message += `<span onclick="rateRecipe('${recipe.name}', ${i})">${i <= recipe.rating ? '⭐' : '☆'}</span>`;
  }
  addMessage(message, "bot");
}

function findRecipes(inputText, mealFilter) {
  const inputSet = new Set(inputText.toLowerCase().split(" ").map(w => w.trim()));
  return recipes
    .filter(r => !mealFilter || r.type === mealFilter)
    .map(recipe => {
      const matched = recipe.ingredients.filter(i => inputSet.has(i));
      return { ...recipe, matchedCount: matched.length, matchedIngredients: matched };
    })
    .filter(r => r.matchedCount > 0);
}

function highlightMatched(text, ingredients) {
  let highlighted = text;
  ingredients.forEach(ing => {
    const regex = new RegExp(`\\b(${ing})\\b`, 'gi');
    highlighted = highlighted.replace(regex, `<mark>$1</mark>`);
  });
  return highlighted;
}

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';
recognition.interimResults = false;

function startVoiceInput() {
  recognition.start();
  addMessage("🎤 Listening...", "bot");
}

recognition.onresult = (event) => {
  document.getElementById("userInput").value = event.results[0][0].transcript;
  handleUserInput();
};

recognition.onerror = () => {
  addMessage("❌ Couldn't catch that. Try again.", "bot");
};

function toggleDarkMode() {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("darkMode", isDark);
}

function addToFavorites(name) {
  let favs = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!favs.includes(name)) {
    favs.push(name);
    localStorage.setItem("favorites", JSON.stringify(favs));
    addMessage(`❤️ "${name}" added to your favorites.`, "bot");
  } else {
    addMessage(`⚠️ "${name}" is already in your favorites.`, "bot");
  }
}

function rateRecipe(name, stars) {
  const recipe = recipes.find(r => r.name === name);
  if (recipe) {
    recipe.rating = stars;
    addMessage(`⭐ You rated "${name}" ${stars} star(s).`, "bot");
  }
}

function showFavorites() {
  let favs = JSON.parse(localStorage.getItem("favorites")) || [];
  if (favs.length === 0) {
    addMessage("⭐ You don't have any favorites yet.", "bot");
    return;
  }

  const sorted = favs.map(name => recipes.find(r => r.name === name)).filter(Boolean).sort((a, b) => b.rating - a.rating);
  sorted.forEach(recipe => {
    let message = "";
    if (recipe.image) {
      message += `<img src="${recipe.image}" class="recipe-image"><br>`;
    }
    message += `⭐ <strong>${recipe.name}</strong><br>`;
    message += recipe.steps.join("<br>");
    message += `<br><button onclick="removeFromFavorites('${recipe.name}')">🗑 Remove from favorites</button>`;
    addMessage(message, "bot");
  });
}

function removeFromFavorites(name) {
  let favs = JSON.parse(localStorage.getItem("favorites")) || [];
  favs = favs.filter(fav => fav !== name);
  localStorage.setItem("favorites", JSON.stringify(favs));
  addMessage(`❌ "${name}" removed from your favorites.`, "bot");
}

function clearChat() {
  if (confirm("🗑️ Are you sure you want to clear the chat history?")) {
    localStorage.removeItem("chatHistory");
    document.getElementById("chatbox").innerHTML = "";
    addMessage("🧹 Chat cleared!", "bot");
  }
}

function exportFavorites(format = "json") {
  const favs = JSON.parse(localStorage.getItem("favorites")) || [];
  const favoriteRecipes = recipes.filter(r => favs.includes(r.name));

  if (format === "json") {
    const json = JSON.stringify(favoriteRecipes, null, 2);
    downloadFile(json, "favorites.json", "application/json");
  } else {
    const text = favoriteRecipes.map(r =>
      `🍽️ ${r.name}\nIngredients: ${r.ingredients.join(", ")}\nSteps:\n- ${r.steps.join("\n- ")}\n\n`
    ).join("");
    downloadFile(text, "favorites.txt", "text/plain");
  }
}

function downloadFile(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}
