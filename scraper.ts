import puppeteer = require('puppeteer');

 const urls = ['https://www.bol.com/nl/p/starbook-boeklamp-premium-lichthouten-cover-warm-wit-licht-relatiegeschenk-tafellamp/9200000101823319/?suggestionType=typedsearch&bltgh=lHJId9KPg14NsufrofBFfg.1.2.ProductTitle',
               'https://www.bol.com/nl/p/dunlop-led-fietslampen-set-zwart-rood/9200000049684295/?suggestionType=typedsearch&bltgh=k1TYkLxOYDzVeZ0DwQNOAA.1.4.ProductImage#modal_open'];
puppeteer.launch().then(async browser => {
  try {
    for (let url of urls) {
      const page = await browser.newPage();
      await page.goto(url);
      
      await page.evaluate(() => {
          let elements = document.getElementsByClassName('btn--buy');
          var buyBtn = elements.item(0) as HTMLAnchorElement; 
          buyBtn.click();
      });
    
      console.log("Buy btn clicked");
  
      await page.waitFor(500);
      
      const orderBtn = await page.$('a[href="/nl/order/basket.html"]');
      
      const label = await page.evaluate(el => el.innerText, orderBtn);
      console.log(label);
      await orderBtn.click();
    
      console.log("Ordered");
  
      await page.waitFor(2500);
  
      console.log("At basket");
  
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
      
      if (maxVal == undefined) {
        console.log("Max val is undefined");

        await page.select('#tst_quantity_dropdown', 'meer');
  
        console.log("Select more");

        await page.evaluate(() => {
          var element = document.querySelector('input[type=tel]') as HTMLInputElement;
          element.value = '';
          element.focus();
        });

        await page.type('input[type=tel]', '500');

        console.log("Set q to 500");
  
        const okBtn = await page.$('.js_quantity_overlay_ok');
        await okBtn.click();
        
        console.log("Click ok");

        await page.waitFor(500);

        var availableQ = await page.evaluate(() => {
          var e = document.querySelector('#tst_quantity_dropdown') as HTMLSelectElement;
          return e.options[e.selectedIndex].value;
        });
  
        console.log("Max value: " + availableQ);
  
      } else {
        console.log("Max value: " + maxVal);
      }
  
      const removeBtn = await page.$('#tst_remove_from_basket');
      await removeBtn.click();

      await page.waitFor(500);

      page.close(); 
    }

    console.log("Done.");
  }
  catch (error){
    console.error(error);
  }
});
