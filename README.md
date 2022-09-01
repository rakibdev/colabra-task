`pnpm install` & `pnpm run dev`

### 4 hour take-home assignment for a company interview.

- Include simple 3 blocks 1 row, and "start", "cash out" button.
- Use SVG for fruits (cherry, lemon, orange, watermelon).
- Clicking "start" all block should enter spinning state. Can be a placeholder "X".
- Each block should spin for 1 seconds and display result.
- For player to win, they have to get the same fruit in each block.
- When game loads, they are allocated 10 credits.
- Points for cherry = 10, lemon = 20, orange = 30, watermelon = 40
- If user wins the round, their credit is increased by point, else it is deducted by 1 (cost of rolling slot).
- When user hovers on cash out, there is 50% chance that button moves in a random direction by 300px, and 40% chance that it becomes unclickable. If they succeed to hit it, credits from session are moved to their account credit.

### If the player keeps winning, they can play forever, but there's a twist there as well:

- When user has less than 40 credits, their rolls are truly random.
- If a user has between 40 and 60 credits then for each winning roll, there is 30% chance it will make re-roll that round.
- If user has above 60 credits, it acts same but the chance of re-rolling the round increases to 60%.
