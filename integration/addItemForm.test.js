describe('addItemForm', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://localhost:6006/iframe.html?args=&id=todolists-additemform--base-add-item-form-example',
            {waitUntil: "networkidle2"});

        const image = await page.screenshot();

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
});

// yarn add puppeteer jest-puppeteer jest-image-snapshot start-server-and-test jest jest-environment-jsdom --dev
// "jest:integration": "jest -c integration/jest.config.js",
// "test:integration": "start-server-and-test storybook http-get://localhost:6006 jest:integration"

// yarn run jest:integration --updateSnapshot