const axios = require('axios');

async function seedDatabase() {
  try {
    await axios('http://127.0.0.1:8001/api/inventory/seed');
    console.log('Seeding');
  } catch (error) {
    console.log("Error Can't Seed: Make Sure APP is Running");
    process.exit(1);
  }
}

let timerId = setInterval(seedDatabase, 1000);

// Stops Seeding
setTimeout(() => {
  clearInterval(timerId);
  console.log('Database Seeded');
}, 15000);
