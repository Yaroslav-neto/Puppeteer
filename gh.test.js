let page;
jest.setTimeout(25000);

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://github.com/team");
});

afterEach(async () => {
  if (page) await page.close();
  await page.waitForTimeout(2000);
});

describe("Github page tests", () => {
  test("The h1 header content'", async () => {

    await page.waitForTimeout(2000);
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub · Build and ship software on a single, collaborative platform · GitHub');
  });

  test("The first link attribute", async () => {

    await page.waitForTimeout(200);
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign in button", async () => {

    await page.waitForTimeout(200);
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Get started with Team")
  });
});

  test("The Actions link attribute", async () => {
  await page.waitForTimeout(200);

  const selector1 = "li:nth-child(1) button:nth-child(1)";
  await page.waitForSelector(selector1);
  await page.click(selector1);

  const selector2 = 'a[data-analytics-event=\'{"location":"navbar","action":"actions","context":"product","tag":"link","label":"actions_link_product_navbar"}\'] div div.color-fg-default.h4';
  await page.waitForSelector(selector2);
  await page.click(selector2);

  await page.waitForSelector('#hero-section-brand-heading', { visible: true });
  const actual = await page.$eval('#hero-section-brand-heading', el => el.textContent.trim());
  expect(actual).toBe("Automate your workflow from idea to production");
});

  test("The Solutions DevOps title", async () => {
  await page.waitForTimeout(200);
  await page.hover('li:nth-child(2) button:nth-child(1)');
  await page.waitForSelector('a[href="/solutions/use-case/devops"]', { visible: true }); 
  await page.waitForTimeout(200);
  await page.click('a[href="/solutions/use-case/devops"]');
  await page.waitForTimeout(2000);
  
  await page.waitForSelector('#hero-section-brand-heading', { visible: true });
  const actual = await page.$eval('#hero-section-brand-heading', el => el.textContent.trim());
  expect(actual).toBe("The unified platform for your DevOps lifecycle");
});

test("The Partners page title", async () => {
  await page.waitForTimeout(200);
  await page.hover('li:nth-child(3) button:nth-child(1)');
  await page.waitForTimeout(200);
  const [partnerLink] = await page.$x('//li[contains(@class, "HeaderMenu-item")]//a[@href="https://partner.github.com"]');
  const [newPagePromise] = await Promise.all([
    new Promise(resolve => browser.once('targetcreated', target => resolve(target.page()))),
    partnerLink.click()
  ]);
  const newPage = await newPagePromise;

  await newPage.waitForSelector('h1.h0-mktg.text-bold.mb-3', { visible: true });
  const actual = await newPage.$eval('h1.h0-mktg.text-bold.mb-3', el => el.textContent.trim());
  expect(actual).toBe("Why partner with GitHub?");
});


