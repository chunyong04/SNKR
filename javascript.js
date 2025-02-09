document.addEventListener("DOMContentLoaded", function () {
  const featuredSneakers = document.getElementById("featured-sneakers");

  const sneakers = [
    { name: "Nike Air Max 97", price: "$180", image: "air-max-97.jpg" },
    { name: "Adidas Yeezy 700", price: "$250", image: "yeezy-700.jpg" },
    { name: "Puma Suede Classic", price: "$100", image: "puma-suede.jpg" },
    { name: "Jordan 4 Retro", price: "$280", image: "jordan-4.jpg" },
  ];

  sneakers.forEach((sneaker) => {
    const sneakerCard = document.createElement("div");
    sneakerCard.classList.add("sneaker-card");
    sneakerCard.innerHTML = `
          <img src="images/${sneaker.image}" alt="${sneaker.name}">
          <h3>${sneaker.name}</h3>
          <p class="price">${sneaker.price}</p>
      `;
    featuredSneakers.appendChild(sneakerCard);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const sneakerList = document.getElementById("sneaker-list");

  const sneakers = [
    {
      name: "Nike Dunk Low",
      brand: "nike",
      price: "$150",
      image: "nike-dunk-low.jpg",
    },
    {
      name: "Nike Air Jordan 1",
      brand: "nike",
      price: "$200",
      image: "jordan-1.jpg",
    },
    {
      name: "Adidas Yeezy 350 V2",
      brand: "adidas",
      price: "$220",
      image: "yeezy-350.jpg",
    },
    {
      name: "Adidas Superstar",
      brand: "adidas",
      price: "$120",
      image: "superstar.jpg",
    },
    { name: "Puma RS-X", brand: "puma", price: "$140", image: "puma-rsx.jpg" },
  ];

  function displaySneakers(filter) {
    sneakerList.innerHTML = "";
    sneakers
      .filter((sneaker) => filter === "all" || sneaker.brand === filter)
      .forEach((sneaker) => {
        const sneakerCard = document.createElement("div");
        sneakerCard.classList.add("sneaker-card");
        sneakerCard.innerHTML = `
                  <img src="images/${sneaker.image}" alt="${sneaker.name}">
                  <h3>${sneaker.name}</h3>
                  <p class="price">${sneaker.price}</p>
                  <button>Add to Cart</button>
              `;
        sneakerList.appendChild(sneakerCard);
      });
  }

  displaySneakers("all");

  window.filterSneakers = function (brand) {
    displaySneakers(brand);
    document
      .querySelectorAll(".filter-buttons button")
      .forEach((btn) => btn.classList.remove("active"));
    document
      .querySelector(`[onclick="filterSneakers('${brand}')"]`)
      .classList.add("active");
  };
});

function filterProducts(brand) {
  const products = document.querySelectorAll(".product");
  const buttons = document.querySelectorAll(".filter-btn, .market-filter-btn");
  buttons.forEach((btn) => btn.classList.remove("active"));

  const activeButton = event.target;
  if (activeButton.classList.contains("market-filter-btn")) {
    activeButton.classList.add("active");
  }

  document
    .querySelector(`button[onclick="filterProducts('${brand}')"]`)
    .classList.add("active");

  products.forEach((product) => {
    if (brand === "all" || product.dataset.brand === brand) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  function displayFavorites() {
    const favoritesGrid = document.querySelector(".favorites-grid");
    if (!favoritesGrid) return;

    favoritesGrid.innerHTML = "";
    if (favorites.length === 0) {
      favoritesGrid.innerHTML =
        "<p style='text-align:center;'>No favorites added yet.</p>";
      return;
    }

    favorites.forEach((item, index) => {
      const favItem = document.createElement("div");
      favItem.classList.add("favorite-item");
      favItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>${item.price}</p>
        <button class="remove-fav" data-index="${index}">Remove</button>
      `;
      favoritesGrid.appendChild(favItem);
    });
  }

  document.querySelectorAll(".add-to-favorites").forEach((button) => {
    button.addEventListener("click", function () {
      const productCard = this.closest(".product");
      const productName = productCard.querySelector("p").textContent;
      const productPrice = productCard.querySelector("span").textContent;
      const productImage = productCard.querySelector("img").src;

      const existingItem = favorites.find((item) => item.name === productName);
      if (existingItem) {
        favorites = favorites.filter((item) => item.name !== productName);
        this.classList.remove("favorited");
        alert(`${productName} removed from favorites.`);
      } else {
        favorites.push({
          name: productName,
          price: productPrice,
          image: productImage,
        });
        this.classList.add("favorited");
        alert(`${productName} added to favorites.`);
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));
      displayFavorites();
    });
  });

  const favoritesGrid = document.querySelector(".favorites-grid");

  if (favoritesGrid) {
    favoritesGrid.addEventListener("click", function (event) {
      if (event.target.classList.contains("remove-fav")) {
        const index = event.target.getAttribute("data-index");
        favorites.splice(index, 1);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        displayFavorites();
      }

      if (event.target.classList.contains("add-to-cart")) {
        const card = event.target.closest(".favorite-card");
        const name = card.querySelector("h3").textContent;
        const price = card
          .querySelector("p")
          .textContent.replace(/[^0-9.]/g, "");
        const image = card.querySelector("img").src;

        const cartItem = { name, price: parseFloat(price), image };
        cart.push(cartItem);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${name} added to cart.`);

        if (!cart.some((item) => item.name === name)) {
          cart.push(cartItem);
          localStorage.setItem("cart", JSON.stringify(cart));
          alert(`${name} added to cart.`);
        } else {
          alert("This item is already in your cart.");
        }
      }
    });
  }

  displayFavorites();

  let posts = JSON.parse(localStorage.getItem("communityPosts")) || [];

  document
    .getElementById("createPostBtn")
    .addEventListener("click", function () {
      const postForm = document.querySelector(".post-form");
      postForm.classList.toggle("hidden");
    });

  function sortPosts(criteria) {
    if (criteria === "newest") {
      posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    } else if (criteria === "oldest") {
      posts.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    } else if (criteria === "popular") {
      posts.sort((a, b) => b.likes - a.likes);
    }
    displayPosts();
  }

  document.querySelectorAll(".tabs .tab").forEach((tab, index) => {
    tab.addEventListener("click", function () {
      document
        .querySelectorAll(".tabs .tab")
        .forEach((btn) => btn.classList.remove("active"));

      this.classList.add("active");

      if (index === 0) {
        sortPosts("newest");
      } else if (index === 1) {
        sortPosts("oldest");
      } else if (index === 2) {
        sortPosts("popular");
      }
    });
  });

  sortPosts("newest");

  function displayPosts() {
    const postsList = document.querySelector(".posts-list");
    postsList.innerHTML = "";

    if (posts.length === 0) {
      postsList.innerHTML =
        "<p style='text-align:center;'>No posts yet. Be the first to share!</p>";
      return;
    }

    posts.forEach((post, index) => {
      const postDiv = document.createElement("div");
      postDiv.classList.add("post-card");

      postDiv.innerHTML = `
        <div class="post-image">
          <img src="${post.image}" alt="Post Image" />
        </div>
        <div class="post-details">
          <h3 class="post-title">${post.username || "Anonymous"}</h3>
          <p class="post-meta">${post.timestamp}</p>
          <p>${post.caption}</p>
          <div class="post-footer">
            <span class="likes">
              <img src="Icons/heart.jpg" alt="Like Icon" class="icon" />
              <span>${post.likes}</span>
            </span>
            <span class="comments-btn" data-index="${index}">View Comments (${
        post.comments ? post.comments.length : 0
      })
</span>
          </div>
        </div>
      `;

      const likeElement = postDiv.querySelector(".likes");
      likeElement.addEventListener("click", () => {
        post.likes++;
        localStorage.setItem("communityPosts", JSON.stringify(posts));
        displayPosts();
      });

      const commentsBtn = postDiv.querySelector(".comments-btn");
      commentsBtn.addEventListener("click", () => viewComments(index));

      postsList.appendChild(postDiv);
    });
  }

  function viewComments(postIndex) {
    const post = posts[postIndex];
    const comments = post.comments || [];

    const commentSection = document.createElement("div");
    commentSection.classList.add("comment-section");
    commentSection.innerHTML = `
      <h4>Comments</h4>
      <div class="comments-list">
        ${
          comments.length > 0
            ? comments
                .map(
                  (comment, commentIndex) =>
                    `<p class="comment-item">${comment} 
                      <span class="remove-comment" data-post="${postIndex}" data-comment="${commentIndex}">❌</span>
                    </p>`
                )
                .join("")
            : "<p>No comments yet. Be the first to comment!</p>"
        }
      </div>
      <textarea placeholder="Write a comment..." class="comment-input"></textarea>
      <button class="add-comment-btn">Add Comment</button>
      <button class="close-comments-btn">Close</button>
    `;

    document.body.appendChild(commentSection);

    const addCommentBtn = commentSection.querySelector(".add-comment-btn");
    addCommentBtn.addEventListener("click", () => {
      const commentInput = commentSection.querySelector(".comment-input");
      const comment = commentInput.value.trim();

      if (comment) {
        comments.push(comment);
        post.comments = comments;
        localStorage.setItem("communityPosts", JSON.stringify(posts));
        commentInput.value = "";
        viewComments(postIndex);
      }
    });

    commentSection.querySelectorAll(".remove-comment").forEach((removeBtn) => {
      removeBtn.addEventListener("click", (event) => {
        const postIndex = event.target.dataset.post;
        const commentIndex = event.target.dataset.comment;
        posts[postIndex].comments.splice(commentIndex, 1);
        localStorage.setItem("communityPosts", JSON.stringify(posts));
        viewComments(postIndex);
      });
    });

    const closeCommentsBtn = commentSection.querySelector(
      ".close-comments-btn"
    );
    closeCommentsBtn.addEventListener("click", () => {
      document.body.removeChild(commentSection);
    });
  }

  document
    .getElementById("submitPostBtn")
    .addEventListener("click", function () {
      const username = document.getElementById("username").value.trim();
      const caption = document.getElementById("postCaption").value.trim();
      const fileInput = document.getElementById("postImage");
      const file = fileInput.files[0];

      if (!file || !caption) {
        alert("Please provide an image and a caption.");
        return;
      }

      const reader = new FileReader();
      reader.onload = function () {
        const post = {
          username: username || "Anonymous",
          caption: caption,
          image: reader.result,
          timestamp: new Date().toLocaleString(),
          likes: 0,
          comments: [],
        };

        posts.unshift(post);
        localStorage.setItem("communityPosts", JSON.stringify(posts));

        document.getElementById("username").value = "";
        document.getElementById("postCaption").value = "";
        fileInput.value = "";

        displayPosts();
      };
      reader.readAsDataURL(file);
    });

  displayPosts();
}),
  document.addEventListener("DOMContentLoaded", function () {
    const raffleList = document.querySelector(".raffle-list");

    // Sample raffle data
    const raffles = [
      {
        name: "Nike Air Jordan 1 Retro High",
        image: "images/air-jordan-1-retro-high-og-shoes.png",
        date: "Closes: Feb 12, 2025",
        price: "$300",
      },
      {
        name: "Adidas Yeezy Boost 350 V2",
        image: "images/yeezy-350.jpg",
        date: "Closes: Feb 15, 2025",
        price: "$220",
      },
      {
        name: "Puma Suede Classic",
        image: "images/puma_suede.jpg",
        date: "Closes: Feb 18, 2025",
        price: "$180",
      },
    ];

    function displayRaffles() {
      raffles.forEach((raffle) => {
        const raffleItem = document.createElement("div");
        raffleItem.classList.add("raffle-item");
        raffleItem.innerHTML = `
              <img src="${raffle.image}" alt="${raffle.name}">
              <h3>${raffle.name}</h3>
              <p>${raffle.date}</p>
                <p>${raffle.price}</p>
              <button class="enter-btn" onclick="enterRaffle('${raffle.name}')">Enter Raffle</button>
          `;
        raffleList.appendChild(raffleItem);
      });
    }

    window.enterRaffle = function (sneaker) {
      alert(`You have entered the raffle for ${sneaker}!`);
    };

    displayRaffles();
  });
document.addEventListener("DOMContentLoaded", function () {
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const orderList = document.getElementById("order-list");

  // Sample user data
  const user = {
    name: "John Doe",
    email: "johndoe@email.com",
    orders: [],
  };

  // Display user info
  username.textContent = user.name;
  email.textContent = user.email;

  // Display order history
  user.orders.forEach((order) => {
    const li = document.createElement("li");
    li.textContent = order;
    orderList.appendChild(li);
  });
});

// Logout function
function logout() {
  alert("You have logged out.");
  window.location.href = "login.html";
}

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderProduct(item) {
  return `
    <div class="order-product">
      <img src="${item.image}" alt="${item.name}" class="order-image" />
      <p>${item.name} - $${parseFloat(item.price).toFixed(2)}</p>
    </div>
  `;
}

function displayCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalContainer = document.getElementById("cart-total");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartTotalContainer.textContent = "";
    return;
  }

  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-image" />
      <p>${item.name} - $${parseFloat(item.price).toFixed(2)}</p>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartItemsContainer.appendChild(itemDiv);
    total += parseFloat(item.price);
  });

  cartTotalContainer.textContent = `Total: $${total.toFixed(2)}`;
}

