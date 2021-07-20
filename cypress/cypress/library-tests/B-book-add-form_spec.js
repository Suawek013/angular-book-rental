describe('BOOK-ADD-FORM', () => { 
    it("opens the bookadd menu", () => {
        cy.visit("http://localhost:4200/")
    
        cy.get('[class^=login-text]').click({ force: true })
    
        cy.get("input[name=email]").type("test@eplan.pl")
        cy.get("input[name=password]").type("test")
    
        cy.contains("button","Zaloguj").click({ force: true })

        cy.visit("http://localhost:4200/book-add/book-form")
        cy.url().should('include', '/book-add/book-form')
    })

    it("writing the details of the book", () => {
        cy.get("input[name=isbn]").type("9780735619937", {force: true})

        cy.get("input[name=title]").type("Sprawne zarządzanie projektami metodą scrum", {force: true})

        cy.get("input[name=author]").type("Ken Schwaber", {force: true})

        cy.get("input[name=publisher]").type("Promise", {force: true})

        cy.get("textarea[name=description]").type("Reguł i praktyk stosowanych w metodyce Scrum – prostym procesie stosowanym do zarządzania skomplikowanymi projektami – jest mało, są one proste i łatwe do nauczenia się. Jednak sama prostota tej metody – brak przygotowanych rozwiązań – może okazać się rozbrajająca i spowodować, że ludzie rozpoczynający korzystanie z niej mają skłonność do powracania do starych nawyków i narzędzi zarządzania, uzyskując przez to gorsze rezultaty. W tej pouczającej serii studiów przypadków współtwórca metodyki Scrum Ken Schwaber przedstawia wykłady oparte na przykładach wziętych z życia, ich sukcesy i porażki, wybrane z jego wieloletniej praktyki jako instruktora w uczeniu firm sprawnego zarządzania projektami. Dzięki nim zrozumiemy, jak wykorzystać metodykę Scrum do rozwiązywania skomplikowanych problemów i uzyskiwać lepsze wyniki przy jednoczesnym szybszym dostarczaniu wartościowego oprogramowania.", {force: true})

        cy.scrollTo('0%','70%')


        cy.get("button[class='mat-focus-indicator mat-icon-button mat-button-base']")
        .should('be.visible')
        .click({ force: true })

        cy.get("div[class='mat-calendar-body-cell-content mat-focus-indicator']")
        cy.contains("div","6")
        .should('be.visible')
        .click({ force: true })

        cy.get("div[class^=mat-select-value]") .click({force: true})
        cy.contains("span", "Kategoria nr 2").click({force: true})


        cy.get("input[name=quantity]").type("1", {force: true})

        cy.get("input[name=image]").type("https://ecsmedia.pl/c/sprawne-zarzadzanie-projektami-metoda-scrum-w-iext51156126.jpg", {force: true})

        cy.contains("span", " Zapisz książkę ").click({force: true})
    })
})