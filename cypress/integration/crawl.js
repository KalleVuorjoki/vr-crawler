describe('VR - Night trains and CarTrain crawler', () => {

  const monthToTravel = 7;
  const yearToTravel = 2021;
  // const daysInMonth = new Date(yearToTravel, monthToTravel, 0).getDate();
  const daysInMonth = 4;
  let tripFromStation = 'Pasila Kaikki';
  let tripToStation = 'Kolari';

  Cypress._.times(daysInMonth, (i) => {
    let date = (i+1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + '.' + monthToTravel.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + '.' + yearToTravel;
    let fileName = `${date}, ${tripFromStation} - ${tripToStation}`;

    it(fileName, () => {
      cy.visit('Welcome.do');
      cy.get('.tabCar a').click();
      cy.get('#tripFromStationVRCar').select(tripFromStation);
      cy.get('#tripToStationVRCar').select(tripToStation);
      cy.get('input#tripDepartureDateCar').clear().type(date);

      // Nighttrains leave after ~16-18 from Pasila depending on destination.
      cy.get('input#tripHhDepartureTimeCar').clear().type('16');
      cy.get('#formCarTrainSubmit a').click();
      cy.intercept('SearchResult.do').as('getResults');
      // @todo Fails when no results are received.
      cy.wait('@getResults').then((interception) => {
        let price = '';
        cy.get('.ticketOption').each(($el, index, $list) => {
          if ($el.length > 0) {
            let priceInfo = $el.text().trim();
            // Possible priceInfo options are price (e.g. "100,00€"), "Loppuunmyyty" and "Ei saatavilla"
            if (parseInt(priceInfo)) {
              price += priceInfo + ', ';
            }
          }
        }).then(() => {
          // After iterating all price options, take screenshot and save results on a file.
          cy.get('#journeyres').screenshot(fileName);
          let result = fileName + ': ' + price + '\n';
          cy.writeFile('results.txt', result, { flag: 'a+' })
        });

      });
    })
  })
});