// This js file is to test the work flow creation and deletion

var webdriver = require('selenium-webdriver'),
    trayioKey = "srajeenthini@gmail.com",
    trayioSecret = "Qwerty!1",
    driver,
    By = webdriver.By,
    until = webdriver.until;

var workflowName = "MySampleWorkFlow";
var assert = require('assert');
const TIME_OUT = 3000;

driver = new webdriver.Builder().forBrowser('chrome').build();

//Navigate to trayIO home Page
driver.get('https://tray.io/');

//Navigate to trayIO Login Page
driver.findElement(By.xpath("//a[@href='https://app.tray.io']")).click();
driver.findElement(By.name("username")).sendKeys(trayioKey);
driver.findElement(By.name("password")).sendKeys(trayioSecret);
driver.findElement(By.xpath("//button[contains(text(),'Login')]")).click();

//Allow cookies screen
driver.findElement(By.id("adroll_banner_close")).click();

//go to create workflow button
driver.wait(until.elementLocated(By.xpath('//*[@id="app"]/div/div/div/div/div[2]/div/div/div/div[4]/div[3]/div/a')), 10000, 'Could not locate the element within the time specified');
driver.findElement(By.xpath('//*[@id="app"]/div/div/div/div/div[2]/div/div/div/div[4]/div[3]/div/a')).then(function(elem){
			driver.actions().mouseMove(elem).perform();
		});

//Click on create wokflow button
driver.findElement(By.xpath("//a[@href='/create']")).click();
driver.wait(until.elementLocated(By.xpath("//input[@name='name']")), TIME_OUT, 'Could not locate the work flow name element within the time specified');
driver.findElement(By.xpath("//input[@name='name']")).sendKeys(workflowName);
driver.findElement(By.xpath("//div[@title='Create']")).click();
driver.sleep(TIME_OUT);

//Navigate back to dashboard
driver.findElement(By.xpath("//a[@href='/']")).click();
driver.sleep(TIME_OUT);

//Assert the workflow creation success
driver.findElement(By.xpath("//header[@class='Title___tbmihn']")).getText().then(function (actualVal) {
   assert.equal(actualVal,workflowName,"there is problem with workflow creation");
});;

driver.findElement(By.className("Options-menu-icon___1iiZar")).then(function(elem){
			driver.actions().mouseMove(elem).perform();
});

//Click on dropdown list for workflow Options
driver.findElement(By.className("Options-menu-icon___1iiZar")).click();

//Delete workflow
driver.wait(until.elementLocated(By.xpath("//a[text() = 'Delete']")), TIME_OUT, 'Could not locate the Delete button element within the time specified');
driver.findElement(By.xpath("//a[text() = 'Delete']")).click();

//Confirm the workflow deletion
driver.findElement(By.xpath("//div[@title='Yes']")).click();
driver.sleep(TIME_OUT);

//logout from page
driver.findElement(By.id('userToggle')).click();
driver.findElement(By.xpath("//a[@href='/logout']")).click();
driver.quit();
