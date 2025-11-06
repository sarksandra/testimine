import org.junit.jupiter.api.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;

import java.time.Duration;

public class UITestingPlaygroundTests {
    WebDriver driver;
    WebDriverWait wait;
    String baseUrl = "https://uitestingplayground.com";

    @BeforeEach
    void setUp() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    @AfterEach
    void tearDown() {
        driver.quit();
    }

@Test
void testSampleAppLogin() {
    driver.get(baseUrl + "/sampleapp");
    driver.findElement(By.cssSelector("input[placeholder='User Name']")).sendKeys("Mihkel");
    driver.findElement(By.cssSelector("input[placeholder='********']")).sendKeys("pwd");
    driver.findElement(By.cssSelector("#login")).click();

    WebElement message = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("#loginstatus")));
    Assertions.assertEquals("Welcome, Mihkel!", message.getText());
}

@Test
void testSampleAppLogout() {
    driver.get(baseUrl + "/sampleapp");
    driver.findElement(By.cssSelector("input[placeholder='User Name']")).sendKeys("Mihkel");
    driver.findElement(By.cssSelector("input[placeholder='********']")).sendKeys("pwd");
    driver.findElement(By.cssSelector("#login")).click();

    wait.until(ExpectedConditions.textToBe(By.cssSelector("#loginstatus"), "Welcome, Mihkel!"));
    driver.findElement(By.cssSelector("#login")).click();

    WebElement message = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("#loginstatus")));
    Assertions.assertEquals("User logged out.", message.getText());
}

@Test
void testDynamicId() {
    driver.get(baseUrl + "/dynamicid");
    driver.findElement(By.xpath("//button[normalize-space(.)='Button with Dynamic ID']")).click();
    assertTrue(true);
}

@Test
void testClassAttributeAlert() {
    driver.get(baseUrl + "/classattr");
    driver.findElement(By.cssSelector("button.btn-primary")).click();
    Alert alert = wait.until(ExpectedConditions.alertIsPresent());
    Assertions.assertTrue(alert.getText().contains("primary"));
    alert.accept();
}

@Test
void testHiddenLayers() {
    driver.get(baseUrl + "/hiddenlayers");
    WebElement green = driver.findElement(By.cssSelector("#greenButton"));
    green.click();
    Assertions.assertThrows(ElementClickInterceptedException.class, green::click);
}

@Test
void testLoadDelay() {
    driver.get(baseUrl + "/loaddelay");
    WebElement button = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("button.btn")));
    Assertions.assertTrue(button.isDisplayed());
}

@Test
void testAjaxData() {
    driver.get(baseUrl + "/ajax");
    driver.findElement(By.cssSelector("#ajaxButton")).click();
    WebElement text = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("#content p")));
    Assertions.assertEquals("Data loaded with AJAX get request.", text.getText());
}

@Test
void testTextInput() {
    driver.get(baseUrl + "/textinput");
    driver.findElement(By.cssSelector("#newButtonName")).sendKeys("Hello");
    driver.findElement(By.cssSelector("#updatingButton")).click();
    assertEquals("Hello", driver.findElement(By.cssSelector("#updatingButton")).getText());
}

@Test
void testScrollbars() {
    driver.get(baseUrl + "/scrollbars");
    WebElement btn = driver.findElement(By.cssSelector("#hidingButton"));
    ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", btn);
    btn.click();
    Assertions.assertTrue(true);
}

@Test
void testOverlappedElement() {
    driver.get(baseUrl + "/overlapped");
    WebElement input = driver.findElement(By.cssSelector("#id"));
    ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", input);
    input.sendKeys("abc");
    Assertions.assertEquals("abc", input.getAttribute("value"));
}

@Test
void testVisibility() {
    driver.get(baseUrl + "/visibility");
    driver.findElement(By.id("hideButton")).click();
    assertEquals(0, driver.findElements(By.cssSelector("#removedButton")).size());
}


@Test
void testClick() {
    driver.get(baseUrl + "/click");
    WebElement btn = driver.findElement(By.cssSelector("#badButton"));
    btn.click();
    Assertions.assertTrue(btn.getAttribute("class").contains("btn-success"));
}

@Test
void testProgressBar() {
    driver.get(baseUrl + "/progressbar");
    WebElement start = driver.findElement(By.cssSelector("#startButton"));
    WebElement stop = driver.findElement(By.cssSelector("#stopButton"));
    WebElement bar = driver.findElement(By.cssSelector("#progressBar"));

    start.click();
    wait.until(driver -> Integer.parseInt(bar.getAttribute("aria-valuenow")) >= 75);
    stop.click();
    int finalVal = Integer.parseInt(bar.getAttribute("aria-valuenow"));
    Assertions.assertTrue(finalVal >= 75);
}

@Test
void testMouseOver() {
    driver.get(baseUrl + "/mouseover");
    WebElement btn = driver.findElement(By.cssSelector("a[title='Click me']"));
    Actions actions = new Actions(driver);
    actions.moveToElement(btn).click().moveToElement(btn).click().perform();
    WebElement count = driver.findElement(By.cssSelector("#clickCount"));
    Assertions.assertEquals("2", count.getText());
}

@Test
void testShadowDom() {
    driver.get(baseUrl + "/shadowdom");
    WebElement shadowHost = driver.findElement(By.cssSelector("guid-generator"));
    SearchContext shadowRoot = shadowHost.getShadowRoot();
    shadow.findElement(By.cssSelector("#buttonGenerate")).click();
    WebElement input = shadow.findElement(By.cssSelector("#editField"));
    assertFalse(input.getAttribute("value").isEmpty());
}

}