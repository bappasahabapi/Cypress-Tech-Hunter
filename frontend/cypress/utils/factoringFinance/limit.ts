/* eslint-disable prefer-const */
export const addSupplierLimitToTestPreview = (testFields: {
    type?: string,
    fieldName: string,
    valueToInput: string
}[]) => {
    for (let testField of testFields) {
        if (testField.type == 'select')
            cy.get(`[data-testid=${testField.fieldName}]`).select(testField.valueToInput)
        else if (testField.type == 'rate')
            cy.get(`[data-testid=${testField.fieldName}]`).clear().type(testField.valueToInput)
        else
            cy.get(`[data-testid=${testField.fieldName}]`).type(testField.valueToInput)
    }
}

export const addSupplierLimit = (testFields: {
    type?: string,
    fieldName: string,
    valueToInput: string
}[]) => {
    for (let testField of testFields) {
        if (testField.type == 'select')
            cy.get(`[data-testid=${testField.fieldName}]`).select(testField.valueToInput)
        else
            cy.get(`[data-testid=${testField.fieldName}]`).type(testField.valueToInput)
    }
}
export const buyerLimitInput = (buyer: {
    buyerId: string,
    buyerCreditLimit: string,
    creditPeriod: string,
    financingRate: string
}) => {
    cy.get('[data-testid=buyerId]').select(buyer.buyerId)
    cy.get('[data-testid=buyerCreditLimit]').type(buyer.buyerCreditLimit)
    cy.get('[data-testid=creditPeriod]').clear().type(buyer.creditPeriod)
    cy.get('[data-testid=buyerFinancingRate]').clear().type(buyer.financingRate)
}
export const addBuyerLimit = (buyers: {
    buyerId: string,
    buyerCreditLimit: string,
    creditPeriod: string,
    financingRate: string
}[]) => {
    for (let buyer of buyers) {
        cy.get('[data-testid=add-buyers]').click()
        buyerLimitInput(buyer)
        cy.get('[data-testid=add-buyer]').click()
    }
}

export const updateBuyerLimit = (buyers: {
    buyerId: string,
    buyerCreditLimit: string,
    creditPeriod: string,
    financingRate: string
}[]) => {
    for (let buyer of buyers) {
        //cy.get('[data-testid=add-buyers]').click()
        cy.get('[data-testid=buyerId]').select(buyer.buyerId)
        cy.get('[data-testid=buyerCreditLimit]').clear().type(buyer.buyerCreditLimit)
        cy.get('[data-testid=creditPeriod]').clear().type(buyer.creditPeriod)
        cy.get('[data-testid=buyerFinancingRate]').clear().type(buyer.financingRate)
        cy.get('[data-testid=update-buyer]').click()
    }
}