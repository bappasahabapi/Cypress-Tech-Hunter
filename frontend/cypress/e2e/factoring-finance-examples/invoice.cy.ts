import { componentDoesNotExists, componentExists, getElement, getTableRows, tableRowContainsText } from "../../utils/list";
import { addInvoice, gotoFactoringFinanceInvoicePage } from "../../utils/factoringFinance/invoice";
import {
    getDateTypeField,
    getSearchField,
    getStatusField,
    setDateField,
    setEndDateField,
    setStartDateField,
} from "../../utils/listPageFilter";
import { calenderMonths } from "../../utils/calenderDays";
import { navigateToFactoringFinanceModule } from "../../utils/factoringFinance/collection";

let user_id = "151671";
let password = "q12w3eo0pQ!";

describe('Factoring Finance Invoice Page', () => {
    beforeEach(() => {
        cy.login(user_id, password)
    });

    it('should go to the invoice page ', () => {
        navigateToFactoringFinanceModule('Invoice')
    });

    it('Should Click the create invoice button', () => {
        navigateToFactoringFinanceModule('Invoice')
        cy.wait(5000)
        getElement('create-invoice-btn').click()
    });


    describe('Should Upload Files',()=>{
        it('Should select and upload single file', () => {
            navigateToFactoringFinanceModule('Invoice')
            cy.wait(5000)
            getElement('create-invoice-btn').click()
            cy.wait(5000)
            getElement('files').selectFile('/home/bappa/Desktop/cy.png',{ force: true })
        });
        it('should select and upload multiple files', () => {
            navigateToFactoringFinanceModule('Invoice')
            cy.wait(5000)
            getElement('create-invoice-btn').click()
            cy.wait(5000)
            getElement('files').selectFile(['/home/bappa/Desktop/cy.png','/home/bappa/Desktop/cy.png'] ,{ force: true })
        });
    })

    it('Should Create invoice', () => {

        const testFields = [
            { fieldName: 'supplierId', valueToInput: '001' },
            { fieldName: 'buyerName', valueToInput: 'Honda Motorbikes Ltd', type: 'select' },
            { fieldName: 'poNumber', valueToInput: '2' },
            { fieldName: 'poAmount', valueToInput: '400' },
            { fieldName: 'currency', valueToInput: 'BDT', type: 'select' },
            { fieldName: 'invoiceNumber', valueToInput: '11' },
            { fieldName: 'invoiceAmount', valueToInput: '100' }
        ];
        navigateToFactoringFinanceModule('Invoice')
        cy.wait(5000)
        getElement('create-invoice-btn').click()
        cy.wait(5000)
        addInvoice(testFields)
        setDateField('poDate', { day: '15', month: 'November', year: '2023' })
        setDateField('invoiceDate', { day: '15', month: 'November', year: '2023' })
        getElement('preview-btn').click()
        cy.wait(5000)
        getElement('authorizer').select('cad_checker')
        cy.wait(5000)
        getElement('submit-invoice-btn').click()
        navigateToFactoringFinanceModule('Invoice')

    });

    it('Should show required error', () => {
        navigateToFactoringFinanceModule('Invoice')
        cy.wait(5000)
        getElement('create-invoice-btn').click()

        const requiredFields = [
            'supplierId',
            'supplierName',
            'buyerName',
            'currency',
            'invoiceNumber',
            'invoiceAmount',
        ]
        getElement('create-invoice-btn').click()
        for (let field of requiredFields) {
            getElement(`${field}-error-list`).contains('li', 'This field is required.')
        }
    });

    it('Select invoice supplier name.', () => {
        navigateToFactoringFinanceModule('Invoice')
        cy.wait(5000)
        getElement('create-invoice-btn').click()
        getElement('supplierId').type('001')
        getElement('supplierName').should('not.equal', '')

    });

    it('Select invoice buyer name.', () => {
        navigateToFactoringFinanceModule('Invoice')
        cy.wait(5000)
        getElement('create-invoice-btn').click()
        getElement('supplierId').type('001')
        getElement('buyerName').should('not.equal', '')
    });
});

