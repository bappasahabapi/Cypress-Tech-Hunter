/* eslint-disable prefer-const */
import { getElement } from "../../utils/list";
import {navigateToFactoringFinanceModule, basicInfoTestFields, collectionInfoTestFields } from "../../utils/factoringFinance/collection";
import { addInvoice as addCollection } from "../../utils/factoringFinance/invoice";
import { setDateField } from "../../utils/listPageFilter";

let user_id = "151671";
let password = "q12w3eo0pQ!";

describe('Factoring Finance Collection Page', () => { 
    beforeEach(() => {
        cy.login(user_id, password)
    });

    it('Should go to the Collection page ', () => {
        navigateToFactoringFinanceModule("Collection");
    });

    it('Should Click the create invoice button', () => {
        navigateToFactoringFinanceModule("Collection");
        cy.wait(5000)
        getElement('create-collection-btn').click()
    });
    it.only('Should create collection', () => {
        navigateToFactoringFinanceModule("Collection");
        cy.wait(5000)
        getElement('create-collection-btn').click()
        cy.wait(5000)
        addCollection(basicInfoTestFields)
        setDateField('collectionDate', { day: '20', month: 'November', year: '2023' })
        addCollection(collectionInfoTestFields)
        setDateField('chequeDate', { day: '20', month: 'November', year: '2023' })
        setDateField('valueDate', { day: '20', month: 'November', year: '2023' })
        getElement('tab-next-btn').click()
        getElement('add-btn').click()
        getElement('checkbox').first().check()
        getElement('close-btn').click()
        getElement('preview-btn').click()
        getElement('authorizer').select('cad_checker')
        getElement("collection-submit-btn").click()

    });

});