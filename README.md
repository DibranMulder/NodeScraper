# NodeScraper
A TypeScript scraper running on Node.
- Its written in TypeScript.
- It uses puppeteer to interact with Chrome.
- It uses Azure Table Storage for data storage.

To run this:
```
npm install
```
In Vs Code
```
CTRL+SHIFT B 
tsc build - tsconfig.json
```

Hit debug in VS code or:
```
node .\scraper.js
```

## TODO:
- [x] Make a list of urls configurable
- [ ] Store data in a database
- [ ] Run solution in a docker container
- [ ] Orchestrate an execution 4 times a day
