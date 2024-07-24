// identifies that the game is not yet active and the pet is not alive
let gameActive = false;



// Get references to the HTML elements
// Name button elements
const randomNameButton = document.getElementById('random-name');
const submitNameButton = document.getElementById('submit-name');
// Action button elements
const actionButtons = document.getElementById('action-buttons');
const eatButton = document.getElementById('eat-button');
const sleepButton = document.getElementById('sleep-button');
const playButton = document.getElementById('play-button');
const washButton = document.getElementById('wash-button');
const petImage = document.getElementById('pet-image');
// Setting button elements
const saveButton = document.getElementById('save');
const loadButton = document.getElementById('load');
const resetButton = document.getElementById('reset');
const settingButtons = document.getElementById('setting-buttons');

// H1 Element
let newTitle = document.getElementById("title");

// Textbox input
const petNameInput = document.getElementById("pet-name-input");

// Name box
const nameElements = document.getElementById('name');

// Pet stats display
const petStatsDisplay = document.getElementById('stats');

// Elements for each stat display
const hungerStateElement = document.getElementById('hunger-state');
const energyStateElement = document.getElementById('energy-state');
const happinessStateElement = document.getElementById('happiness-state');
const cleanlinessStateElement = document.getElementById('cleanliness-state');


// Add event listeners to the buttons
// Name button elements
randomNameButton.addEventListener('click', getRandomName);
submitNameButton.addEventListener('click', givePetName);
//Action button elements
eatButton.addEventListener('click', feedPet);
sleepButton.addEventListener('click', sleepPet);
playButton.addEventListener('click', playPet);
washButton.addEventListener('click', washPet);
//Setting Buttons
saveButton.addEventListener('click', saveGame);
loadButton.addEventListener('click', loadGame);
resetButton.addEventListener('click', resetGame);
// Mouse hover
petImage.addEventListener('click', ticklePet);


// Function to update pet name
function givePetName(){

  // Checks the name textbox is not blank
  if (petNameInput.value !== "") {
  
  // Get input from text box and update pet name 
  const petNameInputValue = petNameInput.value;
  // Add new pet name to title
  newTitle.innerHTML = `My Virtual Pet, ${petNameInputValue}!`;
  
  // Hide name elements
  nameElements.classList = 'hidden';
  
  // Show game action buttons
  actionButtons.classList.remove('hidden');
  actionButtons.classList.add('reveal');
  
  // Show setting butons
  settingButtons.classList.remove('hidden');
  settingButtons.classList.add('reveal');
  
  // Show pet current state display
  petStatsDisplay.classList.remove('hidden');
  petStatsDisplay.classList.add('reveal');
  
  // Start game
  gameActive = true;
  
  reducePetState();
  }
  else{
    alert("Your pet needs a name!");

  }  
}


// Function to generate random name
function getRandomName(){
  
  // Array of names
  const names = ['Daryl', 'Fizz', 'Bonez', 'Teddy', 'Toby', 'Fluffy', 'Gizmo', 'Grogu', 'Coco', 'Bella', 'Charlie', 'Luna', 'Max', 'Milo', 'Rosie', 'Sunny', 'Pixi', 'Cuddles', 'Frog', 'Crumbs', 'Kiki', 'Biscuit', 'Cookie', 'Mochi', 'Kirby', 'Tammy', 'Tiki', 'Daisy', 'Bug', 'Kitty', 'Marble', 'Frogosaur', 'Forg', 'Frogbopulos Michael', 'Princess']

  // Select a random index from the array
  const randomIndex = Math.floor(Math.random() * names.length);

  // Get the random name based on the random index
  const randomName = names[randomIndex];
  
  // Put name into textbox placeholder
  petNameInput.value = randomName;
}


// Object to reflect pet wellbeing status
let petState = {
  hunger: 10,
  energy: 10,
  happiness: 10,
  cleanliness: 10
};


