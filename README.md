# Metrobi Challenge App

## Overview

This repository contains the Metrobi Challenge App, a technical challenge designed for a senior position at Metrobi. The app demonstrates solutions to various technical questions using React, JavaScript, and TypeScript.

## Project Structure

- **`src/`**: Contains the source code for the application.
- **`public/`**: Contains static files like images.
- **`README.md`**: This file.

## Questions and Solutions

### 1. Duplicate Items in an Array

**Question:** Write a JavaScript function that finds the duplicate items in any given array.

**Solution:**
function findDuplicates(arr) {
const seen = new Set();
const duplicates = new Set();

arr.forEach(item => {
if (seen.has(item)) {
duplicates.add(item);
} else {
seen.add(item);
}
});

return Array.from(duplicates);
}

### 2. Print Array Items with Increasing Delays

**Question:** Write an async JavaScript function that writes every item in any given array with 1, 2, 4, 8, ... seconds apart. Example: for [“a”, “b”, “c”, “d”], “a” is printed in 1 sec, “b” is printed in 2 seconds, “c” is printed in 4 seconds, etc.

**Solution:**
async function printWithDelays(arr) {
for (let i = 0; i < arr.length; i++) {
console.log(arr[i]);
await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) \* 1000));
}
}

### 3. React Flexbox Layout

**Question:** Write the necessary React code for generating a specific figure using flex.

**Solution:**
import React from 'react';
import { Box } from '@mui/material';

const FlexboxLayout = () => {
return (
<Box
sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
      }} >
<Box
sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }} >
<Box sx={{ width: '100px', height: '100px', backgroundColor: 'red' }} />
<Box sx={{ width: '100px', height: '100px', backgroundColor: 'blue' }} />
</Box>
<Box sx={{ display: 'flex', flexDirection: 'column' }}>
<Box sx={{ width: '100px', height: '100px', backgroundColor: 'green' }} />
<Box sx={{ width: '100px', height: '100px', backgroundColor: 'yellow' }} />
</Box>
</Box>
);
}

### 4. Proper Bracket Matching

**Question:** Write an efficient method that tells us whether or not an input string brackets ("{", "}", "(", ")", "[", "]") opened and closed properly. Example: “{[]}” => true, “{(])}” => false, “{([)]}” => false

**Solution:**
function isValidBrackets(s) {
const stack = [];
const mapping = { ')': '(', '}': '{', ']': '[' };

for (const char of s) {
if (mapping[char]) {
const topElement = stack.length === 0 ? '#' : stack.pop();
if (topElement !== mapping[char]) return false;
} else {
stack.push(char);
}
}

return stack.length === 0;
}

### 5. Egg Drop Problem

**Question:** A building has 100 floors. One of the floors is the highest floor an egg can be dropped from without breaking. If an egg is dropped from above that floor, it will break. If it is dropped from that floor or below, it will be completely undamaged and you can drop the egg again. Given two eggs, find the highest floor an egg can be dropped from without breaking, with as few drops as possible in the worst-case scenario.

**Solution:**
function eggDrop(eggs, floors) {
const dp = Array.from({ length: eggs + 1 }, () => Array(floors + 1).fill(0));

for (let i = 1; i <= eggs; i++) {
dp[i][0] = 0;
dp[i][1] = 1;
}

for (let j = 1; j <= floors; j++) {
dp[1][j] = j;
}

for (let i = 2; i <= eggs; i++) {
for (let j = 2; j <= floors; j++) {
dp[i][j] = Infinity;
for (let x = 1; x <= j; x++) {
dp[i][j] = Math.min(dp[i][j], 1 + Math.max(dp[i - 1][x - 1], dp[i][j - x]));
}
}
}

return dp[eggs][floors];
}

### 6. Zeno's Paradox Animation

**Question:** Write the code that animates “Zeno's Paradox of Achilles and the Tortoise” on an interface (we would like to see the paradox demonstrated).

**Solution:** This solution requires a more complex setup, including a canvas or animation library. The example below shows how you might set up a simple animation using CSS.

**HTML:**

<!DOCTYPE html>
<html>
<head>
  <style>
    .achilles, .tortoise {
      position: absolute;
      width: 50px;
      height: 50px;
      background-color: blue;
      border-radius: 50%;
    }
    .tortoise {
      background-color: green;
    }
    @keyframes move {
      from { left: 0; }
      to { left: 100%; }
    }
  </style>
</head>
<body>
  <div class="achilles"></div>
  <div class="tortoise"></div>
  <script>
    const achilles = document.querySelector('.achilles');
    const tortoise = document.querySelector('.tortoise');
    
    let distance = 0;
    function animate() {
      distance += 1;
      achilles.style.left = distance + '%';
      tortoise.style.left = distance / 2 + '%';
      if (distance < 100) {
        requestAnimationFrame(animate);
      }
    }
    
    animate();
  </script>
</body>
</html>

### 7. Maximum Value of Carrot Types

**Question:** Think that you have an unlimited number of carrots, but a limited number of carrot types. Also, you have one bag that can hold a limited weight. Each type of carrot has a weight and a price. Write a function that takes carrotTypes and capacity and return the maximum value the bag can hold. [Python or Javascript]

**Solution:**
function getMaxValue(carrotTypes, capacity) {
const dp = Array(capacity + 1).fill(0);

for (const carrot of carrotTypes) {
for (let i = carrot.kg; i <= capacity; i++) {
dp[i] = Math.max(dp[i], dp[i - carrot.kg] + carrot.price);
}
}

return dp[capacity];
}

## Project Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/rennanribas/metrobi-challenge-app.git
   ```

### Prerequisites

Make sure you have the following installed:

- Node.js (v14 or higher)
- npm (v6 or higher) or yarn (v1.22 or higher)

### Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/rennanribas/metrobi-challenge-app.git
cd metrobi-challenge-app
npm install
```

### Running the App

Run the reactapp:

```bash
npm start
```
