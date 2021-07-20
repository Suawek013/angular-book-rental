describe('BOOK-DELETE', () => { 
    
    it("login and open the bookadd management", () => {
        cy.visit("http://localhost:4200/") //zmienna globalna
    
        cy.get('[class^=login-text]').click()
    
        cy.get("input[name=email]").type("test@eplan.pl")
        cy.get("input[name=password]").type("test")
    
        cy.contains("button","Zaloguj").click()

        cy.visit("http://localhost:4200/book-add/book-list")
        cy.url().should('include', '/book-add/book-list')

    })

    it("delete the First book", () => {
      
        cy.get("span[class='mat-content ng-tns-c141-1']") //poszukać czytelniejszych selektorów
        //rozszerzyć css
        .should('be.visible')
        .click({ force: true })

        cy.get("span[class='mat-button-wrapper']")
        cy.contains("span","USUŃ")
        .should('be.visible')
        .click({ force: true })

       //pętla (dopóki nie będzie napisu "brak książek")
      // .should('be.visible')

    })

    it("delete the Second book", () => {
      
        cy.get("span[class='mat-content ng-tns-c141-3']")
        .should('be.visible')
        .click({ force: true })

        cy.get("span[class='mat-button-wrapper']")
        cy.contains("span","USUŃ")
        .should('be.visible')
        .click({ force: true })
    })

    it("delete the Third book", () => {
      
        cy.get("span[class='mat-content ng-tns-c141-5']")
        .should('be.visible')
        .click({ force: true })

        cy.get("span[class='mat-button-wrapper']")
        cy.contains("span","USUŃ")
        .should('be.visible')
        .click({ force: true })
    })

    it("delete the Fourth book", () => {
      
        cy.get("span[class='mat-content ng-tns-c141-7']")
        .should('be.visible')
        .click({ force: true })

        cy.get("span[class='mat-button-wrapper']")
        cy.contains("span","USUŃ")
        .should('be.visible')
        .click({ force: true })
    })

    it("delete the Fifth book", () => {
      
        cy.get("span[class='mat-content ng-tns-c141-9']")
        .should('be.visible')
        .click({ force: true })

        cy.get("span[class='mat-button-wrapper']")
        cy.contains("span","USUŃ")
        .should('be.visible')
        .click({ force: true })
    })

    it("delete the Sixth book", () => {
      
        cy.get("span[class='mat-content ng-tns-c141-11']")
        .should('be.visible')
        .click({ force: true })

        cy.get("span[class='mat-button-wrapper']")
        cy.contains("span","USUŃ")
        .should('be.visible')
        .click({ force: true })
    })

    it("delete the Seventh book", () => {
      
        cy.get("span[class='mat-content ng-tns-c141-13']")
        .should('be.visible')
        .click({ force: true })

        cy.get("span[class='mat-button-wrapper']")
        cy.contains("span","USUŃ")
        .should('be.visible')
        .click({ force: true })
    })

    it("delete the Eighth book", () => {
      
        cy.get("span[class='mat-content ng-tns-c141-15']")
        .should('be.visible')
        .click({ force: true })

        cy.get("span[class='mat-button-wrapper']")
        cy.contains("span","USUŃ")
        .should('be.visible')
        .click({ force: true })
    })

    it("delete the Ninth book", () => {
      
        cy.get("span[class='mat-content ng-tns-c141-17']")
        .should('be.visible')
        .click({ force: true })

        cy.get("span[class='mat-button-wrapper']")
        cy.contains("span","USUŃ")
        .should('be.visible')
        .click({ force: true })
    })

    it("delete the Tenth book", () => {
      
        cy.get("span[class='mat-content ng-tns-c141-19']")
        .should('be.visible')
        .click({ force: true })

        cy.get("span[class='mat-button-wrapper']")
        cy.contains("span","USUŃ")
        .should('be.visible')
        .click({ force: true })

        //cy.get("p[class='info-text mat-body-1']")
        cy.contains("p"," Brak książek")
        .should('be.visible')
    })
})