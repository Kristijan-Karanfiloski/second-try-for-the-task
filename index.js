const loadButton = document.querySelector(".button");
const layoutContainer = document.querySelector(".layout-placeholder");
const prevewContainer = document.querySelector(".preview");
const input = document.getElementById("cardBackgroundColor");
const cardSpaceBetween = document.getElementById("cardSpaceBetween");
const lightThemeRadio = document.getElementById("lightTheme");
const darkThemeRadio = document.getElementById("darkTheme");
// const allRadio = document.getElementById("all");
// const instagramRadio = document.getElementById("instagram");
// const facebookRadio = document.getElementById("facebook");
// const twitterRadio = document.getElementById("twitter");
const radioInputs = document.querySelectorAll('input[name="filterBySource"]');

fetch("./cards.json")
  .then((response) => response.json())
  .then((cards) => {
    localStorage.setItem("cards", JSON.stringify(cards));
    // console.log(cards);
  });

// CONTROL HOW MANY CARDS ARE DISPLAYED INITIALY ON PAGE

let initialItems = 4;

// CONTROL HOW MANY CARD ARE GONNA BE DISPLAYED AFTER CLICKING LOAD MORE

let loadItems = 4;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// allRadio.addEventListener("change", () => {
//   filterCards("all");
// });

// instagramRadio.addEventListener("change", () => {
//   filterCards("instagram");
// });

// facebookRadio.addEventListener("change", () => {
//   filterCards("facebook");
// });

// twitterRadio.addEventListener("change", () => {
//   filterCards("twitter");
// });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FUNCTION TO DISPLAY THE FIRST SET OF CARDS

