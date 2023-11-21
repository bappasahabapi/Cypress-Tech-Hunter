export const gotoFactoringFinanceFundRequestPage = () => {
    cy.get('[data-testid="Fund Request"]').click()
    cy.get('[data-testid=module-modal]').find("[data-testid=factoring-finance]").click()
}