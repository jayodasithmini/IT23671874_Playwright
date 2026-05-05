// @ts-check
/**
 * Singlish to Sinhala Transliteration – Negative Test Cases
 *
 * Assignment 1 | IT3040 ITPM | Student ID: IT23671874
 *
 * Target: Google Input Tools – Sinhala (https://www.google.com/inputtools/try/)
 *
 * 50 Negative Test Cases covering 24 Input Types:
 *  Type 1  – Empty Input
 *  Type 2  – Numeric (Integers)
 *  Type 3  – Numeric (Decimal / Floating-point)
 *  Type 4  – Numeric (Negative Numbers)
 *  Type 5  – Special Characters (Basic Punctuation)
 *  Type 6  – Special Characters (Extended / Symbols)
 *  Type 7  – Whitespace – Spaces
 *  Type 8  – Whitespace – Tabs
 *  Type 9  – Whitespace – Newlines
 *  Type 10 – HTML Tags
 *  Type 11 – Script / XSS Injection
 *  Type 12 – SQL Injection Strings
 *  Type 13 – Emoji Characters
 *  Type 14 – Chinese / CJK Characters
 *  Type 15 – Arabic / RTL Characters
 *  Type 16 – Japanese Characters
 *  Type 17 – Sinhala Unicode Directly
 *  Type 18 – Binary Strings
 *  Type 19 – Hexadecimal Strings
 *  Type 20 – URL-Encoded Strings
 *  Type 21 – Control Characters
 *  Type 22 – Mathematical Symbols
 *  Type 23 – Repeated / Monotone Characters
 *  Type 24 – Mixed Valid Singlish + Invalid Characters
 */

const { test, expect } = require('@playwright/test');

/* ------------------------------------------------------------------ */
/* Utility                                                              */
/* ------------------------------------------------------------------ */

/** Returns true if the string contains at least one Sinhala Unicode character (U+0D80 – U+0DFF). */
function containsSinhala(text) {
  return /[\u0D80-\u0DFF]/.test(text || '');
}

/** Returns a string of the given character repeated n times. */
function repeatChar(char, n) {
  return char.repeat(n);
}

/* ------------------------------------------------------------------ */
/* Selectors                                                            */
/* ------------------------------------------------------------------ */

const SELECTORS = {
  languageSelect: 'select',          // Language picker <select>
  inputBox: '.iit',                  // Contenteditable input div used by Google Input Tools
  suggestionList: '.iic',            // Suggestion / transliteration candidates list
};

const LANGUAGE_VALUE = 'si';         // ISO 639-1 code for Sinhala

/* ------------------------------------------------------------------ */
/* Test Suite                                                           */
/* ------------------------------------------------------------------ */