function loadInitialCards() {
  let cards = JSON.parse(localStorage.getItem("cards"));

  let markup = "";
  let counter = 0;

  for (let card of cards) {
    if (counter < initialItems) {
      markup += `
      <div class="card" data-source-type=${card.source_type}>
  <div class="header">
    <div class="user-name">
      <img class="profile-img" src="${card.profile_image}" alt="Profile Icon" />
      <div class="name">
        ${card.name}
        <br />
        <span class="date">${card.date}</span>
      </div>
    </div>

    <div class="social-icon">
     
      <img src="${"./icons/instagram-logo.svg"}" alt="icon-hearth" />
    </div>
  </div>
  <div class="image">
    <img src="${card.image}" alt="Card Image" />
  </div>
  <div class="text">
    <p class="description">${card.caption}</p>
  </div>
  <div class="actions">
    <div class="like">
      <img id="heart-icon" src="${"./icons/heart.svg"}" alt="icon-hearth" />
      <span class="like-count">${card.likes}</span>
    </div>
  </div>
</div>

  `;
    }
    counter++;
  }

  let cardDiv = document.createElement("div");
  cardDiv.classList.add("card__wrapper");
  layoutContainer.insertBefore(cardDiv, loadButton);
  cardDiv.innerHTML = markup;
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // FUNCTION FOR THE LIKE BUTTON
  const heartIcons = document.querySelectorAll("#heart-icon");
  const likeCounts = document.querySelectorAll(".like-count");

  heartIcons.forEach((heartIcon, index) => {
    heartIcon.addEventListener("click", () => {
      if (heartIcon.src.endsWith("heart.svg")) {
        heartIcon.src = "./icons/red-heart-11121.svg";
        likeCounts[index].textContent++;
      } else {
        heartIcon.src = "./icons/heart.svg";
        likeCounts[index].textContent--;
      }
    });
  });

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //FUNCTION TO CHANGE BACKGROUND OF THE CARDS

  let card = document.querySelectorAll(".card");
  card.forEach((card) => {
    lightThemeRadio.addEventListener("change", () => {
      card.classList.remove("card--dark__theme");
      card.classList.add("card--light__theme");
    });

    darkThemeRadio.addEventListener("change", () => {
      card.classList.remove("card--light__theme");
      card.classList.add("card--dark__theme");
    });
  });

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // CHANGE THE BACKGROUND COLOR USING THE INPUT

  input.addEventListener("change", () => {
    const color = input.value;
    card.forEach((cardItem) => {
      cardItem.style.backgroundColor = color;
    });
  });

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Add event listener to radio inputs
  radioInputs.forEach((input) => {
    input.addEventListener("change", () => {
      const selectedSource = input.value;

      // Loop through all cards and show or hide based on source type
      card.forEach((card) => {
        const cardSourceType = card.dataset.sourceType;

        if (selectedSource === "all" || selectedSource === cardSourceType) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

loadInitialCards();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function loadData() {
  let cards = JSON.parse(localStorage.getItem("cards"));
  let currentDisplayedItems = document.querySelectorAll(".card").length;
  console.log(cards);

  let markup = "";
  let counter = 0;
  for (let card of cards) {
    if (
      counter >= currentDisplayedItems &&
      counter < loadItems + currentDisplayedItems
    ) {
      markup += `

      <div class="card">
  <div class="header" ">
    <div class="user-name">
      <img class="profile-img" src="${card.profile_image}" alt="Profile Icon" />
      <div class="name">
        ${card.name}
        <br />
        <span class="date">${card.date}</span>
      </div>
    </div>

    <div class="social-icon">
      <img src="${"./icons/instagram-logo.svg"}" alt="icon-hearth" />
    </div>
  </div>
  <div class="image">
    <img src="${card.image}" alt="Card Image" />
  </div>
  <div class="text">
    <p class="description">${card.caption}</p>
  </div>
  <div class="actions">
    <div class="like">
      <img id="heart-icon" src="${"./icons/heart.svg"}" alt="icon-hearth" />
      <span class="like-count">${card.likes}</span>
    </div>
  </div>
</div>

			`;
    }
    counter++;
  }

  let cardWrapper = document.querySelector(".card__wrapper");
  cardWrapper.insertAdjacentHTML("beforeend", markup);

  if (document.querySelectorAll(".card").length == cards.length) {
    loadButton.style.display = "none";
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // FUNCTION FOR THE LIKE BUTTON

  const heartIcons = document.querySelectorAll("#heart-icon");
  const likeCounts = document.querySelectorAll(".like-count");

  console.log(likeCounts);

  heartIcons.forEach((heartIcon, index) => {
    heartIcon.addEventListener("click", () => {
      if (heartIcon.src.endsWith("heart.svg")) {
        heartIcon.src = "./icons/red-heart-11121.svg";
        likeCounts[index].textContent++;
      } else {
        heartIcon.src = "./icons/heart.svg";
        likeCounts[index].textContent--;
      }
    });
  });

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // FUNCITON TO CHANGE BACKGROUND COLORS OF CARDS

  let card = document.querySelectorAll(".card");
  card.forEach((card) => {
    lightThemeRadio.addEventListener("change", () => {
      card.classList.remove("card--dark__theme");
      card.classList.add("card--light__theme");
    });

    darkThemeRadio.addEventListener("change", () => {
      card.classList.remove("card--light__theme");
      card.classList.add("card--dark__theme");
    });
  });

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // CHANGE THE BACKGROUND COLOR USING THE INPUT

  input.addEventListener("change", () => {
    const color = input.value;
    card.forEach((cardItem) => {
      cardItem.style.backgroundColor = color;
    });
  });

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Add event listener to radio inputs
  radioInputs.forEach((input) => {
    input.addEventListener("change", () => {
      const selectedSource = input.value;

      // Loop through all cards and show or hide based on source type
      card.forEach((card) => {
        const cardSourceType = card.dataset.sourceType;

        if (selectedSource === "all" || selectedSource === cardSourceType) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

loadButton.addEventListener("click", loadData);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FUNCTION TO CHANGE THE GAP BETWEEN  THE CARDS

cardSpaceBetween.addEventListener("input", () => {
  document.documentElement.style.setProperty(
    "--card-gap",
    cardSpaceBetween.value
  );
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FUNCTION TO CHANGE THE COLUMNS OF THE CARDS
const numberOfColumns = document.getElementById("numberOfColumns");

numberOfColumns.addEventListener("change", () => {
  if (numberOfColumns.value === "dynamic") {
    layoutContainer.style.setProperty("--columns", "auto");
  } else {
    layoutContainer.style.setProperty("--columns", numberOfColumns.value);
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