// Function to update pet stats, change image and colour depedning on mood
function updateDisplayedPetState() {
  
  document.getElementById('hunger-state').textContent = petState.hunger;
  document.getElementById('energy-state').textContent = petState.energy;
  document.getElementById('happiness-state').textContent = petState.happiness;
  document.getElementById('cleanliness-state').textContent = petState.cleanliness;
  
  const sadImageUrl = 'images/frogStates/sad.png';
  const madImageUrl = 'images/frogStates/mad.png';
    
  // Update the colour/image of each stat display based on its value
  if (petState.hunger <= 2) {
    hungerStateElement.style.color = 'red';
    petImage.src = sadImageUrl;
  } else if (petState.hunger <= 4) {
    hungerStateElement.style.color = 'yellow';
    petImage.src = madImageUrl;
  } else {
    hungerStateElement.style.color = 'green';
  }

  if (petState.energy <= 2) {
    energyStateElement.style.color = 'red';
    petImage.src = sadImageUrl;
  } else if (petState.energy <= 4) {
    energyStateElement.style.color = 'yellow';
    petImage.src = madImageUrl;
  } else {
    energyStateElement.style.color = 'green';
  }
  if (petState.happiness <= 2) {
    happinessStateElement.style.color = 'red';
    petImage.src = sadImageUrl;
  } else if (petState.happiness <= 4) {
    happinessStateElement.style.color = 'yellow';
    petImage.src = madImageUrl;
  } else {
    happinessStateElement.style.color = 'green';
  }

  if (petState.cleanliness <= 2) {
    cleanlinessStateElement.style.color = 'red';
    petImage.src = sadImageUrl;
  } else if (petState.cleanliness <= 4) {
    cleanlinessStateElement.style.color = 'yellow';
    petImage.src = madImageUrl;
  } else {
    cleanlinessStateElement.style.color = 'green';
  }
};


// Function to reduce pet well-being stats
function reducePetState() {
  if (gameActive === true) {
    // Decrement the pet's states by 1 and ensure they don't go below 0
    petState.hunger = Math.max(petState.hunger - 1, 0);
    petState.energy = Math.max(petState.energy - 1, 0);
    petState.happiness = Math.max(petState.happiness - 1, 0);
    petState.cleanliness = Math.max(petState.cleanliness - 1, 0);
    
    updateDisplayedPetState()
    
     if (petState.hunger === 0){     
       petDeath();
     }
  }
}

  
  // Call the reducePetState function every 3 seconds 
  setInterval(reducePetState, 3000);


// Function to feed pet
function feedPet(){

  // Add 5 points to the pet's hunger score
  petState.hunger = Math.min(petState.hunger + 5, 10);

  // Update the displayed pet status on screen
  updateDisplayedPetState();
  
  // Update image for this action
  const eatingImageUrl = 'images/frogStates/eat.png'; 
  petImage.src = eatingImageUrl;
  
  // Reset to default image
  resetDefaultImage();
}


// Function to put pet to sleep
function sleepPet(){
  
  petState.energy = Math.min(petState.energy + 5, 10);

  updateDisplayedPetState();

  const sleepImageUrl = 'images/frogStates/sleep.png'; 
  petImage.src = sleepImageUrl;

  resetDefaultImage();
}


// Function to play with pet (Happiness)
function playPet(){
  
  petState.happiness = Math.min(petState.happiness + 5, 10);

  updateDisplayedPetState();

  const playImageUrl = 'images/frogStates/play.png'; 
  petImage.src = playImageUrl;

  resetDefaultImage();
}


// Function to clean pet
function washPet(){

  petState.cleanliness = Math.min(petState.cleanliness + 10, 10);

  updateDisplayedPetState();

  const playImageUrl = 'images/frogStates/wash.png'; 
  petImage.src = playImageUrl;

  resetDefaultImage();
}

