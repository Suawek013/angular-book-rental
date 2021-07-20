describe('Serchbar tests', () => { 

    beforeEach(() => {
        cy.visit("http://localhost:4200/")//todo: zmienna
        cy.get('[id^=loupe]').click()
    })
    
    it("Empty result", () => {
        cy.get("input[id^='search']").type("java")
        cy.get("div[class^='book-container']").children().should('have.length', 1)
        cy.get("div.book-container").should('be.empty')
    })


    it("Searching for one book by title", () => {
        cy.get("input[id^='search']").type("atl")
        cy.get("div[class^='book-container']").children().should('have.length', 2)
        cy.get("p.book-title").should('contain','ATL')
    })

    it("Checking polish characters", () => {
        cy.get("input[id^='search']").type("księga")
        cy.get("p.book-title").should('contain','księga')
    })

    it("Searching for books by title", () => {
        cy.get("input[id^='search']").type("c++")
        for (var x = 0; x < 3; x++) { //todo: book-container.length
            cy.get("p.book-title").its(x).should('contain','C++') 
        }
        cy.get("div[class^='book-container']").children().should('have.length', 4)//todo: greater than 1
    })

    it("Searching for one book by author", () => {
        cy.get("input[id^='search']").type("al williams")
        cy.get("div[class^='book-container']").children().should('have.length', 2)
        cy.get("p.book-author").should('contain','Al Williams')
    })

    it("Searching for books by author", () => {
        cy.get("input[id^='search']").type("george")
        cy.get("div[class^='book-container']").children().should('have.length', 3)//todo: greater than 2
        for (var x = 0; x < 3; x++) {//todo: book-container.length
            cy.get("p.book-author").should('contain','George')
        }
    })
    
})