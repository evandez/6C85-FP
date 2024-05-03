# Investor Profiles React App

The interactive visualization is implemented in TypeScript using React. It is built with Vite and hosted via GitHub Pages.

## Visualizations
All code for the visualizations can be found in `viz_generator.ipynb`. Note that the notebook is for generating viz for the site directly, so if you run each cell, it modifies the viz files for the site. To manually edit and inspect each viz, you need to take the plotly python code inside of the nested loop for each cell, make a new cell and edit it there before you put it back into the nested loop. 

## Local Dev

```bash
# from ./investor-profiles
npm i
npm run dev
```

## Deploy

```bash
# from ./investor-profiles
npm run deploy
```