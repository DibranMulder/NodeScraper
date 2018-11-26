import puppeteer = require('puppeteer');

const timeout = 1000;
const eanCodes = ['8711252416793', '2950001557127'];

puppeteer.launch().then(async browser => {
  try {
    // Loop every ean code.
    for (let ean of eanCodes) {
      // Open a new page.
      const page = await browser.newPage();
      await page.goto('https://www.bol.com/nl/');
      
      // Search for an EAN code.
      console.log("Searching for: " + ean);
      await page.focus('#searchfor');
      await page.keyboard.type(ean);

      var searchBtn = await page.$("[data-test='search-button']");
      await searchBtn.click();

      await page.waitFor(timeout);

      // Log the current url.
      var url = page.url();
      console.log("Page at: " + url);

      // Hit the buy btn.
      var buyBtn = await page.$(".btn--buy");
      if (buyBtn){
        console.log("Product in basket.");
        buyBtn.click();
      } else {
        console.log("Product not added to basket.");
        continue;
      }

      await page.waitFor(timeout);

      // Close the modal.
      var modalClose = await page.$("[data-test='modal-window-close']");
      modalClose.click();
      
      await page.waitFor(timeout);

      // Get the title
      var titleElement = await page.$("[data-test='title']");
      const title = await page.evaluate(el => el.innerText, titleElement);
      console.log("Title: " + title);

      // Get the price
      var priceElement = await page.$("[data-test='price']");
      const price = await page.evaluate(el => el.innerText, priceElement);
      console.log("Price: " + parseFloat(price));

      // Go to the basket.
      var basketBtn = await page.$("[data-test='basket-button']");
      basketBtn.click();
      console.log("At basket");

      await page.waitFor(timeout);

      // Log the current url.
      var url = page.url();
      console.log("Page at: " + url);
  
      // Check for the highest number in the quantity select.
      let maxVal: number | undefined = await page.evaluate(() => {
        let m: number = 0;
        
        var select = document.querySelector('#tst_quantity_dropdown') as HTMLSelectElement;
        for (var i = 0; i < select.options.length; i++) {
          if (select.options[i].value === "meer") {
            return undefined;
          }
  
          let intVal = parseInt(select.options[i].value);
          if (intVal > m){
            m = intVal;
          }
        }
        return m;
      });
      
      // If the max value is undefined then we can select 'meer'.
      if (maxVal == undefined) {
        console.log("Max val is undefined");

        // Select meer.
        await page.select('#tst_quantity_dropdown', 'meer');
  
        console.log("Select more");

        await page.evaluate(() => {
          var element = document.querySelector('input[type=tel]') as HTMLInputElement;
          element.value = '';
          element.focus();
        });

        // Enter 500
        await page.type('input[type=tel]', '500');

        console.log("Set q to 500");
  
        // Press ok.
        const okBtn = await page.$('.js_quantity_overlay_ok');
        await okBtn.click();
        
        console.log("Click ok");

        await page.waitFor(timeout);

        // Query the available quantity.
        var availableQ = await page.evaluate(() => {
          var e = document.querySelector('#tst_quantity_dropdown') as HTMLSelectElement;
          return e.options[e.selectedIndex].value;
        });
  
        console.log("Max value: " + availableQ);
  
      } else {
        console.log("Max value: " + maxVal);
      }
  
      // Remove it from the basket.
      const removeBtn = await page.$('#tst_remove_from_basket');
      await removeBtn.click();

      await page.waitFor(timeout);

      // Close page.
      page.close(); 
    }

    console.log("Done.");
  }
  catch (error){
    console.log("Error");
    console.error(error);
  }
});
