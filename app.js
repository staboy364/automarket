const listings = [];

const postForm = document.getElementById('postForm');
const listingsContainer = document.getElementById('listings');

postForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const fd = new FormData(postForm);
  const data = Object.fromEntries(fd.entries());

  listings.push(data);
  render(listings);
  sendToWhatsApp(data);

  postForm.reset();
});

function render(list) {
  listingsContainer.innerHTML = '';
  list.forEach((item) => {
    const div = document.createElement('div');
    div.className = 'listing-card';
    div.innerHTML = `
      <img src="${item.photo}" alt="${item.title}">
      <h3>${item.title}</h3>
      <p><b>${item.category.toUpperCase()}</b> • ${item.model}</p>
      <p>${item.price} • ${item.location}</p>
      <p>${item.desc}</p>
      <a class="whatsapp-btn" href="${waLink(item.phone, item.title)}" target="_blank">Contact on WhatsApp</a>
    `;
    listingsContainer.appendChild(div);
  });
}

function waLink(phone, title) {
  const text = encodeURIComponent(`Hi, I'm interested in: ${title}`);
  return `https://wa.me/${phone}?text=${text}`;
}

function sendToWhatsApp(data) {
  const msg = `
New ${data.category.toUpperCase()} Listing:
${data.title}
Model: ${data.model}
Price: ${data.price}
Location: ${data.location}
Description: ${data.desc}
Photo: ${data.photo}
  `;
  console.log("Send this to WhatsApp manually:", msg);
}

// Filter buttons
document.getElementById('filterAll').onclick = () => render(listings);
document.getElementById('filterCars').onclick = () => render(listings.filter(l => l.category === 'car'));
document.getElementById('filterParts').onclick = () => render(listings.filter(l => l.category === 'part'));