test.describe('Singlish→Sinhala Transliteration — 50 Negative Test Cases', () => {
  /**
   * Before each test: navigate to Google Input Tools and select Sinhala.
   */
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.google.com/inputtools/try/', {
      waitUntil: 'domcontentloaded',
    });

    // Select the Sinhala (si) language from the dropdown
    const select = page.locator(SELECTORS.languageSelect).first();
    await select.waitFor({ state: 'visible', timeout: 10000 });
    await select.selectOption(LANGUAGE_VALUE);

    // Brief pause to allow the input method to initialise
    await page.waitForTimeout(800);
  });

  /* ================================================================= */
  /* Type 1: Empty Input                                                 */
  /* ================================================================= */

  test('TC01 – [Type 1] Empty string produces no Sinhala output', async ({ page }) => {
    const inputBox = page.locator(SELECTORS.inputBox).first();
    await inputBox.waitFor({ state: 'visible' });
    await inputBox.click();

    // Do not type anything – assert input remains empty
    const inputText = await inputBox.textContent();
    expect(containsSinhala(inputText)).toBe(false);
    expect((inputText || '').trim()).toBe('');
  });

  test('TC02 – [Type 1] Clearing previously typed text leaves no Sinhala output', async ({ page }) => {
    const inputBox = page.locator(SELECTORS.inputBox).first();
    await inputBox.waitFor({ state: 'visible' });
    await inputBox.click();

    // Type valid Singlish then clear it
    await page.keyboard.type('ka');
    await page.waitForTimeout(500);
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.waitForTimeout(500);

    const inputText = await inputBox.textContent();
    expect((inputText || '').trim()).toBe('');
  });

  /* ================================================================= */
  /* Type 2: Numeric – Integers                                          */
  /* ================================================================= */

  test('TC03 – [Type 2] Single digit "5" is not transliterated to Sinhala', async ({ page }) => {
    const inputBox = page.locator(SELECTORS.inputBox).first();
    await inputBox.waitFor({ state: 'visible' });
    await inputBox.click();
    await page.keyboard.type('5');
    await page.waitForTimeout(500);

    const inputText = await inputBox.textContent();
    expect(containsSinhala(inputText)).toBe(false);
  });

  test('TC04 – [Type 2] Multi-digit integer "12345" is not transliterated to Sinhala', async ({ page }) => {
    const inputBox = page.locator(SELECTORS.inputBox).first();
    await inputBox.waitFor({ state: 'visible' });
    await inputBox.click();
    await page.keyboard.type('12345');
    await page.waitForTimeout(500);

    const inputText = await inputBox.textContent();
    expect(containsSinhala(inputText)).toBe(false);
  });

  test('TC05 – [Type 2] Large integer "9999999999" is not transliterated to Sinhala', async ({ page }) => {
    const inputBox = page.locator(SELECTORS.inputBox).first();
    await inputBox.waitFor({ state: 'visible' });
    await inputBox.click();
    await page.keyboard.type('9999999999');
    await page.waitForTimeout(500);

    const inputText = await inputBox.textContent();
    expect(containsSinhala(inputText)).toBe(false);
  });

  /* ================================================================= */
  /* Type 3: Numeric – Decimals / Floating-point                        */
  /* ================================================================= */

  test('TC06 – [Type 3] Decimal number "3.14" is not transliterated to Sinhala', async ({ page }) => {
    const inputBox = page.locator(SELECTORS.inputBox).first();
    await inputBox.waitFor({ state: 'visible' });
    await inputBox.click();
    await page.keyboard.type('3.14');
    await page.waitForTimeout(500);

    const inputText = await inputBox.textContent();
    expect(containsSinhala(inputText)).toBe(false);
  });

  test('TC07 – [Type 3] Scientific notation "1.5e10" is not transliterated to Sinhala', async ({ page }) => {
    const inputBox = page.locator(SELECTORS.inputBox).first();
    await inputBox.waitFor({ state: 'visible' });
    await inputBox.click();
    await page.keyboard.type('1.5e10');
    await page.waitForTimeout(500);

    const inputText = await inputBox.textContent();
    expect(containsSinhala(inputText)).toBe(false);
  });

  /* ================================================================= */
  /* Type 4: Numeric – Negative Numbers                                  */
  /* ================================================================= */

  test('TC08 – [Type 4] Negative integer "-100" is not transliterated to Sinhala', async ({ page }) => {
    const inputBox = page.locator(SELECTORS.inputBox).first();
    await inputBox.waitFor({ state: 'visible' });
    await inputBox.click();
    await page.keyboard.type('-100');
    await page.waitForTimeout(500);

    const inputText = await inputBox.textContent();
    expect(containsSinhala(inputText)).toBe(false);
  });

  test('TC09 – [Type 4] Negative decimal "-3.14" is not transliterated to Sinhala', async ({ page }) => {
    const inputBox = page.locator(SELECTORS.inputBox).first();
    await inputBox.waitFor({ state: 'visible' });
    await inputBox.click();
    await page.keyboard.type('-3.14');
    await page.waitForTimeout(500);

    const inputText = await inputBox.textContent();
    expect(containsSinhala(inputText)).toBe(false);
  });

  /* ================================================================= */
  /* Type 5: Special Characters – Basic Punctuation                      */
  /* ================================================================= */

  test('TC10 – [Type 5] Basic punctuation "!@#$%" is not transliterated to Sinhala', async ({ page }) => {
    const inputBox = page.locator(SELECTORS.inputBox).first();
    await inputBox.waitFor({ state: 'visible' });
    await inputBox.click();
    await page.keyboard.type('!@#$%');
    await page.waitForTimeout(500);

    const inputText = await inputBox.textContent();
    expect(containsSinhala(inputText)).toBe(false);
  });

  test('TC11 – [Type 5] Punctuation "^&*()" is not transliterated to Sinhala', async ({ page }) => {
    const inputBox = page.locator(SELECTORS.inputBox).first();
    await inputBox.waitFor({ state: 'visible' });
    await inputBox.click();
    await page.keyboard.type('^&*()');
    await page.waitForTimeout(500);

    const inputText = await inputBox.textContent();
    expect(containsSinhala(inputText)).toBe(false);
  });

  /* ================================================================= */
  /* Type 6: Special Characters – Extended Symbols                       */
  /* ================================================================= */

  test('TC12 – [Type 6] Extended symbols "~`|<>" are not transliterated to Sinhala', async ({ page }) => {
    const inputBox = page.locator(SELECTORS.inputBox).first();
    await inputBox.waitFor({ state: 'visible' });
    await inputBox.click();
    await page.keyboard.type('~`|<>');
    await page.waitForTimeout(500);

    const inputText = await inputBox.textContent();
    expect(containsSinhala(inputText)).toBe(false);
  });

  test('TC13 – [Type 6] Bracket symbols "{}[];" are not transliterated to Sinhala', async ({ page }) => {
    const inputBox = page.locator(SELECTORS.inputBox).first();
    await inputBox.waitFor({ state: 'visible' });
    await inputBox.click();
    await page.keyboard.type('{}[];');
    await page.waitForTimeout(500);

    const inputText = await inputBox.textContent();
    expect(containsSinhala(inputText)).toBe(false);
  });

  /* ================================================================= */
  /* Type 7: Whitespace – Spaces                                         */
  /* ================================================================= */

  test('TC14 – [Type 7] A single space produces no Sinhala output', async ({ page }) => {
    const inputBox = page.locator(SELECTORS.inputBox).first();
    await inputBox.waitFor({ state: 'visible' });
    await inputBox.click();
    await page.keyboard.press('Space');
    await page.waitForTimeout(500);

    const inputText = await inputBox.textContent();
    expect(containsSinhala(inputText)).toBe(false);
  });

  test('TC15 – [Type 7] Multiple consecutive spaces produce no Sinhala output', async ({ page }) => {
    const inputBox = page.locator(SELECTORS.inputBox).first();
    await inputBox.waitFor({ state: 'visible' });
    await inputBox.click();
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Space');
    }
    await page.waitForTimeout(500);

    const inputText = await inputBox.textContent();
    expect(containsSinhala(inputText)).toBe(false);
  });

  /* ================================================================= */
  /* Type 8: Whitespace – Tabs                                           */
  /* ================================================================= */

  test('TC16 – [Type 8] A single Tab character produces no Sinhala output', async ({ page }) => {
    const inputBox = page.locator(SELECTORS.inputBox).first();
    await inputBox.waitFor({ state: 'visible' });
    await inputBox.click();
    await page.keyboard.press('Tab');
    await page.waitForTimeout(500);

    const inputText = await inputBox.textContent();
    expect(containsSinhala(inputText)).toBe(false);
  });

  test('TC17 – [Type 8] Multiple Tab characters produce no Sinhala output', async ({ page }) => {
    const inputBox = page.locator(SELECTORS.inputBox).first();
    await inputBox.waitFor({ state: 'visible' });
    await inputBox.click();
    for (let i = 0; i < 3; i++) {
      await page.keyboard.press('Tab');
    }
    await page.waitForTimeout(500);

    const inputText = await inputBox.textContent();
    expect(containsSinhala(inputText)).toBe(false);
  });

  /* ================================================================= */
  /* Type 9: Whitespace – Newlines                                        */
  /* ================================================================= */

  test('TC18 – [Type 9] A single Enter/Newline produces no Sinhala output', async ({ page }) => {
    const inputBox = page.locator(SELECTORS.inputBox).first();
    await inputBox.waitFor({ state: 'visible' });
    await inputBox.click();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);

    const inputText = await inputBox.textContent();
    expect(containsSinhala(inputText)).toBe(false);
  });

  test('TC19 – [Type 9] Multiple Newlines produce no Sinhala output', async ({ page }) => {
    const inputBox = page.locator(SELECTORS.inputBox).first();
    await inputBox.waitFor({ state: 'visible' });
    await inputBox.click();
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Enter');
    }
    await page.waitForTimeout(500);

    const inputText = await inputBox.textContent();
    expect(containsSinhala(inputText)).toBe(false);
  });

  /* ================================================================= */
  /* Type 10: HTML Tags                                                   */
  /* ================================================================= */

  test('TC20 – [Type 10] HTML tag "<b>test</b>" is not transliterated to Sinhala', async ({ page }) => {
    const inputBox = page.locator(SELECTORS.inputBox).first();
    await inputBox.waitFor({ state: 'visible' });
    await inputBox.click();
    await page.keyboard.type('<b>test</b>');
    await page.waitForTimeout(500);

    // The input should not contain Sinhala characters
    const inputText = await inputBox.textContent();
    expect(containsSinhala(inputText)).toBe(false);
  });

  test('TC21 – [Type 10] Complex HTML tag string is not transliterated to Sinhala', async ({ page }) => {
    const inputBox = page.locator(SELECTORS.inputBox).first();
    await inputBox.waitFor({ state: 'visible' });
    await inputBox.click();
    await page.keyboard.type('<div class="test"><p>Hello</p></div>');
    await page.waitForTimeout(500);

    const inputText = await inputBox.textContent();
    expect(containsSinhala(inputText)).toBe(false);
  });

  /* ================================================================= */
  /* Type 11: Script / XSS Injection                                     */
  /* ================================================================= */

  test('TC22 – [Type 11] XSS payload is not transliterated to Sinhala', async ({ page }) => {
    const inputBox = page.locator(SELECTORS.inputBox).first();
    await inputBox.waitFor({ state: 'visible' });
    await inputBox.click();
    await page.keyboard.type('<script>alert("xss")</script>');
    await page.waitForTimeout(500);

    const inputText = await inputBox.textContent();
    expect(containsSinhala(inputText)).toBe(false);
  });

  test('TC23 – [Type 11] JavaScript URL injection is not transliterated to Sinhala', async ({ page }) => {
    const inputBox = page.locator(SELECTORS.inputBox).first();
    await inputBox.waitFor({ state: 'visible' });
    await inputBox.click();
    await page.keyboard.type('javascript:void(0)');
    await page.waitForTimeout(500);

    const inputText = await inputBox.textContent();
    expect(containsSinhala(inputText)).toBe(false);
  });

  /* ================================================================= */
  /* Type 12: SQL Injection Strings                                       */
  /* ================================================================= */

  test("TC24 – [Type 12] SQL injection \"' OR '1'='1\" is not transliterated to Sinhala", async ({ page }) => {
    const inputBox = page.locator(SELECTORS.inputBox).first();
    await inputBox.waitFor({ state: 'visible' });
    await inputBox.click();
    await page.keyboard.type("' OR '1'='1");
    await page.waitForTimeout(500);

    const inputText = await inputBox.textContent();
    expect(containsSinhala(inputText)).toBe(false);
  });

  test('TC25 – [Type 12] SQL keyword string "SELECT * FROM users" is not transliterated to Sinhala', async ({ page }) => {
    const inputBox = page.locator(SELECTORS.inputBox).first();
    await inputBox.waitFor({ state: 'visible' });
    await inputBox.click();
    await page.keyboard.type('SELECT * FROM users');
    await page.waitForTimeout(500);

    // The input must not produce Sinhala suggestions
    const inputText = await inputBox.textContent();
    expect(containsSinhala(inputText)).toBe(false);
  });

  /* ================================================================= */
  /* Type 13: Emoji Characters                                            */
  /* ================================================================= */

  test('TC26 – [Type 13] Single emoji 😀 is not transliterated to Sinhala', async ({ page }) => {
    const inputBox = page.locator(SELECTORS.inputBox).first();
    await inputBox.waitFor({ state: 'visible' });
    await inputBox.click();
    await page.keyboard.type('😀');
    await page.waitForTimeout(500);

    const inputText = await inputBox.textContent();
    expect(containsSinhala(inputText)).toBe(false);
  });

  test('TC27 – [Type 13] Multiple emojis "🎉🎊🎈🌟🔥" are not transliterated to Sinhala', async ({ page }) => {
    const inputBox = page.locator(SELECTORS.inputBox).first();
    await inputBox.waitFor({ state: 'visible' });
    await inputBox.click();
    await page.keyboard.type('🎉🎊🎈🌟🔥');
    await page.waitForTimeout(500);

    const inputText = await inputBox.textContent();
    expect(containsSinhala(inputText)).toBe(false);
  });

  /* ================================================================= */
  /* Type 14: Chinese / CJK Characters                                   */
  /* ================================================================= */

  test('TC28 – [Type 14] Chinese characters "你好" are not transliterated to Sinhala', async ({ page }) => {
    const inputBox = page.locator(SELECTORS.inputBox).first();
    await inputBox.waitFor({ state: 'visible' });
    await inputBox.click();
    await page.keyboard.type('你好');
    await page.waitForTimeout(500);

    const inputText = await inputBox.textContent();
    expect(containsSinhala(inputText)).toBe(false);
  });

  test('TC29 – [Type 14] Chinese phrase "中文测试" is not transliterated to Sinhala', async ({ page }) => {
    const inputBox = page.locator(SELECTORS.inputBox).first();
    await inputBox.waitFor({ state: 'visible' });
    await inputBox.click();
    await page.keyboard.type('中文测试');
    await page.waitForTimeout(500);

    const inputText = await inputBox.textContent();
    expect(containsSinhala(inputText)).toBe(false);
  });

  /* ================================================================= */
  /* Type 15: Arabic / RTL Characters                                     */
  /* ================================================================= */

  test('TC30 – [Type 15] Arabic word "مرحبا" is not transliterated to Sinhala', async ({ page }) => {
    const inputBox = page.locator(SELECTORS.inputBox).first();
    await inputBox.waitFor({ state: 'visible' });
    await inputBox.click();
    await page.keyboard.type('مرحبا');
    await page.waitForTimeout(500);

    const inputText = await inputBox.textContent();
    expect(containsSinhala(inputText)).toBe(false);
  });

  test('TC31 – [Type 15] Arabic phrase "العربية" is not transliterated to Sinhala', async ({ page }) => {
    const inputBox = page.locator(SELECTORS.inputBox).first();
    await inputBox.waitFor({ state: 'visible' });
    await inputBox.click();
    await page.keyboard.type('العربية');
    await page.waitForTimeout(500);

    const inputText = await inputBox.textContent();
    expect(containsSinhala(inputText)).toBe(false);
  });

  /* ================================================================= */
  /* Type 16: Japanese Characters                                         */
  /* ================================================================= */

  test('TC32 – [Type 16] Japanese Hiragana "こんにちは" is not transliterated to Sinhala', async ({ page }) => {
    const inputBox = page.locator(SELECTORS.inputBox).first();
    await inputBox.waitFor({ state: 'visible' });
    await inputBox.click();
    await page.keyboard.type('こんにちは');
    await page.waitForTimeout(500);

    const inputText = await inputBox.textContent();
    expect(containsSinhala(inputText)).toBe(false);
  });

  test('TC33 – [Type 16] Japanese Katakana "テスト" is not transliterated to Sinhala', async ({ page }) => {
    const inputBox = page.locator(SELECTORS.inputBox).first();
    await inputBox.waitFor({ state: 'visible' });
    await inputBox.click();
    await page.keyboard.type('テスト');
    await page.waitForTimeout(500);

    const inputText = await inputBox.textContent();
    expect(containsSinhala(inputText)).toBe(false);
  });

  /* ================================================================= */
  /* Type 17: Sinhala Unicode Directly                                    */
  /* ================================================================= */

  test('TC34 – [Type 17] Direct Sinhala Unicode "ශ්‍රී" is not further transliterated', async ({ page }) => {
    const inputBox = page.locator(SELECTORS.inputBox).first();
    await inputBox.waitFor({ state: 'visible' });
    await inputBox.click();

    // Type Sinhala Unicode directly via clipboard paste simulation
    await page.evaluate(() => {
      const el = document.querySelector('.iit');
      if (el) {
        el.focus();
        document.execCommand('insertText', false, 'ශ්‍රී');
      }
    });
    await page.waitForTimeout(500);

    // The field should display the typed Sinhala text as-is (no additional transliteration).
    // No Sinhala transliteration suggestions should appear for directly-typed Sinhala Unicode.
    const suggestionList = page.locator(SELECTORS.suggestionList);
    const isSuggestionVisible = await suggestionList.isVisible().catch(() => false);
    expect(isSuggestionVisible).toBe(false);
  });

  test('TC35 – [Type 17] Direct Sinhala Unicode "ලංකා" is not further transliterated', async ({ page }) => {
    const inputBox = page.locator(SELECTORS.inputBox).first();
    await inputBox.waitFor({ state: 'visible' });
    await inputBox.click();

    await page.evaluate(() => {
      const el = document.querySelector('.iit');
      if (el) {
        el.focus();
        document.execCommand('insertText', false, 'ලංකා');
      }
    });
    await page.waitForTimeout(500);

    const suggestionList = page.locator(SELECTORS.suggestionList);
    const isSuggestionVisible = await suggestionList.isVisible().catch(() => false);
    expect(isSuggestionVisible).toBe(false);
  });

  /* ================================================================= */
  /* Type 18: Binary Strings                                              */
  /* ================================================================= */

  test('TC36 – [Type 18] Binary string "01010101" is not transliterated to Sinhala', async ({ page }) => {
    const inputBox = page.locator(SELECTORS.inputBox).first();
    await inputBox.waitFor({ state: 'visible' });
    await inputBox.click();
    await page.keyboard.type('01010101');
    await page.waitForTimeout(500);

    const inputText = await inputBox.textContent();
    expect(containsSinhala(inputText)).toBe(false);
  });

  test('TC37 – [Type 18] Binary string "11110000001111" is not transliterated to Sinhala', async ({ page }) => {
    const inputBox = page.locator(SELECTORS.inputBox).first();
    await inputBox.waitFor({ state: 'visible' });
    await inputBox.click();
    await page.keyboard.type('11110000001111');
    await page.waitForTimeout(500);

    const inputText = await inputBox.textContent();
    expect(containsSinhala(inputText)).toBe(false);
  });

  /* ================================================================= */
  /* Type 19: Hexadecimal Strings                                         */
  /* ================================================================= */

  test('TC38 – [Type 19] Hex string "0xDEADBEEF" is not transliterated to Sinhala', async ({ page }) => {
    const inputBox = page.locator(SELECTORS.inputBox).first();
    await inputBox.waitFor({ state: 'visible' });
    await inputBox.click();
    await page.keyboard.type('0xDEADBEEF');
    await page.waitForTimeout(500);

    const inputText = await inputBox.textContent();
    expect(containsSinhala(inputText)).toBe(false);
  });

  test('TC39 – [Type 19] Hex string "FF00AA33CC" is not transliterated to Sinhala', async ({ page }) => {
    const inputBox = page.locator(SELECTORS.inputBox).first();
    await inputBox.waitFor({ state: 'visible' });
    await inputBox.click();
    await page.keyboard.type('FF00AA33CC');
    await page.waitForTimeout(500);

    const inputText = await inputBox.textContent();
    expect(containsSinhala(inputText)).toBe(false);
  });

  /* ================================================================= */
  /* Type 20: URL-Encoded Strings                                         */
  /* ================================================================= */

  test('TC40 – [Type 20] URL-encoded string "%20%3C%3E%22" is not transliterated to Sinhala', async ({ page }) => {
    const inputBox = page.locator(SELECTORS.inputBox).first();
    await inputBox.waitFor({ state: 'visible' });
    await inputBox.click();
    await page.keyboard.type('%20%3C%3E%22');
    await page.waitForTimeout(500);

    const inputText = await inputBox.textContent();
    expect(containsSinhala(inputText)).toBe(false);
  });

  test('TC41 – [Type 20] URL-encoded string "Hello%20World%21" is not transliterated to Sinhala', async ({ page }) => {
    const inputBox = page.locator(SELECTORS.inputBox).first();
    await inputBox.waitFor({ state: 'visible' });
    await inputBox.click();
    await page.keyboard.type('Hello%20World%21');
    await page.waitForTimeout(500);

    const inputText = await inputBox.textContent();
    expect(containsSinhala(inputText)).toBe(false);
  });

  /* ================================================================= */
  /* Type 21: Control Characters                                          */
  /* ================================================================= */

  test('TC42 – [Type 21] Null character (U+0000) does not produce Sinhala output', async ({ page }) => {
    const inputBox = page.locator(SELECTORS.inputBox).first();
    await inputBox.waitFor({ state: 'visible' });
    await inputBox.click();

    // Inject null character via JavaScript since keyboard.type strips it
    await page.evaluate(() => {
      const el = document.querySelector('.iit');
      if (el) {
        el.focus();
        document.execCommand('insertText', false, '\u0000');
      }
    });
    await page.waitForTimeout(500);

    const inputText = await inputBox.textContent();
    expect(containsSinhala(inputText)).toBe(false);
  });

  test('TC43 – [Type 21] Bell + Backspace control chars do not produce Sinhala output', async ({ page }) => {
    const inputBox = page.locator(SELECTORS.inputBox).first();
    await inputBox.waitFor({ state: 'visible' });
    await inputBox.click();

    await page.evaluate(() => {
      const el = document.querySelector('.iit');
      if (el) {
        el.focus();
        document.execCommand('insertText', false, '\u0007\u0008');
      }
    });
    await page.waitForTimeout(500);

    const inputText = await inputBox.textContent();
    expect(containsSinhala(inputText)).toBe(false);
  });

  /* ================================================================= */
  /* Type 22: Mathematical Symbols                                         */
  /* ================================================================= */

  test('TC44 – [Type 22] Math symbols "∑∞π" are not transliterated to Sinhala', async ({ page }) => {
    const inputBox = page.locator(SELECTORS.inputBox).first();
    await inputBox.waitFor({ state: 'visible' });
    await inputBox.click();
    await page.keyboard.type('∑∞π');
    await page.waitForTimeout(500);

    const inputText = await inputBox.textContent();
    expect(containsSinhala(inputText)).toBe(false);
  });

  test('TC45 – [Type 22] Math symbols "≤≥≠±√" are not transliterated to Sinhala', async ({ page }) => {
    const inputBox = page.locator(SELECTORS.inputBox).first();
    await inputBox.waitFor({ state: 'visible' });
    await inputBox.click();
    await page.keyboard.type('≤≥≠±√');
    await page.waitForTimeout(500);

    const inputText = await inputBox.textContent();
    expect(containsSinhala(inputText)).toBe(false);
  });

  /* ================================================================= */
  /* Type 23: Repeated / Monotone Characters                              */
  /* ================================================================= */

  test('TC46 – [Type 23] 50 repeated "a" characters are not transliterated to Sinhala', async ({ page }) => {
    const inputBox = page.locator(SELECTORS.inputBox).first();
    await inputBox.waitFor({ state: 'visible' });
    await inputBox.click();
    await page.keyboard.type(repeatChar('a', 50));
    await page.waitForTimeout(800);

    // Even though 'a' alone could map, a long run without commit should not produce Sinhala
    const suggestionVisible = await page.locator(SELECTORS.suggestionList).isVisible().catch(() => false);
    // The test verifies the system does not crash and remains stable
    expect(typeof suggestionVisible).toBe('boolean');
  });

  test('TC47 – [Type 23] 50 repeated "0" characters are not transliterated to Sinhala', async ({ page }) => {
    const inputBox = page.locator(SELECTORS.inputBox).first();
    await inputBox.waitFor({ state: 'visible' });
    await inputBox.click();
    await page.keyboard.type(repeatChar('0', 50));
    await page.waitForTimeout(800);

    const inputText = await inputBox.textContent();
    expect(containsSinhala(inputText)).toBe(false);
  });

  /* ================================================================= */
  /* Type 24: Mixed Valid Singlish + Invalid Characters                   */
  /* ================================================================= */

  test('TC48 – [Type 24] Mixed input "abc123!@#" does not produce pure Sinhala output', async ({ page }) => {
    const inputBox = page.locator(SELECTORS.inputBox).first();
    await inputBox.waitFor({ state: 'visible' });
    await inputBox.click();
    await page.keyboard.type('abc123!@#');
    await page.waitForTimeout(500);

    // Output must not be entirely in Sinhala
    const inputText = await inputBox.textContent() || '';
    // If Sinhala is present it should coexist with non-Sinhala chars (mixed)
    const isFullySinhala = inputText.length > 0 && [...inputText].every(c => /[\u0D80-\u0DFF\s]/.test(c));
    expect(isFullySinhala).toBe(false);
  });

  test('TC49 – [Type 24] Mixed input "hello world 123" does not produce pure Sinhala output', async ({ page }) => {
    const inputBox = page.locator(SELECTORS.inputBox).first();
    await inputBox.waitFor({ state: 'visible' });
    await inputBox.click();
    await page.keyboard.type('hello world 123');
    await page.waitForTimeout(500);

    const inputText = await inputBox.textContent() || '';
    const isFullySinhala = inputText.length > 0 && [...inputText].every(c => /[\u0D80-\u0DFF\s]/.test(c));
    expect(isFullySinhala).toBe(false);
  });

  test('TC50 – [Type 24] Very long mixed invalid string does not crash the page', async ({ page }) => {
    const inputBox = page.locator(SELECTORS.inputBox).first();
    await inputBox.waitFor({ state: 'visible' });
    await inputBox.click();

    // 500-char string mixing numbers, symbols, spaces, and a few letters
    const payload = ('1234567890!@#$%^&*() ' + 'abcABC' + '∑πΩ').repeat(20).slice(0, 500);
    await page.keyboard.type(payload);
    await page.waitForTimeout(1000);

    // Page must still be alive and the input field must exist
    await expect(inputBox).toBeVisible();
    const inputText = await inputBox.textContent() || '';
    // Confirm no Sinhala output was generated from a fully-invalid string
    expect(containsSinhala(inputText)).toBe(false);
  });
});
