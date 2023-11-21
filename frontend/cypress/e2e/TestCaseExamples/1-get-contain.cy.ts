/* eslint-disable @typescript-eslint/no-empty-function */
/// <reference types="cypress" />

it('Google Search', () => {
    cy.visit('https://google.com')

    // cy
    // .get('#APjFqb')
    // .type('bappa saha bapi')
    // cy.contains('Google Search').click()

    cy
        .get('#APjFqb', { timeout: 2000 })
        .type('https://bappa-saha.web.app {Enter}')

    cy.contains('Bappa Saha').click()

});

describe('Visit and type bappa saha bapi', () => {
    it('Should visit google.com', () => {
        cy.visit('https://google.com')
    });
    it.only('Should type bappa saha bapi', () => {
        cy.visit('https://google.com')
        cy
            .get('#APjFqb')
            .type('bappa saha bapi {Enter}')
        // cy.contains('Google Search').click()
    });
    it('Should visit bappa saha bapi', () => {

        cy.visit('https://google.com')

        cy
            .get('#APjFqb', { timeout: 2000 })
            .type('https://bappa-saha.web.app {Enter}')

        cy.contains('Bappa Saha').click()
    });

})