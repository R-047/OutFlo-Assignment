import { ILead } from "../models/Lead";
import puppeteer, { Browser, Page } from 'puppeteer';

const LINKEDIN_EMAIL = process.env.LINKEDIN_EMAIL || "";
const LINKEDIN_PASSWORD = process.env.LINKEDIN_PASSWORD || "";

export default class Crawler {
    static async getLeadInfo(linkedinUrl: string): Promise<Partial<ILead>> {
        const browser = await Crawler.launchBrowser();
        const page = await browser.newPage();

        try {
            await Crawler.loginToLinkedIn(page);
            const profile = await Crawler.scrapeProfile(page, linkedinUrl);
            console.log("🎉 Profile Data:", profile);
            return profile
        } catch (error) {
            console.error("❌ Error:", error);
            throw new Error(`${error}`)
        } finally {

            await browser.close();
        }
    }

    static async launchBrowser(): Promise<Browser> {
        return await puppeteer.launch({ headless: false });
    }

    static async loginToLinkedIn(page: Page): Promise<void> {
        await page.goto('https://www.linkedin.com/login');

        await page.type('#username', LINKEDIN_EMAIL);
        await page.type('#password', LINKEDIN_PASSWORD);
        await page.click('button[type="submit"]');

        await page.waitForNavigation();
        console.log("✅ Logged into LinkedIn");
    }

    static async scrapeProfile(page: Page, profileUrl: string): Promise<Partial<ILead>> {
        await page.goto(profileUrl);

        await page.waitForSelector('h1.inline.t-24.v-align-middle.break-words', { timeout: 10000 });
        // await page.waitForSelector('.eoLvWudccYfPHgWLxvqmQywxOVpQqtiZuYdLuAQo', { timeout: 10000 });

        const profileData: Partial<ILead> = await page.evaluate(() => {
            const getText = (selector: string) => document.querySelector(selector)?.textContent?.trim() || 'N/A';

            return {
                name: getText('h1.inline.t-24.v-align-middle.break-words'), // Update with correct selector
                job_title: getText('section.artdeco-card:nth-child(7) > div:nth-child(3) > ul:nth-child(1) > li:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > a:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > span:nth-child(1)'),
                company: getText('section.artdeco-card:nth-child(7) > div:nth-child(3) > ul:nth-child(1) > li:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > a:nth-child(1) > span:nth-child(2) > span:nth-child(1)'),
                location: getText('span.text-body-small:nth-child(1)'),
                about: getText('div.ph5:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > span:nth-child(1)'),
            };
        });

        return profileData;
    }

}
