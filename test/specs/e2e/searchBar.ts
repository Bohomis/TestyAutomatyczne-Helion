import GlobalPage from "../../pages/GlobalPage";
import { helionHomeUrl, searchPageUrl, notFoundUrl } from "../../config/pagesUrl";
import SearchBarPage from "../../pages/components/SearchBarPage";
import { searchPhrase, searchResultTitle,incorrectSearchPhrase,notFoundAlert } from "../../config/data";
import SearchResultPage from "../../pages/SearchResultPage";




describe("E2E - SearchBar", async () => {
    it("Should open helion home page and verify url and visible searchbar", async () => {
        await GlobalPage.openPage(helionHomeUrl, helionHomeUrl);
        await SearchBarPage.searchBarIsVisible();
    })
    it("Should click on search icon, and verify url", async () => {
        await SearchBarPage.clickOnSearchIcon();
        await expect(browser).toHaveUrl(helionHomeUrl);
    })
    it("Should type search value and verify visible popup", async () => {
        await SearchBarPage.typeSearchPhrase(searchPhrase);
        await SearchBarPage.suggestPopupIsVisible();
    })
    it("Should click on see all books button", async () => {
        await SearchBarPage.clickOnSeeAllBooksBtn();
        await browser.pause(1000);
        await expect(browser).toHaveUrl(searchPageUrl);
    })
    it("Should verify visible correctly title and number of books", async () => {
        const title:string = await SearchResultPage.getPageTitle();
        const numberofBooks: number = await SearchResultPage.getNumberOfBooks();
        await browser.pause(1000);
        await expect(title).toContain(searchResultTitle);
        await expect(numberofBooks).toEqual(20);
    })
    it("Should clear input value", async() => {
        await SearchBarPage.clearSearchBar();
        await expect(await SearchBarPage.getInputValue()).toContain("");
    })
    it("Should type incorrect book name and verify alert", async() => {
        await SearchBarPage.typeSearchPhrase(incorrectSearchPhrase);
        await SearchBarPage.clickOnSearchIcon();
        await expect(await SearchBarPage.getNotFoundAlertText()).toContain(notFoundAlert);
    })
    it("Should clear input value and click on search icon", async() => {
        await SearchBarPage.clearSearchBar();
        await SearchBarPage.clickOnSearchIcon();
        await expect(browser).toHaveUrl(notFoundUrl);
        await expect(await SearchBarPage.getInputValue()).toContain(incorrectSearchPhrase);
    })

})