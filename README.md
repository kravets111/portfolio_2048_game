# "2048" is a single-player sliding tile puzzle video game.
  - [DEMO LINK](https://kravets111.github.io/portfolio_2048_game/)

## Core Technologies:

**Frontend Technologies:**

* **HTML5** – game structure with semantic tags
* **SCSS/Sass** – CSS preprocessor for styling
* **JavaScript ES6+** – game logic and interactivity
* **CSS Grid** – for laying out the game board
* **CSS Animations** – for animating tile appearance

## Architectural Approaches:

**Object-Oriented Programming:**

* **ES6 Classes** – `Game` class encapsulating the game logic
* **Module System** – `module.exports` and `require` for organizing code
* **Modular Architecture** – split into `Game.class.js` and `main.js`

**CSS Organization:**

* **BEM Methodology** – for naming classes (e.g., `game-header`, `field-cell`, `tile--2048`)
* **SCSS Features** – nesting, variables, mixins

## Functional Features:

**Game Logic:**

* **Game State Management** – tracking states (`idle`, `playing`, `win`, `lose`)
* **Score System** – calculating and storing the best score
* **Random Number Generation** – generating new tiles (2 or 4)
* **Matrix Operations** – handling a 2D array for the game board

**Event Handling:**

* **Keyboard Events** – handling arrow key presses (`ArrowLeft`, `ArrowRight`, etc.)
* **Button Events** – start and restart game actions

## Web Technologies:

**Local Storage:**

* **localStorage API** – storing the best score across game sessions

**DOM Manipulation:**

* **Dynamic Element Creation** – generating tiles via JavaScript
* **CSS Class Management** – adding/removing classes for styling
* **Position Calculations** – math-based positioning for tiles

## Animations & Effects:

**CSS Transitions:**

* **Transform Animations** – tile movement animation
* **Scale Effects** – animation for new tile appearance
* **Hover Effects** – interactive buttons

**JavaScript Animations:**

* **setTimeout** – controlling animation duration
* **Dynamic Positioning** – calculating positions for smooth transitions

## Mathematical Algorithms:

**Game Logic:**

* **Array Compression** – tile merging algorithm
* **Matrix Transformations** – rotating the matrix for different move directions
* **Collision Detection** – determining possible moves

The project is a fully functional implementation of the **2048 game**, built with pure JavaScript, CSS Grid for layout, animations, and localStorage for saving progress.

## Getting start project:

* **Clone the repository:**
* git clone https://github.com/kravets111/portfolio_2048_game.git
* git cd portfolio_2048_game

* **Install dependencies:**
* npm install

* **Run the project locally:**
* npm start
