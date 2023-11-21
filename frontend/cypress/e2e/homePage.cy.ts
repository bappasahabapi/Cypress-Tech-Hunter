import { getElement } from "../utils/list";


it('Click the products button',()=>{
    cy.visit('http://localhost:3000/')
    getElement('products').click();
});