const puppeteer = require('puppeteer');
var fs = require('fs');
import { rut, clave } from  './login';

(async () => {
  const browser = await puppeteer.launch({headless: false });
  const page = await browser.newPage();
  await page.goto('https://trabajador.relojcontrol.com/login.zul');

  var isItem = await page.evaluate(() => {
    var items = document.getElementsByClassName('form-control');
    return [items[2].getAttribute('id'),items[3].getAttribute('id')];
  });
   const rut = await page.$("#" + isItem[0])
    await rut.type(rut);
    const clave = await page.$("#" + isItem[1])
    await clave.type(clave);

    await page.click('a.btn.btn-blue');

    await page.waitForSelector('button.btn-green');

    // await page.click('button.btn-green');
    let resp = await page.$eval('button.btn-green', e => e.getAttribute('id'));
    console.log(resp);

    fs.appendFile('./log.txt', new Date() + '\n', function (err) {
        if (err) throw err;
        console.log('Saved!');
    });

  await page.screenshot({ path: 'registro.png' });

  await browser.close();
})();


