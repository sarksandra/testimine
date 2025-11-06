import { test, expect } from '@playwright/test';

test.describe('DataTable sorting', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://datatables.net/examples/basic_init/zero_configuration.html');
    await page.locator('#example').waitFor();
  });

  test('Name column sort asc and desc', async ({ page }) => {
    const nameHeader = page.locator('#example thead th:nth-child(1)');

    await nameHeader.click();
    const ascNames = await page.locator('#example tbody tr td:nth-child(1)').allTextContents();
    const sortedAsc = [...ascNames].sort((a, b) => a.localeCompare(b));
    expect(ascNames).toEqual(sortedAsc);

    await nameHeader.click();
    const descNames = await page.locator('#example tbody tr td:nth-child(1)').allTextContents();
    const sortedDesc = [...sortedAsc].reverse();
    expect(descNames).toEqual(sortedDesc);
  });

  test('Age column sort asc and desc', async ({ page }) => {
    const ageHeader = page.locator('#example thead th:nth-child(4)');

    await ageHeader.click();
    const ascAges = await page.locator('#example tbody tr td:nth-child(4)').allTextContents();
    const ascNums = ascAges.map(a => Number(a));
    const sortedAsc = [...ascNums].sort((a, b) => a - b);
    expect(ascNums).toEqual(sortedAsc);

    await ageHeader.click();
    const descAges = await page.locator('#example tbody tr td:nth-child(4)').allTextContents();
    const descNums = descAges.map(a => Number(a));
    const sortedDesc = [...sortedAsc].reverse();
    expect(descNums).toEqual(sortedDesc);
  });
});
