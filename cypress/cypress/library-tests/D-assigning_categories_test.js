describe('ASSINGING-BOOK-CATEGORIES', () => { 
    
    it("Assigning categories for second book", () => {
        cy.visit("http://localhost:4200/") //zmienna globalna
    
        cy.get('[class^=login-text]').click()
    
        cy.get("input[name=email]").type("test@eplan.pl")
        cy.get("input[name=password]").type("test")
    
        cy.contains("button","Zaloguj").click()

        cy.visit("http://localhost:4200/book-add/edit/b34f9393-3263-4909-8ff1-3b661ecb1841")

        cy.get("span[class='mat-button-wrapper']")
        cy.contains("span","Zarządzanie")
        .should('be.visible')
        .click({ force: true })

        cy.get("span[class='mat-button-wrapper']")
        cy.contains("span","EDYTUJ")
        .click({ force: true })

        cy.get("input[name=author]")
        .click({ force: true })
        cy.get("input[name=author]").clear({ force: true })
        .type("Grimes, Richard",{ force: true })

        cy.get("svg[class='mat-datepicker-toggle-default-icon ng-star-inserted']")
        .should('be.visible')
        .click({ force: true })

        cy.get("div[class='mat-calendar-body-cell-content mat-focus-indicator']")
        cy.contains("div","12")
        .should('be.visible')
        .click()

        cy.get("div[class^=mat-select-value]") .click({force: true})

        cy.get("span[class='mat-option-text']")
        cy.contains("span","Kategoria nr 1")
        .should('be.visible')
        .click({ force: true })

        cy.get("span[class='mat-option-text']")
        cy.contains("span","Kategoria nr 2")
        .should('be.visible')
        .click({ force: true })

        cy.get("span[class='mat-option-text']")
        cy.contains("span","Kategoria nr 3")
        .should('be.visible')
        .click({ force: true })

        cy.get("span[class='mat-option-text']")
        cy.contains("span","Kategoria nr 4")
        .should('be.visible')
        .click({ force: true })

        cy.get("span[class='mat-button-wrapper']")
        cy.contains("span","Zapisz książkę")
        .should('be.visible')
        .click({ force: true })
/*/
        cy.get("span[class='mat-ripple mat-button-ripple mat-button-ripple-round']")
        .first()
        .click({ force: true })

        cy.get("input[name=isbn]")
        .click({ force: true })
        .clear()
        .type("Smok")

        cy.get("span[class='mat-button-wrapper']")
        cy.contains("span","Zapisz książkę")
        .should('be.visible')
        .click({ force: true })
    })
    /*/
    /*/
    it("Add book to category", () => {

        cy.get("span[class='mat-content ng-tns-c141-1']") //poszukać czytelniejszych selektorów
        //rozszerzyć css
        .should('be.visible')
        .click({ force: true })

        cy.get("span[class='mat-button-wrapper']")
        cy.contains("span","USUŃ")
        .should('be.visible')
        .click({ force: true })
    })
    it("comes back to homepage", () => {
        cy.visit("http://localhost:4200/");

})
/*/

    })

    it("Assigning categories for second book", () => {

        cy.visit("http://localhost:4200/") //zmienna globalna
    
        cy.get('[class^=login-text]').click()
    
        cy.get("input[name=email]").type("test@eplan.pl")
        cy.get("input[name=password]").type("test")
    
        cy.contains("button","Zaloguj").click()

        cy.visit("http://localhost:4200/book-add/edit/b13ff60f-8c6a-47f8-947f-907abca48813")
        
        cy.get("input[name=author]")
        .click({ force: true })

        cy.get("input[name=author]").clear({ force: true })
        .type("Gamma, Erich",{ force: true })

        cy.get("svg[class='mat-datepicker-toggle-default-icon ng-star-inserted']")
        .should('be.visible')
        .click({ force: true })

        cy.get("div[class='mat-calendar-body-cell-content mat-focus-indicator']")
        cy.contains("div","12")
        .should('be.visible')
        .click()

        cy.get("div[class^=mat-select-value]") .click({force: true})

        cy.get("span[class='mat-option-text']")
        cy.contains("span","Kategoria nr 1")
        .should('be.visible')
        .click({ force: true })

        cy.get("span[class='mat-option-text']")
        cy.contains("span","Kategoria nr 2")
        .should('be.visible')
        .click({ force: true })

        cy.get("span[class='mat-option-text']")
        cy.contains("span","Kategoria nr 3")
        .should('be.visible')
        .click({ force: true })

        cy.get("span[class='mat-button-wrapper']")
        cy.contains("span","Zapisz książkę")
        .should('be.visible')
        .click({ force: true })
    })

    it("Assigning categories for third book", () => {

        cy.visit("http://localhost:4200/") //zmienna globalna
    
        cy.get('[class^=login-text]').click()
    
        cy.get("input[name=email]").type("test@eplan.pl")
        cy.get("input[name=password]").type("test")
    
        cy.contains("button","Zaloguj").click()

        cy.visit("http://localhost:4200/book-add/edit/512a2194-dfcf-4909-bd9e-c61238a5ab96")
        
        cy.get("input[name=author]")
        .click({ force: true })

        cy.get("input[name=author]").clear({ force: true })
        .type("Eberly, Schneider",{ force: true })

        cy.get("svg[class='mat-datepicker-toggle-default-icon ng-star-inserted']")
        .should('be.visible')
        .click({ force: true })

        cy.get("div[class='mat-calendar-body-cell-content mat-focus-indicator']")
        cy.contains("div","12")
        .should('be.visible')
        .click()

        cy.get("div[class^=mat-select-value]") .click({force: true})

        cy.get("span[class='mat-option-text']")
        cy.contains("span","Kategoria nr 1")
        .should('be.visible')
        .click({ force: true })

        cy.get("span[class='mat-option-text']")
        cy.contains("span","Kategoria nr 2")
        .should('be.visible')
        .click({ force: true })

        cy.get("span[class='mat-button-wrapper']")
        cy.contains("span","Zapisz książkę")
        .should('be.visible')
        .click({ force: true })
    })

    it("Assigning categories for fourth book", () => {

        cy.visit("http://localhost:4200/") //zmienna globalna
    
        cy.get('[class^=login-text]').click()
    
        cy.get("input[name=email]").type("test@eplan.pl")
        cy.get("input[name=password]").type("test")
    
        cy.contains("button","Zaloguj").click()

        cy.visit("http://localhost:4200/book-add/edit/d32a6e11-8cab-40b6-bf51-54a8dadf331a")
        
        cy.get("input[name=author]")
        .click({ force: true })

        cy.get("input[name=author]").clear({ force: true })
        .type("Slutter, Herb",{ force: true })

        cy.get("svg[class='mat-datepicker-toggle-default-icon ng-star-inserted']")
        .should('be.visible')
        .click({ force: true })

        cy.get("div[class='mat-calendar-body-cell-content mat-focus-indicator']")
        cy.contains("div","12")
        .should('be.visible')
        .click()

        cy.get("div[class^=mat-select-value]") .click({force: true})

        cy.get("span[class='mat-option-text']")
        cy.contains("span","Kategoria nr 1")
        .should('be.visible')
        .click({ force: true })

        cy.get("span[class='mat-button-wrapper']")
        cy.contains("span","Zapisz książkę")
        .should('be.visible')
        .click({ force: true })
    })

    it("Assigning categories for fifth book", () => {

        cy.visit("http://localhost:4200/") //zmienna globalna
    
        cy.get('[class^=login-text]').click()
    
        cy.get("input[name=email]").type("test@eplan.pl")
        cy.get("input[name=password]").type("test")
    
        cy.contains("button","Zaloguj").click()

        cy.visit("http://localhost:4200/book-add/edit/10924fd6-4356-4a71-9b3c-79f00a344bc1")
        
        cy.get("input[name=author]")
        .click({ force: true })

        cy.get("input[name=author]").clear({ force: true })
        .type("Alexandrescu, Andrei",{ force: true })

        cy.get("svg[class='mat-datepicker-toggle-default-icon ng-star-inserted']")
        .should('be.visible')
        .click({ force: true })

        cy.get("div[class='mat-calendar-body-cell-content mat-focus-indicator']")
        cy.contains("div","12")
        .should('be.visible')
        .click()

        cy.get("div[class^=mat-select-value]") .click({force: true})

        cy.get("span[class='mat-button-wrapper']")
        cy.contains("span","Zapisz książkę")
        .should('be.visible')
        .click({ force: true })
    })

    it("Assigning categories for sixth book", () => {

        cy.visit("http://localhost:4200/") //zmienna globalna
    
        cy.get('[class^=login-text]').click()
    
        cy.get("input[name=email]").type("test@eplan.pl")
        cy.get("input[name=password]").type("test")
    
        cy.contains("button","Zaloguj").click()

        cy.visit("http://localhost:4200/book-add/edit/6b5f653f-00ed-459a-80f8-9274a0f6c4ce")
        
        cy.get("input[name=author]")
        .click({ force: true })

        cy.get("input[name=author]").clear({ force: true })
        .type("Vanderrorde, David",{ force: true })

        cy.get("svg[class='mat-datepicker-toggle-default-icon ng-star-inserted']")
        .should('be.visible')
        .click({ force: true })

        cy.get("div[class='mat-calendar-body-cell-content mat-focus-indicator']")
        cy.contains("div","12")
        .should('be.visible')
        .click()

        cy.get("div[class^=mat-select-value]") .click({force: true})


        cy.get("span[class='mat-option-text']")
        cy.contains("span","Kategoria nr 2")
        .should('be.visible')
        .click({ force: true })

        cy.get("span[class='mat-option-text']")
        cy.contains("span","Kategoria nr 3")
        .should('be.visible')
        .click({ force: true })


        cy.get("span[class='mat-button-wrapper']")
        cy.contains("span","Zapisz książkę")
        .should('be.visible')
        .click({ force: true })
    })

    it("Assigning categories for seventh book", () => {

        cy.visit("http://localhost:4200/") //zmienna globalna
    
        cy.get('[class^=login-text]').click()
    
        cy.get("input[name=email]").type("test@eplan.pl")
        cy.get("input[name=password]").type("test")
    
        cy.contains("button","Zaloguj").click()

        cy.visit("http://localhost:4200/book-add/edit/dc1dd1d2-32c3-4be4-aab2-e3a1d88541fc")
        
        cy.get("input[name=author]")
        .click({ force: true })

        cy.get("input[name=author]").clear({ force: true })
        .type("Lakos, John",{ force: true })

        cy.get("svg[class='mat-datepicker-toggle-default-icon ng-star-inserted']")
        .should('be.visible')
        .click({ force: true })

        cy.get("div[class='mat-calendar-body-cell-content mat-focus-indicator']")
        cy.contains("div","12")
        .should('be.visible')
        .click()

        cy.get("div[class^=mat-select-value]") .click({force: true})


        cy.get("span[class='mat-option-text']")
        cy.contains("span","Kategoria nr 2")
        .should('be.visible')
        .click({ force: true })


        cy.get("span[class='mat-option-text']")
        cy.contains("span","Kategoria nr 4")
        .should('be.visible')
        .click({ force: true })

        cy.get("span[class='mat-button-wrapper']")
        cy.contains("span","Zapisz książkę")
        .should('be.visible')
        .click({ force: true })
    })

    it("Assigning categories for eighth book", () => {

        cy.visit("http://localhost:4200/") //zmienna globalna
    
        cy.get('[class^=login-text]').click()
    
        cy.get("input[name=email]").type("test@eplan.pl")
        cy.get("input[name=password]").type("test")
    
        cy.contains("button","Zaloguj").click()

        cy.visit("http://localhost:4200/book-add/edit/49195fc3-7cf7-4112-a686-c79882570ab5")
        
        cy.get("input[name=author]")
        .click({ force: true })

        cy.get("input[name=author]").clear({ force: true })
        .type("Czogalik, Bogdan",{ force: true })

        cy.get("svg[class='mat-datepicker-toggle-default-icon ng-star-inserted']")
        .should('be.visible')
        .click({ force: true })

        cy.get("div[class='mat-calendar-body-cell-content mat-focus-indicator']")
        cy.contains("div","12")
        .should('be.visible')
        .click()

        cy.get("div[class^=mat-select-value]") .click({force: true})

        cy.get("span[class='mat-option-text']")
        cy.contains("span","Kategoria nr 1")
        .should('be.visible')
        .click({ force: true })

        

        cy.get("span[class='mat-option-text']")
        cy.contains("span","Kategoria nr 3")
        .should('be.visible')
        .click({ force: true })

        

        cy.get("span[class='mat-button-wrapper']")
        cy.contains("span","Zapisz książkę")
        .should('be.visible')
        .click({ force: true })
    })

    it("Assigning categories for ninth book", () => {

        cy.visit("http://localhost:4200/") //zmienna globalna
    
        cy.get('[class^=login-text]').click()
    
        cy.get("input[name=email]").type("test@eplan.pl")
        cy.get("input[name=password]").type("test")
    
        cy.contains("button","Zaloguj").click()

        cy.visit("http://localhost:4200/book-add/edit/2238272f-c7b8-49e6-91f8-199025035d55")
        
        cy.get("input[name=author]")
        .click({ force: true })

        cy.get("input[name=author]").clear({ force: true })
        .type("Tayer, Rob",{ force: true })

        cy.get("svg[class='mat-datepicker-toggle-default-icon ng-star-inserted']")
        .should('be.visible')
        .click({ force: true })

        cy.get("div[class='mat-calendar-body-cell-content mat-focus-indicator']")
        cy.contains("div","12")
        .should('be.visible')
        .click()

        cy.get("div[class^=mat-select-value]") .click({force: true})


        cy.get("span[class='mat-option-text']")
        cy.contains("span","Kategoria nr 2")
        .should('be.visible')
        .click({ force: true })


        cy.get("span[class='mat-button-wrapper']")
        cy.contains("span","Zapisz książkę")
        .should('be.visible')
        .click({ force: true })
    })

    it("Assigning categories for tenth book", () => {

        cy.visit("http://localhost:4200/") //zmienna globalna
    
        cy.get('[class^=login-text]').click()
    
        cy.get("input[name=email]").type("test@eplan.pl")
        cy.get("input[name=password]").type("test")
    
        cy.contains("button","Zaloguj").click()

        cy.visit("http://localhost:4200/book-add/edit/7169caeb-d2ca-4cab-abb8-eabbb2a2cd1a")
        
        cy.get("input[name=author]")
        .click({ force: true })

        cy.get("input[name=author]").clear({ force: true })
        .type("Reinhardt, Robert",{ force: true })

        cy.get("svg[class='mat-datepicker-toggle-default-icon ng-star-inserted']")
        .should('be.visible')
        .click({ force: true })

        cy.get("div[class='mat-calendar-body-cell-content mat-focus-indicator']")
        cy.contains("div","12")
        .should('be.visible')
        .click()

        cy.get("div[class^=mat-select-value]") .click({force: true})

        cy.get("span[class='mat-option-text']")
        cy.contains("span","Kategoria nr 1")
        .should('be.visible')
        .click({ force: true })

        cy.get("span[class='mat-button-wrapper']")
        cy.contains("span","Zapisz książkę")
        .should('be.visible')
        .click({ force: true })
    })
})