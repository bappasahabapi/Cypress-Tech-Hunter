/// <reference types="cypress" />

describe('Logging in to the system', () => {
   //  beforeEach(() => {
   //      const email = "bappasaha@gmail.com"
   //      const password = "123456!"
   //      cy.login(email, password)
   //  })


    it('Navigate to Home Page', () => {
       cy.visit('http://localhost:3000/')
    })

})