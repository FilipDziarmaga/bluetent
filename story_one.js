
/// <reference types="Cypress" />

describe("Story One", () => {
    let heartCount = 0

    it("Each property should have an easy Favorite on/off button indicating that this property has been saved", () => {
        cy.visit('www.rezfusionhubdemo.com/hub-test-vacation-rentals')
        for (let i = 0; i < 3; i++) {
            cy.scrollTo('bottom')
            cy.wait(1500)
        }
        cy.scrollTo('top')

        cy.get("[class*='ResultList__TeaserWrapper'] article button svg").each(($teaser, index, $list) => {

            expect($teaser.attr('class')).to.equal('bt-favorite-icon--off null')
        })
    })
    it("Indicator should show the total count of saved properties", () => {
        cy.get("body").then(
            ($body) => {

                let randomInterval = Math.floor(Math.random() * 5 + 1)
                cy.log("Interwał " + randomInterval)
                cy.get('.bt-favorite-icon--off.null ').each(($filter, index, $list) => {

                    if (($list.length - index) <= randomInterval) { return false }
                    cy.log("Index " + index)

                    if (index % randomInterval === 0) {
                        cy.wrap($filter).click()
                        heartCount++

                    }
                })

                cy.get('.bt-favorites-link__count').then(($element) => {
                    let heartCounter = parseInt($element.text().replace('(', '').replace(')', ''))
                    expect(heartCounter).to.deep.equal(heartCount)
                })

            });


    });

    it("When the indicator is clicked the hub should only display saved properties", () => {
        cy.get('.bt-favorites-link__count').click()
        cy.wait(2000)
        cy.get("body").then(
            ($body) => {
                let favouriteOffCounter = $body.find('.bt-favorite-icon--off.null ').length
                expect(favouriteOffCounter).to.deep.equal(0)
                let favouriteOnCounter = $body.find('.bt-favorite-icon--on.null ').length
                expect(favouriteOnCounter).to.deep.equal(heartCount)
            })


    });

    it("I can un-save a property from the filtered view", () => {
        cy.wait(2000)
        cy.get('.bt-favorite-icon--on.null ').each(($element, index, $list) => {
            if ((index) % 2 == 0) {
                cy.wrap($element).click()
                heartCount = heartCount - 1
            }
        })

        cy.wait(1000)
        cy.get("body").then(($body) => {
            let favouriteOnCounterafter = $body.find('.bt-favorite-icon--on.null ').length
            expect(favouriteOnCounterafter).to.deep.equal(heartCount)
        })
    });

    it("Indicator can be toggled on or off from property detail's view", () => {
        cy.get('.bt-favorites-link__count').click()
        cy.wait(1500)
        cy.get("body").then(
            ($body) => {
                let favouriteOffCounter = $body.find('.bt-favorite-icon--off.null ').length
                let favouriteOnCounter = $body.find('.bt-favorite-icon--on.null ').length
                let randomOffFavorite = Math.floor(Math.random() * (favouriteOffCounter - 1)) + 1
                let randomOnFavorite = Math.floor(Math.random() * (favouriteOnCounter - 1)) + 1
                cy.get('.bt-favorite-icon--off.null').each(($element, index, $list) => {
                    if (index === randomOffFavorite) {
                        cy.wrap($element).click()
                        expect($element.attr('class')).to.equal('bt-favorite-icon--off null')
                        cy.log("Przed zmianą heart count " + heartCount)
                        heartCount = heartCount + 1

                    }
                })
                cy.get('.bt-favorite-icon--on.null').each(($element, index, $list) => {
                    if (index === randomOnFavorite) {
                        cy.wrap($element).click()
                        expect($element.attr('class')).to.equal('bt-favorite-icon--on null')

                        heartCount = heartCount - 1

                    }
                })

            })


    });

    it("This change (saved/un-saved) should reflect correctly on the total saved count on the main hub", () => {
        cy.get('body').then(($body) => {

            let favouriteOffCounter = $body.find('.bt-favorite-icon--off.null ').length
            let favouriteOnCounter = $body.find('.bt-favorite-icon--on.null ').length
            let randomOffFavorite = Math.floor(Math.random() * (favouriteOffCounter - 1)) + 1
            let randomOnFavorite = Math.floor(Math.random() * (favouriteOnCounter - 1)) + 1
            cy.get('.bt-favorites-link__count').then(($element) => {

                cy.get('.bt-favorite-icon--off.null').each(($element2, index, $list) => {
                    if (index === randomOffFavorite) {
                        cy.wrap($element2).click()

                        heartCount = heartCount + 1

                        let heartCounter = parseInt($element.text().replace('(', '').replace(')', ''))
                        expect(heartCounter + 1).to.deep.equal(heartCount)

                    }
                })
                cy.get('.bt-favorite-icon--on.null').each(($element3, index, $list) => {
                    if (index === randomOnFavorite) {
                        cy.wrap($element3).click()
                        let heartCounter2 = parseInt($element.text().replace('(', '').replace(')', ''))

                        heartCount = heartCount - 1

                        expect(heartCounter2 - 1).to.deep.equal(heartCount)
                    }
                })


            })
        })

    });

});
