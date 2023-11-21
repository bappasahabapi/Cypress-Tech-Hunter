/* eslint-disable prefer-const */
export const gotoFactoringFinanceInvoicePage = () => {
    cy.get('[data-testid="Invoice"]').click()
    cy.get('[data-testid=module-modal]').find("[data-testid=factoring-finance]").click()
};


export const addInvoice = (testFields: {
    type?: string,
    fieldName: string,
    valueToInput: string
}[]
) => {
    for (let testField of testFields) {
        if (testField.type == 'select')
            cy.get(`[data-testid=${testField.fieldName}]`).select(testField.valueToInput)
        else
            cy.get(`[data-testid=${testField.fieldName}]`).type(testField.valueToInput)
    }
}


