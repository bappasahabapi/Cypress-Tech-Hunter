import { DateInputType } from "../interfaces";

export const navigateToFactoringFinanceModule = (moduleName: string) => {
    cy.get(`[data-testid="${moduleName}"]`).click();
    cy.get('[data-testid=module-modal]').find("[data-testid=factoring-finance]").click();
};

 export const basicInfoTestFields = [
    { fieldName: 'supplierId', valueToInput: '005' },
    { fieldName: 'buyerName', valueToInput: 'Apple Inc', type: 'select' },
    { fieldName: 'paymentChannel', valueToInput: 'Cheque', type: 'select' },
];
 export const collectionInfoTestFields = [
    { fieldName: 'chequeNumber', valueToInput: '1'},
    { fieldName: 'bankName', valueToInput: 'AB-Bank'},
    { fieldName: 'totalCollectionAmount', valueToInput: '100'},
];


