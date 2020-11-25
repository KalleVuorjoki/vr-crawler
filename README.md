# Price information crawler for VR night trains and CarTrains.

Reason for this repository is that VR doesn't offer exact information on availibility or promotional price for the night trains or CarTrain.
Cypress was chosen for this task to overcome the challenges with an oldish VR webshop interface.
Code is not top quality (PR's welcome) and hopefully VR will update its shop for nighttrains and CarTrains so I can make this repository obsolete.

## How to use

### Requirements

- node 12.x LTS

### Install

`npm run install`

### Modify the crawler

Edit the file `vim cypress/integration/crawl.js`.
Change `monthToTravel` and `yearToTravel` varibles to your liking.
Change also `tripFromStation` and `tripToStation` to your liking.

### Run the crawler.

`npm run cypress:run`

Screenshots are saved on folder: `cypress/screenshots/crawl.js/`.
Results are saved also on textfile: `results.txt`
