describe('BOOK-ADD-ALTERNATIVE', () => { 

    it("opens the bookadd menu", () => {
        cy.visit("http://localhost:4200/")
    
        cy.get('[class^=login-text]').click({ force: true })
    
        cy.get("input[name=email]").type("test@eplan.pl")
        cy.get("input[name=password]").type("test")
    
        cy.contains("button","Zaloguj").click({ force: true })

        cy.visit("http://localhost:4200/book-add/book-search")
        cy.url().should('include', '/book-add/book-search')
    })

    it("searches and saves the book #1", () => {
        cy.get("input[class=search-text]")
        .should('be.visible')
        .type("Beginning ATL 3 COM Programming{enter}")
        
        cy.contains("span", "Beginning ATL 3 COM Programming")
        .should('be.visible')
        .click({ force: true })

        
        cy.get("span[class='mat-button-wrapper']")
        .contains("Zapisz")
        .should('be.visible')
        .first().click({ force: true })

        cy.get("input[class=search-text]").clear({ force: true })

    })

    it("searches and saves the book #2", () => {
        cy.get("input[class=search-text]")
        .should('be.visible')
        .type("Design Patterns{enter}")
        
        cy.contains("span", "Design Patterns")
        .should('be.visible')
        .click({ force: true })

        
        cy.get("span[class='mat-button-wrapper']")
        .contains("Zapisz")
        .should('be.visible')
        .first().click({ force: true })

        cy.get("input[class=search-text]").clear({ force: true })

    })

    it("searches and saves the book #3", () => {
        cy.get("input[class=search-text]")
        .should('be.visible')
        .type("Exceptional C++{enter}")
        
        cy.contains("span", "Exceptional C++")
        .should('be.visible')
        .click({ force: true })

        
        cy.get("span[class='mat-button-wrapper']")
        .contains("Zapisz")
        .should('be.visible')
        .first().click({ force: true })

        cy.get("input[class=search-text]").clear({ force: true })

    })

    it("searches and saves the book #4", () => {
        cy.get("input[class=search-text]")
        .should('be.visible')
        .type("C++ Templates{enter}")
        
        cy.contains("span", "C++ Templates")
        .should('be.visible')
        .click({ force: true })

        
        cy.get("span[class='mat-button-wrapper']")
        .contains("Zapisz")
        .should('be.visible')
        .first().click({ force: true })

        cy.get("input[class=search-text]").clear({ force: true })

    })

    it("searches and saves the book #5", () => {
        cy.get("input[class=search-text]")
        .should('be.visible')
        .type("Large-scale C++ Software Design{enter}")
        
        cy.contains("span", "Large-scale C++ Software Design")
        .should('be.visible')
        .click({ force: true })

        
        cy.get("span[class='mat-button-wrapper']")
        .contains("Zapisz")
        .should('be.visible')
        .first().click({ force: true })

        cy.get("input[class=search-text]").clear({ force: true })

    })
    
    it("searches and saves the book #6", () => {
        cy.get("input[class=search-text]")
        .should('be.visible')
        .type("ABC Visual Basic 6{enter}")
        
        cy.contains("span", "ABC Visual Basic 6")
        .should('be.visible')
        .click({ force: true })

        
        cy.get("span[class='mat-button-wrapper']")
        .contains("Zapisz")
        .should('be.visible')
        .first().click({ force: true })

        cy.get("input[class=search-text]").clear({ force: true })

    })

    it("searches and saves the book #7", () => {
        cy.get("input[class=search-text]")
        .should('be.visible')
        .type("Visual Basic 6 Księga Eksperta{enter}")
        
        cy.contains("span", "Visual BASIC 6")
        .should('be.visible')
        .click({ force: true })

        
        cy.get("span[class='mat-button-wrapper']")
        .contains("Zapisz")
        .should('be.visible')
        .first().click({ force: true })

        cy.get("input[class=search-text]").clear({ force: true })

    })
    
    it("searches and saves the book #8", () => {
        cy.get("input[class=search-text]")
        .should('be.visible')
        .type(" Crystal Reports(R) 9: The Complete Reference {enter}")
        
        cy.contains("span", " Crystal Reports(R) 9: The Complete Reference ")
        .should('be.visible')
        .click({ force: true })

        
        cy.get("span[class='mat-button-wrapper']")
        .contains("Zapisz")
        .should('be.visible')
        .first().click({ force: true })

        cy.get("input[class=search-text]").clear({ force: true })

    })

    it("searches and saves the book #9", () => {
        cy.get("input[class=search-text]")
        .should('be.visible')
        .type("Nie tylko wirusy{enter}")
        
        cy.contains("span", "Nie tylko wirusy")
        .should('be.visible')
        .click({ force: true })

        
        cy.get("span[class='mat-button-wrapper']")
        .contains("Zapisz")
        .should('be.visible')
        .first().click({ force: true })

        cy.get("input[class=search-text]").clear({ force: true })

    })

    it("searches and saves the book #10", () => {
        cy.get("input[class=search-text]")
        .should('be.visible')
        .type("Programowanie Windows 2000 - czarna księga{enter}")
        
        cy.contains("span", "Programowanie Windows 2000 - czarna księga")
        .should('be.visible')
        .click({ force: true })

        
        cy.get("span[class='mat-button-wrapper']")
        .contains("Zapisz")
        .should('be.visible')
        .first().click({ force: true })

        cy.get("input[class=search-text]").clear({ force: true })

    })

    it("goes back into the library", () => {
        cy.visit("http://localhost:4200/")
    })

})