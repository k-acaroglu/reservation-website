// The showSidebar function displays the sidebar when called
function showSidebar(event) {
  // Prevent the default action of the link (i.e., following the href attribute)
  event.preventDefault();
  // Select the sidebar element
  const sidebar = document.querySelector(".sidebar");
  // Set the display style of the sidebar to 'flex' to make it visible
  sidebar.style.display = "flex";
}

// The hideSidebar function hides the sidebar when called
function hideSidebar() {
  // Select the sidebar element
  const sidebar = document.querySelector(".sidebar");
  // Set the display style of the sidebar to 'none' to hide it
  sidebar.style.display = "none";
}

function toggleSwitch(event) {
  event.preventDefault();
  let element = document.body;
  element.classList.toggle("dark-mode");
}

// Get elements for easy access
const reservationForm = document.getElementById("reservationForm");
const reservationGrid = document.getElementById("reservationGrid");

// When the submit reservation button is pressed
reservationForm.addEventListener("submit", function (event) {
  // Get parameters of reservation
  var params = {
    name: document.getElementById("name").value,
    date: document.getElementById("date").value,
    time: document.getElementById("time").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    peopleCount: parseInt(document.getElementById("peopleCount").value, 10),
  };

  // Clear the grid
  reservationGrid.innerHTML = "";
  event.preventDefault();
  createGrid(params);

  // Send mail
  emailjs.send("service_sf63f54", "template_wj3qj0w", params).then(
    function () {
      alert("Reservation confirmed! A confirmation email has been sent.");
    },
    function () {
      alert("Failed to send confirmation email.");
    }
  );
});

// Function for creating grid
function createGrid(params) {
  var peopleCount = params.peopleCount;
  // Create an array for future grid
  var grid = [];

  // First row
  grid.push([]);
  for (let i = 0; i < Math.ceil(peopleCount / 2); i++) {
    grid[0].push("chair");
  }
  // Second row
  grid.push([]);
  for (let i = 0; i < Math.ceil(peopleCount / 2); i++) {
    grid[1].push("table");
  }
  // Third row
  grid.push([]);
  for (let i = 0; i < peopleCount - Math.ceil(peopleCount / 2); i++) {
    grid[2].push("chair");
  }

  // Convert the array into a grid with 2 inner loops
  // Rows
  grid.forEach((row) => {
    const rowElement = document.createElement("div");
    rowElement.classList.add("gridRow");

    // Items (Columns)
    row.forEach((item) => {
      const gridItem = document.createElement("div");
      gridItem.classList.add("gridItem");
      gridItem.classList.add(item);
      rowElement.appendChild(gridItem);
    });

    // Create the grid (append it to the HTML element)
    reservationGrid.appendChild(rowElement);
  });
}