describe('Factoring Finance Invoice List Page', () => {
    beforeEach(() => {
        cy.login(user_id, password)
    });
    it('should go to the invoice page ', () => {
        navigateToFactoringFinanceModule('Invoice')
    });
    it('Should load empty list with message.', () => {
        navigateToFactoringFinanceModule('Invoice')
        cy.intercept('api/v1/factoring-finance/invoice/find', { data: [] }).as('invoiceList')
        cy.wait('@invoiceList')
        componentExists('empty-list')
        componentDoesNotExists('invoice-list')
    });

    it('should load list with 2 data.', () => {
        navigateToFactoringFinanceModule('Invoice')
        cy.intercept('api/v1/factoring-finance/invoice/find', { data: [{}, {}] }).as('invoiceList');
        cy.wait('@invoiceList')
        componentExists('invoice-list')
        getTableRows('invoice-list').should('have.length', 2);
    });
    it('should load list with 10 data.', () => {
        navigateToFactoringFinanceModule('Invoice')
        cy.intercept('api/v1/factoring-finance/invoice/find', { data: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}] }).as('invoiceList');
        cy.wait('@invoiceList')
        componentExists('invoice-list')
        getTableRows('invoice-list').should('have.length', 10);
    });
});

describe('Invoice List Filter.', () => {
    beforeEach(() => {
        cy.login(user_id, password)
    })

    it('Should load invoice list with search result.', () => {

        navigateToFactoringFinanceModule('Invoice')
        const searchTexts = ['Rancon Motorbikes Ltd', 'Honda Motorbikes Ltd']
        componentExists('invoice-list')
        let searchInput = getSearchField();
        for (let searchText of searchTexts) {
            searchInput.clear().type(searchText)
            tableRowContainsText("invoice-list", searchText)
        }
    });

    //todo: Need to fix this
    // it.only('Should load invoice list with search result.', () => {

    //     navigateToFactoringFinanceModule('Invoice')
    //     const searchTexts = ['100', 'rancon', 'honda']
    //     componentExists('invoice-list')
    //     let searchInput = getSearchField();
    //     for (let searchText of searchTexts) {
    //         searchInput.clear().type(searchText)
    //         tableRowContainsText("invoice-list", searchText)
    //     }
    // });

    it('Should load empty list with search result.', () => {
        const searchTexts = ['007', 'sakib',]
        let searchInput = getSearchField();
        for (let searchText of searchTexts) {
            searchInput.clear().type(searchText)
            componentExists("empty-list")
        }
    });

    describe('Should Filtered Data Based on Status', () => {
        it('Should load list with "Pending" status.', () => {
            navigateToFactoringFinanceModule('Invoice')
            getStatusField().select('Pending')
            componentExists("invoice-list")
            getTableRows('invoice-list')
                .each(($tr) => {
                    cy.wrap($tr).get('td').eq(10).contains('Pending')
                })
        });
        it('Should load list with "Accepted" status.', () => {
            navigateToFactoringFinanceModule('Invoice')
            getStatusField().select('Accepted')
            componentExists("invoice-list")
            getTableRows('invoice-list')
                .each(($tr) => {
                    cy.wrap($tr).get('td').eq(10).contains('Accepted')
                })
        });
    })

    describe('Should Filtered Data Based On Date Category', () => {

        it('Should display the invoice list with filtered results based on "Invoice Date"', () => {
            navigateToFactoringFinanceModule('Invoice')
            let startDate = { day: '16', month: calenderMonths.November, year: '2023' }
            let endDate = { day: '16', month: calenderMonths.November, year: '2023' }
            let selectedStartDate = new Date(`${startDate.month} ${startDate.day}, ${startDate.year}`)
            let selectedEndDate = new Date(`${endDate.month} ${endDate.day}, ${endDate.year}`)
            getDateTypeField().select('Invoice Date')
            setStartDateField(startDate)
            setEndDateField(endDate)
            componentExists("invoice-list")
            getTableRows('invoice-list')
                .each(($tr) => {
                    cy.wrap($tr).get('td').eq(5).invoke(`text`).then(dateString => {
                        let dateArray = dateString.split('/')
                        let receivedDate = new Date(`${dateArray[1]}/${dateArray[0]}/${dateArray[2]}`);
                        let inRange = receivedDate <= selectedEndDate && receivedDate >= selectedStartDate;
                        expect(inRange).to.be.true;
                    })
                })
        });
        it('Should display the invoice list with filtered results based on "Receive Date"', () => {
            navigateToFactoringFinanceModule('Invoice')
            let startDate = { day: '15', month: calenderMonths.November, year: '2023' }
            let endDate = { day: '16', month: calenderMonths.November, year: '2023' }
            let selectedStartDate = new Date(`${startDate.month} ${startDate.day}, ${startDate.year}`)
            let selectedEndDate = new Date(`${endDate.month} ${endDate.day}, ${endDate.year}`)
            getDateTypeField().select('Receive Date')
            setStartDateField(startDate)
            setEndDateField(endDate)
            componentExists("invoice-list")
            getTableRows('invoice-list')
                .each(($tr) => {
                    cy.wrap($tr).get('td').eq(5).invoke(`text`).then(dateString => {
                        let dateArray = dateString.split('/')
                        let receivedDate = new Date(`${dateArray[1]}/${dateArray[0]}/${dateArray[2]}`);
                        let inRange = receivedDate <= selectedEndDate && receivedDate >= selectedStartDate;
                        expect(inRange).to.be.true;
                    })
                })
        });
        it('Should display the invoice list with filtered results based on "Maturity Date"', () => {
            navigateToFactoringFinanceModule('Invoice')
            let startDate = { day: '4', month: calenderMonths.February, year: '2024' }
            let endDate = { day: '5', month: calenderMonths.February, year: '2024' }
            let selectedStartDate = new Date(`${startDate.month} ${startDate.day}, ${startDate.year}`)
            let selectedEndDate = new Date(`${endDate.month} ${endDate.day}, ${endDate.year}`)
            getDateTypeField().select('Maturity Date')
            setStartDateField(startDate)
            setEndDateField(endDate)
            componentExists("invoice-list")
            getTableRows('invoice-list')
                .each(($tr) => {
                    cy.wrap($tr).get('td').eq(5).invoke(`text`).then(dateString => {
                        let dateArray = dateString.split('/')
                        let receivedDate = new Date(`${dateArray[1]}/${dateArray[0]}/${dateArray[2]}`);
                        let inRange = receivedDate <= selectedEndDate && receivedDate >= selectedStartDate;
                        expect(inRange).to.be.true;
                    })
                })
        });
        it('Should display the invoice list with filtered results based on "Disapproving Date"', () => {
            navigateToFactoringFinanceModule('Invoice')
            let startDate = { day: '14', month: calenderMonths.February, year: '2024' }
            let endDate = { day: '15', month: calenderMonths.February, year: '2024' }
            let selectedStartDate = new Date(`${startDate.month} ${startDate.day}, ${startDate.year}`)
            let selectedEndDate = new Date(`${endDate.month} ${endDate.day}, ${endDate.year}`)
            getDateTypeField().select('Disapproving Date')
            setStartDateField(startDate)
            setEndDateField(endDate)
            componentExists("invoice-list")
            getTableRows('invoice-list')
                .each(($tr) => {
                    cy.wrap($tr).get('td').eq(5).invoke(`text`).then(dateString => {
                        let dateArray = dateString.split('/')
                        let receivedDate = new Date(`${dateArray[1]}/${dateArray[0]}/${dateArray[2]}`);
                        let inRange = receivedDate <= selectedEndDate && receivedDate >= selectedStartDate;
                        expect(inRange).to.be.true;
                    })
                })
        });
    });

});

