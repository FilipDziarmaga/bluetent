
/// <reference types="Cypress" />
describe("Story Two", () => {
    let bedrooms = 0
    let bathrooms = 0

    it("The filter selection should allow the user to increase the number of either bedrooms and/or bathrooms", () => {
        cy.visit('/')

        cy.wait(1000)

        cy.get('.bt-hide-small').click({ multiple: true, force: true })

        let randomInterval = Math.floor(Math.random() * 6 + 1)

        cy.get("[aria-label*='Minimum Bedrooms, increase']").then(($element) => {
            for (let i = 0; i < randomInterval; i++) {
                cy.wrap($element).click({ force: true })
                bedrooms = bedrooms + 1,
                    cy.wait(2000),

                    cy.get("[id*='bt-range-value--Minimum Bedrooms']").should('have.text', String(bedrooms))
            }

        })

        cy.get("[aria-label*='Minimum Bathrooms, increase']").then(($element2) => {
            for (let i = 0; i < randomInterval; i++) {
                cy.wrap($element2).click({ force: true })
                bathrooms = bathrooms + 1,
                cy.wait(2000),
                    cy.get("[id*='bt-range-value--Minimum Bathrooms']").should('have.text', String(bathrooms))

            }

        })

        cy.get("[aria-label*='Minimum Bedrooms, decrease']").then(($element) => {
            for (let i = 0; i < randomInterval; i++) {
                cy.wrap($element).click({ force: true })
                bedrooms = bedrooms - 1,
                cy.wait(2000),
                    cy.get("[id*='bt-range-value--Minimum Bedrooms']").should('have.text', String(bedrooms))
            }

        })

        cy.get("[aria-label*='Minimum Bathrooms, decrease']").then(($element2) => {
            for (let i = 0; i < randomInterval; i++) {
                cy.wrap($element2).click({ force: true })
                bathrooms = bathrooms - 1,
                cy.wait(2000),
                    cy.get("[id*='bt-range-value--Minimum Bathrooms']").should('have.text', String(bathrooms))

            }
        })




    })

    it("The Clear filters button should reset both filters to their lower value", () => {

        let randomInterval = Math.floor(Math.random() * 6 + 1)
        cy.get("[aria-label*='Minimum Bedrooms, increase']").then(($element) => {
            for (let i = 0; i < randomInterval; i++) {
                cy.wrap($element).click({ force: true })
                bedrooms = bedrooms + 1,
                cy.wait(2000),
                    cy.get("[id*='bt-range-value--Minimum Bedrooms']").should('have.text', String(bedrooms))
            }

        })

        cy.get("[aria-label*='Minimum Bathrooms, increase']").then(($element2) => {
            for (let i = 0; i < randomInterval; i++) {
                cy.wrap($element2).click({ force: true })
                bathrooms = bathrooms + 1,
                cy.wait(2000),
                    cy.get("[id*='bt-range-value--Minimum Bathrooms']").should('have.text', String(bathrooms))

            }

        })
        cy.get('button').contains('Clear Filters').click({ force: true })
        cy.get("[id*='bt-range-value--Minimum Bedrooms']").should('have.text', '0')
        cy.get("[id*='bt-range-value--Minimum Bathrooms']").should('have.text', '0')

    })


    it("The view Results button should close the Filter Results page and display properties on the hub meeting the criteria", () => {
        bedrooms = 0
        bathrooms = 0

        let randomInterval = Math.floor(Math.random() * 5 + 1)
        cy.log("Random interval " + randomInterval)
        
        cy.get("[aria-label*='Minimum Bedrooms, increase']").then(($element) => {

            for (let i = 0; i < randomInterval; i++) {
                cy.wrap($element).click({ force: true })

                cy.wait(2000)
            }

        })



        cy.get("[aria-label*='Minimum Bathrooms, increase']").then(($element2) => {
            for (let i = 0; i < randomInterval-1; i++) {
                cy.wrap($element2).click({ force: true })
                cy.wait(2000)
            }

        })

        cy.get('button').contains('View results').click({ force: true })
        cy.wait(1000)
        cy.get('.closeButton__StyledIconCross-sc-1vgu4fs-1').click({ force: true })
        for (let i = 0; i < 3; i++) {
            cy.scrollTo('bottom')
            cy.wait(2000)
        }
        cy.scrollTo('top')

        cy.wait(1000)

        cy.get('.bt-teaser__info').each(($element, index, $list) => {

            let minBedrooms = $element.text().substring($element.text().indexOf("Beds: ") + 6, $element.text().indexOf("Beds: ") + 8)

            let minBathrooms = $element.text().substring($element.text().indexOf("Baths: ") + 7, $element.text().indexOf("Baths: ") + 9)

            assert.isAtLeast(Math.ceil(parseFloat(minBedrooms)), Math.ceil(parseFloat(randomInterval)))

            assert.isAtLeast(Math.ceil(parseFloat(minBathrooms)), Math.ceil(parseFloat(randomInterval - 1)))

        })
    })

})