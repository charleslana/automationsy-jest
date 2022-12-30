const { Action, Config, Resource } = require("automationsy");

describe("Login", () => {
  beforeEach(() => {
    Config.setHeadless(true);
    Config.setDefaultTimeout(5000);
  });

  test("Deve realizar o login com sucesso", async () => {
    await Action.navigate("https://the-internet.herokuapp.com/login");
    await Action.type("#username", "tomsmith");
    await Action.type("#password", "SuperSecretPassword!");
    await Action.click("button");
    await Action.waitForLocator("#flash");
    expect(await Resource.getText("#flash")).toContain(
      "You logged into a secure area!"
    );
  });

  test("Não deve realizar o login com credenciais inválidas", async () => {
    await Action.navigate("https://the-internet.herokuapp.com/login");
    await Action.type("#username", "tomsmith");
    await Action.type("#password", "123456");
    await Action.click("button");
    await Action.waitForLocator("#flash");
    expect(await Resource.getText("#flash")).toContain(
      "Your password is invalid!"
    );
  });

  afterEach(async () => {
    await Action.screenshot();
    await Action.closeBrowser();
  });
});