describe.only('Cad Authorizer Page', () => {


    beforeEach(() => {

        let user_id_cad = "222222";
        let password_cad = "q12w3eo0pQ!";
        cy.login(user_id_cad, password_cad)
    });

    it('Successfully logged in', () => {
    })

    it('Navigate to the invoice page of cad authorizer', () => {
        navigateToFactoringFinanceModule('Invoice')
    })

    describe('Click Checkbox Should Work', () => { 

        it('Click First checkbox', () => {
            navigateToFactoringFinanceModule('Invoice')
            cy.wait(5000)
            getElement('checkbox').first().check()
        });
        it('Click Multiple checkbox', () => {
            navigateToFactoringFinanceModule('Invoice')
            cy.wait(5000)
            // getElement('checkbox').click({multiple:false})
            getElement('checkbox').check()
        });
     });

    describe('Approve or Reject Invoice',()=>{
         it('Should the modal and approved the invoice',()=>{
            navigateToFactoringFinanceModule('Invoice')
            cy.wait(5000)
            getElement('checkbox').first().check()
            cy.wait(5000)
            getElement('approve').click()
         });
         it('Should open the modal and reject the invoice',()=>{
            navigateToFactoringFinanceModule('Invoice')
            cy.wait(5000)
            getElement('checkbox').first().check()
            getElement('invoice-reject-btn').click()
            getElement('remarks').type('invoice is rejected')
            cy.wait(5000)
            getElement('cancel').click()
         });
    });


 
})