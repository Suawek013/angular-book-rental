describe('ADD-BOOK-CATEGORIES', () => { 
    
    it("login and open the bookadd management", () => {
        cy.visit("http://localhost:4200/") //zmienna globalna
    
        cy.get('[class^=login-text]').click()
    
        cy.get("input[name=email]").type("test@eplan.pl")
        cy.get("input[name=password]").type("test")
    
        cy.contains("button","Zaloguj").click()

        cy.visit("http://localhost:4200/book-add/book-list")
        cy.url().should('include', '/book-add/book-list')

    })
    it("Add 5 categories", () => {

        cy.get("span[class='mat-button-wrapper']")
        cy.contains("span","Edytuj kategorie")
        .should('be.visible')
        .click({ force: true })
//1
        cy.get("span[class='mat-button-wrapper']")
        cy.contains("span","Dodaj kategorie")
        .should('be.visible')
        .click({ force: true })
//2
        cy.get("span[class='mat-button-wrapper']")
        cy.contains("span","Dodaj kategorie")
        .should('be.visible')
        .click({ force: true })
//3
        cy.get("span[class='mat-button-wrapper']")
        cy.contains("span","Dodaj kategorie")
        .should('be.visible')
        .click({ force: true })
//4
        cy.get("span[class='mat-button-wrapper']")
        cy.contains("span","Dodaj kategorie")
        .should('be.visible')
        .click({ force: true })

        cy.get("input[id='mat-input-0']")
        .click({ force: true })
        .type("Kategoria nr 1",{ force: true })
        
        cy.get("input[id='mat-input-1']")
        .click({ force: true })
        .type("Kategoria nr 2",{ force: true })

        cy.get("input[id='mat-input-2']")
        .click({ force: true })
        .type("Kategoria nr 3",{ force: true })

        cy.get("input[id='mat-input-3']")
        .click({ force: true })
        .type("Kategoria nr 4",{ force: true })

       // cy.get("input[id^='mat-input-0']").clear()

       cy.get("span[class='mat-button-wrapper']")
        cy.contains("span","Zapisz zmiany")
        .should('be.visible')
        .click({ force: true })
    })
})