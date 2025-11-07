function showSection(sectionId) {
    document.querySelectorAll('header,section').forEach(ele => ele.classList.remove('active'));
    if(sectionId === "home") {
      document.getElementById("home").classList.add('active');
    } else {
      document.getElementById(sectionId).classList.add('active');
    }
    document.querySelectorAll('.navigation a').forEach(link => link.classList.remove('active'));
    document.querySelector('.navigation a[data-section="'+sectionId+'"]').classList.add('active');
    window.scrollTo(0,0);
  }
  document.querySelectorAll('.navigation a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault(); 
      showSection(this.getAttribute('data-section'));
    });
  });
  showSection('home');
  
  const FOOD_IMAGES = {
    "Paneer Tikka": "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=80",
    "Chicken Wings": "https://media.istockphoto.com/id/1451323978/photo/baked-chicken-wings-with-sweet-chili-sauce-in-a-plate-black-background-top-view.webp?a=1&b=1&s=612x612&w=0&k=20&c=16utPxh1GnWO1lPSMPHAuKQWGvU_MEVa4_HIS4VapjE=",
    "Greek Salad": "https://images.unsplash.com/photo-1659270156961-323ea2afcd0a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGdyZWVrJTIwc2FsYWR8ZW58MHx8MHx8fDA%3D",
    "Fish Curry": "https://media.istockphoto.com/id/1091567206/photo/srilanka-spicy-fish-curry.webp?a=1&b=1&s=612x612&w=0&k=20&c=nyMZQD8kh8Roljj8rrWgQ0NIzuPz2x9qa-8TFVSFnQw=",
    "Mushroom Risotto": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    "Lamb Biryani": "https://media.istockphoto.com/id/1486585184/photo/mutton-biryani-close-up-image-in-a-restaurant-food-stock-photo.webp?a=1&b=1&s=612x612&w=0&k=20&c=zD0hKbESFjyIt7S40AGQkw4jHhuUWkIuEYeiSS9Mq1I=",
    "Chocolate Lava Cake": "https://media.istockphoto.com/id/1410882696/photo/molten-choco-ice-cream-served-in-a-dish-isolated-on-wooden-background-side-view-of-dessert.jpg?s=612x612&w=0&k=20&c=qSpGiyMSoZSwzSX0CZsLoaIXv9Hu9lgVHAkWUVKJ8Ic=",
    "Pasta Alfredo": "https://media.istockphoto.com/id/1398788293/photo/white-sauce-penne-pasta-directly-above-photo.webp?a=1&b=1&s=612x612&w=0&k=20&c=9ItdxVhC6rcTPNxq21TSPF9a1b14Q93EvSBSAFZsxe0=",
    "Spicy Chicken Pizza": "https://media.istockphoto.com/id/1043604390/photo/butter-chicken-pizza.webp?a=1&b=1&s=612x612&w=0&k=20&c=ZPtRBbcQDKIGQEdtAGaH4BwzshBFIL-IlIuRXXjzXYQ="
  };
  
  const DISHES = [
    { name: "Paneer Tikka", category: "veg", price: 150 },
    { name: "Chicken Wings", category: "nonveg", price: 250 },
    { name: "Greek Salad", category: "veg", special: true, price: 180 },
    { name: "Fish Curry", category: "nonveg", special: true, price: 280 },
    { name: "Mushroom Risotto", category: "veg", price: 220 },
    { name: "Lamb Biryani", category: "nonveg", price: 300 },
    { name: "Chocolate Lava Cake", category: "veg", special: true, price: 130 },
    { name: "Pasta Alfredo", category: "veg", price: 200 },
    { name: "Spicy Chicken Pizza", category: "nonveg", price: 270 }
  ];
  
  function showMenu(filter) {
    let filtered = DISHES;
    if(filter === "veg") filtered = DISHES.filter(x => x.category==="veg");
    else if(filter === "nonveg") filtered = DISHES.filter(x => x.category==="nonveg");
    else if(filter === "special") filtered = DISHES.filter(x => x.special);
    let innerHTML = filtered.map(dish =>
      `<div class="dish-card ${dish.category}${dish.special ? ' special' : ''}">
        <img class="dish-img" src="${FOOD_IMAGES[dish.name] || ''}" alt="${dish.name}">
        <div><b>${dish.name}</b></div>
        <div class="dish-type">${dish.category==="veg"?"Vegetarian":"Non-Vegetarian"}</div>
        <div style="color:#e27c19;font-weight:bold;">₹${dish.price}</div>
        ${dish.special?`<div class="dish-special">Today's Special!</div>`:""}
      </div>`
    ).join('');
    document.getElementById('menu-list').innerHTML = innerHTML;
    addJumpEffect(); 
  }
  
  showMenu('all');
  function addJumpEffect() {
    const menuList = document.getElementById('menu-list');
  
    const newMenuList = menuList.cloneNode(true);
    menuList.parentNode.replaceChild(newMenuList, menuList);
  
    newMenuList.addEventListener('click', function(e) {
      const dishCard = e.target.closest('.dish-card');
      if (!dishCard) return;
  
      dishCard.classList.add('jump-nudge');
  
      dishCard.addEventListener('animationend', () => {
        dishCard.classList.remove('jump-nudge');
      }, { once: true });
    });
  }
  
  document.getElementById("resForm").onsubmit = function(e) {
    e.preventDefault();
    document.getElementById("reserve-msg").textContent = "Reservation confirmed! See you soon.";
    setTimeout(function() {
      document.getElementById("reserve-msg").textContent = "";
      document.getElementById("resForm").reset();
    }, 3500);
  };
  