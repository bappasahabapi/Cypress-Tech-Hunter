export const getTableRows = (testId: string) => {
    return cy.get(`[data-testid="${testId}"] tbody tr`)
}

export const getElement = (testId: string) => {
    return cy.get(`[data-testid="${testId}"]`)
}

export const tableRowContainsText = (testId: string, searchText: string) => {
    getTableRows(testId)
        .each(($tr) => {
            cy.wrap($tr).contains('td', searchText, {matchCase: false}).should('be.visible')
        })
}

export const componentExists = (testId: string) => {
    getElement(testId).should('exist');
}

export const componentDoesNotExists = (testId: string) => {
    getElement(testId).should('not.exist');
}
