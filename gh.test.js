let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://github.com/team", { waitUntil: 'load' });
});

afterEach(async () => {
  if (page) await page.close();
});

describe("Github page tests", () => {
  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub · Build and ship software on a single, collaborative platform · GitHub');
  }, 6000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  }, 5000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Get started with Team")
  }, 5000);
});

  test("The Actions link attribute", async () => {
  const selector1 = "li:nth-child(1) button:nth-child(1)";
  await page.waitForSelector(selector1);
  await page.click(selector1);

  const selector2 = 'a[data-analytics-event=\'{"location":"navbar","action":"actions","context":"product","tag":"link","label":"actions_link_product_navbar"}\'] div div.color-fg-default.h4';
  await page.waitForSelector(selector2);
  await page.click(selector2);

  await page.waitForSelector('#hero-section-brand-heading', { visible: true });
  const actual = await page.$eval('#hero-section-brand-heading', el => el.textContent.trim());
  expect(actual).toBe("Automate your workflow from idea to production");
}, 5000);

  test("The Solutions DevOps title", async () => {
  await page.hover('li:nth-child(2) button:nth-child(1)'), { delay: 200 };
  await page.waitForSelector('a[href="/solutions/use-case/devops"]', { visible: true }); 
  await page.click('a[href="/solutions/use-case/devops"]');
  
  await page.waitForSelector('#hero-section-brand-heading', { visible: true });
  const actual = await page.$eval('#hero-section-brand-heading', el => el.textContent.trim());
  expect(actual).toBe("The unified platform for your DevOps lifecycle");
}, 5000);

test("The Pricing title", async () => {
  await page.click('a.HeaderMenu-link.no-underline.px-0.px-lg-2.py-3.py-lg-2.d-block.d-lg-inline-block', { delay: 2000 });
  await page.waitForSelector('h1.h2-mktg');
  const actualHeaderText = await page.$eval('h1.h2-mktg', el => el.textContent.trim());

  expect(actualHeaderText).toBe('Try the Copilot-powered platform');
}, 5000);