function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  updateCartCount();
}

function clearCart() {
  localStorage.setItem("cart", JSON.stringify([]));
  displayCart();
  updateCartCount();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = cart.length;
  }
}

function addToCart(productName, productPrice, productImage) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({
    name: productName,
    price: parseFloat(productPrice),
    image: productImage,
  });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${productName} has been added to the cart!`);
  updateCartCount();
}

function proceedToCheckout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Your cart is empty! Add items to proceed to checkout.");
    return;
  }

  const orderId = `SNKR-${Date.now()}`;
  const orderDate = new Date().toLocaleString();

  const order = {
    orderId,
    date: orderDate,
    items: cart,
  };

  const orderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];
  orderHistory.push(order);
  localStorage.setItem("orderHistory", JSON.stringify(orderHistory));

  window.location.href = "payment.html";
}

function displayOrderHistory(sortBy = "mostRecent") {
  const orderList = document.getElementById("order-list");
  const orderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];

  if (orderHistory.length === 0) {
    orderList.innerHTML = "<li>No orders found in your history.</li>";
    return;
  }

  orderHistory.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortBy === "mostRecent" ? dateB - dateA : dateA - dateB;
  });

  orderList.innerHTML = orderHistory
    .map(
      (order) => `
        <li class="order-item">
          <h3>Order ID: ${order.orderId}</h3>
          <p>Date: ${order.date}</p>
          <div class="order-products">
            ${order.items.map(renderProduct).join("")}
          </div>
        </li>
      `
    )
    .join("");
}

function sortOrderHistory() {
  const sortOrder = document.getElementById("sort-order").value;
  displayOrderHistory(sortOrder);
}

window.onload = function () {
  if (document.getElementById("order-list")) {
    displayOrderHistory();
  }
  if (document.getElementById("cart-items")) {
    displayCart();
  }
  updateCartCount();
};

sneakerList.addEventListener("click", function (event) {
  if (event.target.classList.contains("add-to-favorites")) {
    const card = event.target.parentElement;
    const name = card.querySelector(".product-name").textContent;
    const priceText = card.querySelector(".price").textContent;
    const price = card
      .querySelector(".price")
      .textContent.replace(/[^0-9.]/g, "");
    const image = card.querySelector("img").src;

    const favoriteItem = { name, price: parseFloat(price), image };
    if (!favorites.some((item) => item.name === name)) {
      favorites.push(favoriteItem);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      displayFavorites();
    } else {
      alert("This item is already in your favorites.");
    }
  } else if (event.target.classList.contains("add-to-cart")) {
    const card = event.target.parentElement;
    const name = card.querySelector(".product-name").textContent;
    const priceText = card.querySelector(".price").textContent;
    const price = card
      .querySelector(".price")
      .textContent.replace(/[^0-9.]/g, "");
    const image = card.querySelector("img").src;

    const cartItem = { name, price: parseFloat(price), image };
    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} added to cart.`);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  renderCartItems();

  const confirmPaymentButton = document.getElementById("confirm-payment");
  confirmPaymentButton.addEventListener("click", function () {
    const cardholderName = document
      .getElementById("cardholder-name")
      .value.trim();
    const cardNumber = document.getElementById("card-number").value.trim();
    const expiryDate = document.getElementById("expiry-date").value.trim();
    const cvv = document.getElementById("cvv").value.trim();

    if (!cardholderName || !cardNumber || !expiryDate || !cvv) {
      document.getElementById("payment-status").innerText =
        "Please fill out all fields.";
      return;
    }

    document.getElementById("payment-status").innerText =
      "Processing payment...";
    setTimeout(() => {
      document.getElementById("payment-status").innerText =
        "Payment successful! Thank you for your purchase.";

      localStorage.removeItem("cart");
      renderCartItems();
    }, 3000);
  });
});