// Pet death function
function petDeath(){

  // Stop Game
  gameActive = false;

  const deadImageUrl = 'images/frogStates/death.png'; 
  petImage.src = deadImageUrl;
  const petName = petNameInput.value; 
  newTitle.innerHTML = `Oh no, ${petName} Died!`;
  
  disableActionButtons()
  
}

function disableActionButtons(){

  // Disable all the action buttons
  eatButton.disabled = true;
  sleepButton.disabled = true;
  playButton.disabled = true;
  washButton.disabled = true;

}

function enableActionButtons(){

// Enable all the action buttons
eatButton.disabled = false;
sleepButton.disabled = false;
playButton.disabled = false;
washButton.disabled = false;

}

function ticklePet(){
  
  if (gameActive) {
    petState.happiness = Math.min(petState.happiness + 3, 10);
    updateDisplayedPetState();
    const tickleImageUrl = 'images/frogStates/tickle.png'; 
    petImage.src = tickleImageUrl;
    setTimeout(function () {
      const defaultImageUrl = 'images/frogStates/default.png';
      
      if (gameActive){
        petImage.src = defaultImageUrl;
      }
    }, 1000); 
  }
}

// Restore the pet image to the default after a few seconds
   function resetDefaultImage (defaultImageUrl, delay) {
    setTimeout(function () {
     if (gameActive){
       const defaultImageUrl = 'images/frogStates/default.png'; 
        petImage.src = defaultImageUrl;
      }
    }, 3000); // 3000 milliseconds (3 seconds)
   }


function resetGame(){
  
  // end game
  gameActive = false;
  
  resetPetStats()
  const defaultImageUrl = 'images/frogStates/default.png';
  petImage.src = defaultImageUrl;
  
   // Hide/show elements
  actionButtons.classList.remove('reveal');
  settingButtons.classList.remove('reveal');
  petStatsDisplay.classList.remove('reveal');
  nameElements.classList = ('reveal');
  actionButtons.classList.add('hidden');
  settingButtons.classList.add('hidden');
  petStatsDisplay.classList.add('hidden');

  newTitle.innerHTML = 'My Virtual Pet';
  petNameInput.value = '';
  petNameInput.placeholder = 'Give me a name';

  }

// Function to reset the pet's stats to 10
function resetPetStats() {
  petState.hunger = 10;
  petState.energy = 10;
  petState.happiness = 10;
  petState.cleanliness = 10;
  
  // Update the displayed pet status on screen
  updateDisplayedPetState();
  enableActionButtons()
}


function saveGame(){

  if(gameActive === false){
    alert('Game cannot be saved');
  }
  else{

  // Object that includes pets name & stats
  const gameData = {
    petName: petNameInput.value,
    petState: petState,
    currentPetImage: petImage.src,
    savedTitle: newTitle.innerHTML
  };

  // Convert gameState object to a JSON string
  const gameDataJSON = JSON.stringify(gameData);

  // Save the JSON string to localStorage
  localStorage.setItem('gameState', gameDataJSON);

  // Feedback to the user that the game is saved.
  alert('Game saved successfully!');
}
} 

function loadGame() { 

    // Get the petState JSON string from localStorage
    const gameStateJSON = localStorage.getItem('gameState');
  
    // Check if there is any saved data
    if (gameStateJSON) {

      gameActive = true;
      
      // Parse the JSON string back to an object 
      const loadedGameData = JSON.parse(gameStateJSON);

      enableActionButtons()
  
      // Update the pet details on screen
      petNameInput.value = loadedGameData.petName;
      newTitle.innerHTML = loadedGameData.savedTitle;
      petState = loadedGameData.petState;
      petImage.src = loadedGameData.currentPetImage
     
      updateDisplayedPetState();
  
      // Display feedback to the user that the game is loaded.
      alert('Game loaded successfully!');
    } else {
      // If there is no saved data, feedback to the user.
      alert('No saved game found.');
    }
} 