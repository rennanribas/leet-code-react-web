import React from 'react'
import { Typography, Box } from '@mui/material'
import MermaidChart from '../../MermaidChart'

const ExplanationQuestionFive: React.FC = () => {
  const flowChart = `
    graph TD
      Start["Start"] --> InputValidation{"Are Inputs Valid?"}
      InputValidation -- Yes --> Init["Initialize DP Table"]
      InputValidation -- No --> Error["Show Error Message"]
      
      Init --> BaseCases["Fill Base Cases"]
      BaseCases --> EggsLoop["Eggs Loop (i = 2 to eggs)"]
      EggsLoop --> FloorsLoop["Floors Loop (j = 2 to floors)"]
      FloorsLoop --> DropLoop["Drop Points Loop (x = 1 to j)"]
      DropLoop --> Calculate["Calculate min drops"]
      Calculate --> UpdateTable["Update DP Table"]
      UpdateTable --> |Next Floor| FloorsLoop
      FloorsLoop --> |Next Egg| EggsLoop
      EggsLoop --> GenerateMermaid["Generate Mermaid Code"]
      GenerateMermaid --> Result["Return Result"]

      subgraph "Initialization"
        Init --> |"Create 2D array (eggs+1 x floors+1)"| InitArray["eggFloor[eggs+1][floors+1]"]
        BaseCases --> |"Set base cases"| BaseSet["
          eggFloor[i][0] = 0
          eggFloor[i][1] = 1
          eggFloor[1][j] = j"]
      end

      subgraph "Dynamic Programming"
        EggsLoop --> |"Outer loop"| EggIteration["For each egg (i)"]
        FloorsLoop --> |"Inner loop"| FloorIteration["For each floor (j)"]
        DropLoop --> |"Consider all drop points"| DropConsideration["For each possible drop (x)"]
        Calculate --> |"Find minimum of maximum outcomes"| CalcLogic["
          res = 1 + max(
            eggFloor[i-1][x-1],  // Egg breaks
            eggFloor[i][j-x]     // Egg survives
          )
          eggFloor[i][j] = min(eggFloor[i][j], res)"]
      end

      subgraph "Visualization"
        GenerateMermaid --> |"Create nodes and connections"| MermaidCode["
          egg{i}floor{j} --> egg{i - 1}floor{j - 1}
          egg{i}floor{j} --> floor{j}
          egg{i}floor{j} --> eggfloor{j}"]
      end

      style Start fill:#f9f,stroke:#333,stroke-width:4px
      style Result fill:#ff9,stroke:#333,stroke-width:4px
      style Error fill:#f99,stroke:#333,stroke-width:4px
  `

  return (
    <Box
      sx={{
        flexBasis: '100%',
        margin: 1,
        padding: 3,
        backgroundColor: '#f5f5f5',
        textAlign: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography variant='h6' gutterBottom color='black'>
        Detailed Explanation of the Egg Drop Problem Solution
      </Typography>
      <MermaidChart chart={flowChart} />
      <Typography
        variant='body1'
        color='black'
        sx={{ marginTop: 2, textAlign: 'left' }}
      >
        This diagram illustrates the step-by-step process of solving the Egg
        Drop problem:
        <ol>
          <li>
            We start by validating the inputs (number of eggs and floors).
          </li>
          <li>
            We initialize a 2D array (DP table) to store intermediate results.
          </li>
          <li>We fill in the base cases for 1 egg and 0/1 floors.</li>
          <li>
            We use nested loops to iterate through the number of eggs and
            floors.
          </li>
          <li>
            For each combination of eggs and floors, we consider all possible
            drop points.
          </li>
          <li>
            We calculate the minimum number of drops needed using the recurrence
            relation.
          </li>
          <li>We update the DP table with the calculated minimum drops.</li>
          <li>Optionally, we generate Mermaid code for visualization.</li>
          <li>
            Finally, we return the result, which is stored in
            eggFloor[eggs][floors].
          </li>
        </ol>
        The dynamic programming approach allows us to efficiently solve this
        problem by breaking it down into smaller subproblems and reusing their
        solutions.
      </Typography>
    </Box>
  )
}

export default ExplanationQuestionFive
