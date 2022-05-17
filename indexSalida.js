const puppeteer = require('puppeteer');
var fs = require('fs');
const { rut, clave } = require('./login.json');


(async (rut,clave) => {
  const browser = await puppeteer.launch({headless: false });
  const page = await browser.newPage();
  await page.goto('https://trabajador.relojcontrol.com/login.zul');

  var isItem = await page.evaluate(() => {
    var items = document.getElementsByClassName('form-control');
    return [items[2].getAttribute('id'),items[3].getAttribute('id')];
  });
   const rutInput = await page.$("#" + isItem[0])
    await rutInput.type(rut);
    const claveInput = await page.$("#" + isItem[1])
    await claveInput.type(clave);

    await page.click('a.btn.btn-blue');

    await page.waitForSelector('button.btn-green');
    await page.click('button.btn-red');

    await page.waitForSelector('div.z-window-highlighted');
    let aceptar = await page.evaluate(() => {
        var items = document.getElementsByClassName('z-button');
        console.log(items)
        return items[1].getAttribute('id');
      });
    await page.click('#'+aceptar);

    fs.appendFile('./log.txt', new Date() + '\n', function (err) {
        if (err) throw err;
        console.log('Saved!');
    });

  await page.screenshot({ path: 'registro.png' });

  await browser.close();
})(rut,clave);


