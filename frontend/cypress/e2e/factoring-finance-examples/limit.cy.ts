import {addBuyerLimit, addSupplierLimit, updateBuyerLimit, addSupplierLimitToTestPreview, } from "../../utils/factoringFinance/limit";
import {
    componentDoesNotExists,
    componentExists,
    getElement,
    getTableRows,
    tableRowContainsText
} from "../../utils/list";
import {
    getDateTypeField,
    getSearchField,
    getStatusField,
    setEndDateField,
    setStartDateField,
    setDisbursementDateField
} from "../../utils/listPageFilter";
import {calenderMonths} from "../../utils/calenderDays";


let user_id = "151671"
let password = "q12w3eo0pQ!"

describe('Factoring Finance Limit Setup.', () => {
    beforeEach(() => {
        cy.login(user_id, password)
    })

    it('Should Create Limit.', () => {
        const testFields = [
            {fieldName: 'supplierId', valueToInput: '003'},
            {fieldName: 'totalCreditLimit', valueToInput: '1000'},
            {fieldName: 'branchId', valueToInput: '1003', type: 'select'},
            {fieldName: 'rmId', valueToInput: '4222', type: 'select'},
        ]
        const buyers = [
            {buyerId: '001', buyerCreditLimit: '100', creditPeriod: '70', financingRate: '10.01'},
            {buyerId: '002', buyerCreditLimit: '90', creditPeriod: '80', financingRate: '0'},
            {buyerId: '004', buyerCreditLimit: '80', creditPeriod: '90', financingRate: '1.3'},
        ]
        getElement('create-limit-button').click()
        addSupplierLimit(testFields)
        getElement('tab-next-btn').click()
        addBuyerLimit(buyers)
        getElement('preview-btn').click()
        getElement('authorizer').select('cad_checker')
        getElement('submit-limit-btn').click()
    })
    describe('Create limit supplier information page (Supplier limit setup)', () => {
        it('SCF Product Code should be a non-editable field with a specific value.', () => {
            getElement('create-limit-button').click()
            // Assert that the field is non-editable (readonly)
            getElement('scfProductCode').should('have.attr', 'readonly');
            // Assert that the field contains a specific value
            const expectedValue = '01111';
            getElement('scfProductCode').should('have.value', expectedValue);
        })
        it('Branch ID dropdown field should contain specific values.', () => {
            getElement('create-limit-button').click();
        
            // Expected values in the dropdown
            const expectedValues = ['', '1001', '1002', '1003', '1004'];
        
            // Check if the dropdown has each expected option
            expectedValues.forEach((expectedValue) => {
                getElement('branchId').select(expectedValue);
                getElement('branchId').should('have.value', expectedValue);
            });
        });
        

        it('should display corresponding branch name when you select a specific branch ID from the dropdown.', () => {
            getElement('create-limit-button').click()
            const branches = [
                { id: '1001', name: 'Banani' },
                { id: '1002', name: 'Ashulia' },
                { id: '1003', name: 'Banasree' },
                { id: '1004', name: 'Dhanmondi' },
            ];
        
            // Loop through each branch
            branches.forEach((branch) => {
                // Open the dropdown and select the branch ID
                getElement('branchId').select(branch.id);
        
                // Ensure that the branch name field displays the correct value
                getElement('branchName').should('have.value', branch.name);
            });
        })

        it('RM ID dropdown field should contain specific values.', () => {
            getElement('create-limit-button').click()
            // Expected values in the dropdown
            const expectedValues = ['', '2222', '3222', '4222', '5222', '6222'];
            expectedValues.forEach((expectedValue) => {
                getElement('rmId').select(expectedValue);
                getElement('rmId').should('have.value', expectedValue);
            });
        })

        it('should display corresponding RM name when you select a specific RM ID from the dropdown.', () => {
            getElement('create-limit-button').click()
    
            const rmData = [
                { id: '2222', name: 'Mithu' },
                { id: '3222', name: 'Mostafa' },
                { id: '4222', name: 'Bappa' },
                { id: '5222', name: 'Moinur' },
                { id: '6222', name: 'Faraz' },
            ];
        
           // Loop through each branch
           rmData.forEach((rm) => {
            // Open the dropdown and select the branch ID
            getElement('rmId').select(rm.id);
    
            // Ensure that the branch name field displays the correct value
            getElement('rmName').should('have.value', rm.name);
        });
    
        })

        it('for a specific supplier ID, corresponding supplier name, address, CD account, assignment account, loan account should display.', () => {
            getElement('create-limit-button').click()
            const suppliers = [
                { id: '001', name: 'Rancon Motorbikes Ltd', address: '123 Main Street', CDAccount: '87967833562', LoanAccount: '87967833563', AssignmentAccount: '87967833564' },
                //{ id: '002', name: 'Honda Motorbikes Ltd', address: '123 Main Street', CDAccount: '87967833565', LoanAccount: '87967833566', AssignmentAccount: '87967833567' },
                { id: '003', name: 'Suzuki Motorbikes Ltd', address: '456 Elm Avenue', CDAccount: '87967833568', LoanAccount: '87967833569', AssignmentAccount: '87967833570' },
                { id: '004', name: 'Yamaha Motorbikes Ltd', address: '789 Oak Road', CDAccount: '87967833571', LoanAccount: '87967833572', AssignmentAccount: '87967833573' },
                { id: '005', name: 'Google Inc', address: '987 Pine Lane', CDAccount: '87967833574', LoanAccount: '87967833575', AssignmentAccount: '87967833576' },
                { id: '006', name: 'Microsoft Corporation', address: '654 Maple Drive', CDAccount: '87967833577', LoanAccount: '87967833578', AssignmentAccount: '87967833579' },
                { id: '007', name: 'Apple Inc', address: '321 Walnut Street', CDAccount: '87967833580', LoanAccount: '87967833581', AssignmentAccount: '87967833582' },
                { id: '008', name: 'Samsung Electronics Co Ltd', address: '876 Cedar Avenue', CDAccount: '87967833583', LoanAccount: '87967833584', AssignmentAccount: '87967833585' },
                { id: '009', name: 'IBM Corporation', address: '543 Birch Road', CDAccount: '87967833586', LoanAccount: '87967833587', AssignmentAccount: '87967833588' },
                { id: '010', name: 'Tesla Inc', address: '210 Oak Street', CDAccount: '87967833589', LoanAccount: '87967833590', AssignmentAccount: '87967833591' },
                { id: '011', name: 'Amazon.com Inc', address: '123 Main Street', CDAccount: '87967833592', LoanAccount: '87967833593', AssignmentAccount: '87967833594' },
                { id: '012', name: 'Intel Corporation', address: '456 Elm Avenue', CDAccount: '87967833595', LoanAccount: '87967833596', AssignmentAccount: '87967833597' }
              ];
              
              // Loop through each supplier in the array
              suppliers.forEach((supplier) => {
                // Type the supplier ID in the input field
                getElement('supplierId').clear().type(supplier.id);
              
                // Ensure that the supplier name field displays the correct value
                getElement('supplierName').should('have.value', supplier.name);
              
                // Ensure that the supplier address field displays the correct value
                getElement('supplierAddress').should('have.value', supplier.address);
                getElement('cdAccount').should('have.value', supplier.CDAccount);
                getElement('loanAccount').should('have.value', supplier.LoanAccount);
                getElement('assignmentAccount').should('have.value', supplier.AssignmentAccount);
              });
    
        })

        it('for a specific supplier name, corresponding supplier ID, address, CD account, assignment account, loan account should display.', () => {
            getElement('create-limit-button').click()
            const suppliers = [
                { id: '001', name: 'Rancon Motorbikes Ltd', address: '123 Main Street', CDAccount: '87967833562', LoanAccount: '87967833563', AssignmentAccount: '87967833564' },
                //{ id: '002', name: 'Honda Motorbikes Ltd', address: '123 Main Street', CDAccount: '87967833565', LoanAccount: '87967833566', AssignmentAccount: '87967833567' },
                { id: '003', name: 'Suzuki Motorbikes Ltd', address: '456 Elm Avenue', CDAccount: '87967833568', LoanAccount: '87967833569', AssignmentAccount: '87967833570' },
                { id: '004', name: 'Yamaha Motorbikes Ltd', address: '789 Oak Road', CDAccount: '87967833571', LoanAccount: '87967833572', AssignmentAccount: '87967833573' },
                { id: '005', name: 'Google Inc', address: '987 Pine Lane', CDAccount: '87967833574', LoanAccount: '87967833575', AssignmentAccount: '87967833576' },
                { id: '006', name: 'Microsoft Corporation', address: '654 Maple Drive', CDAccount: '87967833577', LoanAccount: '87967833578', AssignmentAccount: '87967833579' },
                { id: '007', name: 'Apple Inc', address: '321 Walnut Street', CDAccount: '87967833580', LoanAccount: '87967833581', AssignmentAccount: '87967833582' },
                { id: '008', name: 'Samsung Electronics Co Ltd', address: '876 Cedar Avenue', CDAccount: '87967833583', LoanAccount: '87967833584', AssignmentAccount: '87967833585' },
                { id: '009', name: 'IBM Corporation', address: '543 Birch Road', CDAccount: '87967833586', LoanAccount: '87967833587', AssignmentAccount: '87967833588' },
                { id: '010', name: 'Tesla Inc', address: '210 Oak Street', CDAccount: '87967833589', LoanAccount: '87967833590', AssignmentAccount: '87967833591' },
                { id: '011', name: 'Amazon.com Inc', address: '123 Main Street', CDAccount: '87967833592', LoanAccount: '87967833593', AssignmentAccount: '87967833594' },
                { id: '012', name: 'Intel Corporation', address: '456 Elm Avenue', CDAccount: '87967833595', LoanAccount: '87967833596', AssignmentAccount: '87967833597' }
              ];
              
              // Loop through each supplier in the array
              suppliers.forEach((supplier) => {
                // Type the supplier ID in the input field
                getElement('supplierName').clear().type(supplier.name);
                // Use backticks (`) for template literals to correctly interpolate the variable
                cy.get(`.bg-secondary li:contains(${supplier.name})`).click();
                // Ensure that the supplier name field displays the correct value
                getElement('supplierId').should('have.value', supplier.id);
              
                // Ensure that the supplier address field displays the correct value
                getElement('supplierAddress').should('have.value', supplier.address);
                getElement('cdAccount').should('have.value', supplier.CDAccount);
                getElement('loanAccount').should('have.value', supplier.LoanAccount);
                getElement('assignmentAccount').should('have.value', supplier.AssignmentAccount);
              });
    
        })

        it('should display correct Expiry Date based on Disbursement Date', () => {
            getElement('create-limit-button').click()
            let disbursementDate = {day:'15', month:calenderMonths.November, year:'2021'}
            setDisbursementDateField(disbursementDate)
            // Calculate the expected Expiry Date based on Disbursement Date
            const expectedExpiryDate = new Date('2021-11-15');
            expectedExpiryDate.setFullYear(expectedExpiryDate.getFullYear() + 1);
    
            // Format the expected date as 'DD/MM/YYYY'
            const expectedExpiryDateString = expectedExpiryDate.toLocaleDateString('en-GB');
    
            // Get the actual Expiry Date from the UI
            cy.get('.expiryDate label').invoke('text').should('eq', expectedExpiryDateString);
        })
        it('show required errors.', () => {
            // todo: add all the required fields
            const requiredFields = [
                'supplierId',
                'supplierName',
                'branchId',
                'totalCreditLimit',
                'rmId',
                'assignmentAccount',
            ]
            getElement('create-limit-button').click()
            getElement('tab-next-btn').click()
            for (let requiredField of requiredFields) {
                getElement(`${requiredField}-error-list`).contains('li', 'This field is required.')
            }
        })

        it('Should show error msg when mandatory fields values are not entered and clicked on Buyer Information.', () => {
        
            getElement('create-limit-button').click()
            cy.contains('Buyer Information').click()
            // Check if error messages are displayed for mandatory fields
            getElement('supplierId-error-list').should('contain', 'This field is required.');
            getElement('assignmentAccount-error-list').should('contain', 'This field is required.');
        })
        it('should only allow numbers and one decimal point in the numeric input fields (Credit Limit, 5 Rate fields,)', () => {
            getElement('create-limit-button').click()
            //totalCreditLimit
            // Type a valid numeric value
            getElement('totalCreditLimit').type('123.45');
          
            // Ensure that the input value is as expected
            getElement('totalCreditLimit').should('have.value', '123.45');
          
            // Type an invalid input with more than one dot
            getElement('totalCreditLimit').clear().type('12.34.56');
          
            // Ensure that the input value is corrected to only one dot
            getElement('totalCreditLimit').should('have.value', '12.3456');
          
            // Type an invalid input with non-numeric characters
            getElement('totalCreditLimit').clear().type('abc');
          
            // Ensure that the input value is empty or contains the valid numeric portion
            getElement('totalCreditLimit').should('have.value', '');
          
            // Type an invalid input starting with a dot
            getElement('totalCreditLimit').clear().type('.123');
          
            // Ensure that the input value is corrected to remove the leading dot
            getElement('totalCreditLimit').should('have.value', '0.123');
    
            //Penalty Rate
            getElement('penaltyRate').clear().type('123.45');
            getElement('penaltyRate').should('have.value', '123.45');
            getElement('penaltyRate').clear().type('12.34.56');
            getElement('penaltyRate').should('have.value', '12.3456');
            getElement('penaltyRate').clear().type('abc');
            getElement('penaltyRate').should('have.value', '');
            getElement('penaltyRate').clear().type('.123');
            getElement('penaltyRate').should('have.value', '0.123');
    
            //Interest Rate 
            getElement('interestRate').clear().type('123.45');
            getElement('interestRate').should('have.value', '123.45');
            getElement('interestRate').clear().type('12.34.56');
            getElement('interestRate').should('have.value', '12.3456');
            getElement('interestRate').clear().type('abc');
            getElement('interestRate').should('have.value', '');
            getElement('interestRate').clear().type('.123');
            getElement('interestRate').should('have.value', '0.123');
    
            //Invoice Processing Rate
            getElement('invoiceProcessingRate').clear().type('123.45');
            getElement('invoiceProcessingRate').should('have.value', '123.45');
            getElement('invoiceProcessingRate').clear().type('12.34.56');
            getElement('invoiceProcessingRate').should('have.value', '12.3456');
            getElement('invoiceProcessingRate').clear().type('abc');
            getElement('invoiceProcessingRate').should('have.value', '');
            getElement('invoiceProcessingRate').clear().type('.123');
            getElement('invoiceProcessingRate').should('have.value', '0.123');
    
            //Safety Deposit Rate
            getElement('safetyDepositRate').clear().type('123.45');
            getElement('safetyDepositRate').should('have.value', '123.45');
            getElement('safetyDepositRate').clear().type('12.34.56');
            getElement('safetyDepositRate').should('have.value', '12.3456');
            getElement('safetyDepositRate').clear().type('abc');
            getElement('safetyDepositRate').should('have.value', '');
            getElement('safetyDepositRate').clear().type('.123');
            getElement('safetyDepositRate').should('have.value', '0.123');
    
            //Financing Rate
            getElement('supplierFinancingRate').clear().type('123.45');
            getElement('supplierFinancingRate').should('have.value', '123.45');
            getElement('supplierFinancingRate').clear().type('12.34.56');
            getElement('supplierFinancingRate').should('have.value', '12.3456');
            getElement('supplierFinancingRate').clear().type('abc');
            getElement('supplierFinancingRate').should('have.value', '');
            getElement('supplierFinancingRate').clear().type('.123');
            getElement('supplierFinancingRate').should('have.value', '0.123');
            
          })

      });
    
      describe('Create limit buyer information page (Buyer limit setup)', () => {
        //buyer info page
      it('For a specific buyer ID, corresponding buyer name should display.', () => {
        const testFields = [
            {fieldName: 'supplierId', valueToInput: '001'},
            {fieldName: 'totalCreditLimit', valueToInput: '1000'},
            {fieldName: 'branchId', valueToInput: '1003', type: 'select'},
            {fieldName: 'rmId', valueToInput: '4222', type: 'select'},
        ]
        getElement('create-limit-button').click()
        addSupplierLimit(testFields)
        getElement('tab-next-btn').click()
        getElement('add-buyers').click()
        const buyers = [
            
            { id: '002', name: 'Honda Motorbikes Ltd' },
            { id: '003', name: 'Suzuki Motorbikes Ltd' },
            { id: '004', name: 'Yamaha Motorbikes Ltd' },
            { id: '005', name: 'Google Inc' },
            { id: '006', name: 'Microsoft Corporation' },
            { id: '007', name: 'Apple Inc' },
            { id: '008', name: 'Samsung Electronics Co Ltd' },
            { id: '009', name: 'IBM Corporation' },
            { id: '010', name: 'Tesla Inc' },
            { id: '011', name: 'Amazon.com Inc' },
            { id: '012', name: 'Intel Corporation' }
          ];
          
          // Loop through each supplier in the array
          buyers.forEach((buyer) => {
            // Open the dropdown and select the branch ID
        getElement('buyerId').select(buyer.id);
          
            // Ensure that the supplier name field displays the correct value
            getElement('buyerName').should('have.value', buyer.name);
          
          });

           
    })

    it('For a specific buyer name, corresponding buyer ID should display.', () => {
        const testFields = [
            {fieldName: 'supplierId', valueToInput: '001'},
            {fieldName: 'totalCreditLimit', valueToInput: '1000'},
            {fieldName: 'branchId', valueToInput: '1003', type: 'select'},
            {fieldName: 'rmId', valueToInput: '4222', type: 'select'},
        ]
        getElement('create-limit-button').click()
        addSupplierLimit(testFields)
        getElement('tab-next-btn').click()
        getElement('add-buyers').click()
        const buyers = [
            
            { id: '002', name: 'Honda Motorbikes Ltd' },
            { id: '003', name: 'Suzuki Motorbikes Ltd' },
            { id: '004', name: 'Yamaha Motorbikes Ltd' },
            { id: '005', name: 'Google Inc' },
            { id: '006', name: 'Microsoft Corporation' },
            { id: '007', name: 'Apple Inc' },
            { id: '008', name: 'Samsung Electronics Co Ltd' },
            { id: '009', name: 'IBM Corporation' },
            { id: '010', name: 'Tesla Inc' },
            { id: '011', name: 'Amazon.com Inc' },
            { id: '012', name: 'Intel Corporation' }
          ];
          // Loop through each supplier in the array
          buyers.forEach((buyer) => {
            // Type the supplier ID in the input field
            getElement('buyerName').clear().type(buyer.name);
            // Use backticks (`) for template literals to correctly interpolate the variable
            cy.get(`.bg-secondary li:contains(${buyer.name})`).click();
            // Ensure that the supplier name field displays the correct value
            getElement('buyerId').should('have.value', buyer.id);
        
          });
       
           
    })

    it('User should be able to add buyer when buyer limit is less than or equal to supplier limit.', () => {
        const testFields = [
            {fieldName: 'supplierId', valueToInput: '001'},
            {fieldName: 'totalCreditLimit', valueToInput: '1000'},
            {fieldName: 'branchId', valueToInput: '1003', type: 'select'},
            {fieldName: 'rmId', valueToInput: '4222', type: 'select'},
        ]
        getElement('create-limit-button').click()
        addSupplierLimit(testFields)
        getElement('tab-next-btn').click()
        getElement('add-buyers').click()
        getElement('buyerId').select('002');
        getElement('buyerCreditLimit').type('100');
        // Verify that the "add" button is disabled
        getElement('add-buyer').should('not.be.disabled');
           
    })
    
    it('Error msg should display when buyer limit is greater than supplier limit.', () => {
        const testFields = [
            {fieldName: 'supplierId', valueToInput: '002'},
            {fieldName: 'totalCreditLimit', valueToInput: '1000'},
            {fieldName: 'branchId', valueToInput: '1003', type: 'select'},
            {fieldName: 'rmId', valueToInput: '4222', type: 'select'},
        ]
        getElement('create-limit-button').click()
        addSupplierLimit(testFields)
        getElement('tab-next-btn').click()
        getElement('add-buyers').click()
        getElement('buyerId').select('001');
        getElement('buyerCreditLimit').type('10000');
        // Check if the error message is displayed
        getElement(`buyerCreditLimit-error-list`).contains('li', 'Enter less or equal to 1,000').should('exist')
           
    })
    describe('Buyer limit list page', () => {
        it('After adding buyers, correct info should be displayed in buyer list', () => {
            const testFields = [
                {fieldName: 'supplierId', valueToInput: '001'},
                {fieldName: 'totalCreditLimit', valueToInput: '1000'},
                {fieldName: 'branchId', valueToInput: '1003', type: 'select'},
                {fieldName: 'rmId', valueToInput: '4222', type: 'select'},
            ]
            const buyers = [
                {buyerId: '002', buyerCreditLimit: '100', creditPeriod: '70', financingRate: '10.01'},
                {buyerId: '003', buyerCreditLimit: '90', creditPeriod: '80', financingRate: '0'},
                {buyerId: '004', buyerCreditLimit: '80', creditPeriod: '90', financingRate: '1.3'},
            ]
            getElement('create-limit-button').click()
            addSupplierLimit(testFields)
            getElement('tab-next-btn').click()
            addBuyerLimit(buyers)
            // Assertions for the buyer list table
        buyers.forEach((buyer) => {
            cy.get('.table tbody') // Adjust the selector based on your actual HTML structure
                .contains('td', buyer.buyerId)
                .parent('tr')
                .within(() => {
                    cy.get('.tableData:nth-child(3)').should('contain', buyer.buyerCreditLimit);
                    cy.get('.tableData:nth-child(5)').should('contain', buyer.creditPeriod);
                    cy.get('.tableData:nth-child(6)').should('contain', buyer.financingRate);
                    // Add more assertions as needed for other columns
                });
        });    
            })

            it('After adding buyer, click edit for a buyer, correct info should be displayed in input fields', () => {
                const testFields = [
                    {fieldName: 'supplierId', valueToInput: '001'},
                    {fieldName: 'totalCreditLimit', valueToInput: '1000'},
                    {fieldName: 'branchId', valueToInput: '1003', type: 'select'},
                    {fieldName: 'rmId', valueToInput: '4222', type: 'select'},
                ]
                const buyers = [
                    {buyerId: '002', buyerCreditLimit: '100', creditPeriod: '70', financingRate: '10.01'},
                    
                ]
                getElement('create-limit-button').click()
                addSupplierLimit(testFields)
                getElement('tab-next-btn').click()
                addBuyerLimit(buyers)
                getElement('edit-buyer-limit-btn').click();
               // getElement('buyerId').should('have.value', '002');
                getElement('buyerName').should('have.value', 'Honda Motorbikes Ltd');
                getElement('buyerCreditLimit').should('have.value', '100');
                getElement('creditPeriod').should('have.value', '70');
                getElement('buyerFinancingRate').should('have.value', '10.01');
                })

                it('After adding buyer, click edit for a buyer, update field values, correct info should be displayed in buyer list', () => {
                    const testFields = [
                        {fieldName: 'supplierId', valueToInput: '001'},
                        {fieldName: 'totalCreditLimit', valueToInput: '1000'},
                        {fieldName: 'branchId', valueToInput: '1003', type: 'select'},
                        {fieldName: 'rmId', valueToInput: '4222', type: 'select'},
                    ]
                    const buyers = [
                        {buyerId: '002', buyerCreditLimit: '100', creditPeriod: '70', financingRate: '10.01'},
                        
                    ]
                    const buyersUpdate = [
                        {buyerId: '003', buyerCreditLimit: '101', creditPeriod: '20', financingRate: '9.01'},
                        
                    ]
                    getElement('create-limit-button').click()
                    addSupplierLimit(testFields)
                    getElement('tab-next-btn').click()
                    addBuyerLimit(buyers)
                    getElement('edit-buyer-limit-btn').click();
                    updateBuyerLimit(buyersUpdate)
                    cy.get('.tableData').eq(1).should('contain.text', 'Suzuki Motorbikes Ltd');
                    cy.get('.tableData').eq(2).should('contain.text', '101');
                    cy.get('.tableData').eq(4).should('contain.text', '20');
                    cy.get('.tableData').eq(5).should('contain.text', '9.01');
                    })

                    it('After adding buyer, click edit for a buyer, enter limit which is more than supplier limit, user should not be able to add this buyer. This test should fail', () => {
                        const testFields = [
                            {fieldName: 'supplierId', valueToInput: '002'},
                            {fieldName: 'totalCreditLimit', valueToInput: '1000'},
                            {fieldName: 'branchId', valueToInput: '1003', type: 'select'},
                            {fieldName: 'rmId', valueToInput: '4222', type: 'select'},
                        ]
                        const buyers = [
                            {buyerId: '001', buyerCreditLimit: '100', creditPeriod: '70', financingRate: '10.01'},
                            
                        ]
                        const buyersUpdate = [
                            {buyerId: '003', buyerCreditLimit: '1001', creditPeriod: '20', financingRate: '9.01'},
                            
                        ]
                        getElement('create-limit-button').click()
                        addSupplierLimit(testFields)
                        getElement('tab-next-btn').click()
                        addBuyerLimit(buyers)
                        getElement('edit-buyer-limit-btn').click();
                        updateBuyerLimit(buyersUpdate)
                        
                        })
      });
      

        
      });
      

    it('show required errors.', () => {
        // todo: add all the required fields
        const requiredFields = [
            'supplierId',
            'supplierName',
            'branchId',
            'totalCreditLimit',
            'rmId',
            'assignmentAccount',
        ]
        getElement('create-limit-button').click()
        getElement('tab-next-btn').click()
        for (let requiredField of requiredFields) {
            getElement(`${requiredField}-error-list`).contains('li', 'This field is required.')
        }
    })

    it('show errors on selecting already added supplier.', () => {
        getElement('create-limit-button').click()
        getElement('supplierId').type('003')
        cy.contains('"Pending" or "Accepted" supplier is not allowed to be updated.').should('exist')
    })

    it('selecting supplier fills name and address.', () => {
        getElement('create-limit-button').click()
        getElement('supplierId').type('001')
        getElement('supplierName').should('not.equal','')
        getElement('supplierAddress').should('not.equal','')
    })
    describe('Preview page', () => {
        it('Correct info should display in preview page', () => {
            const testFields = [
                {fieldName: 'supplierId', valueToInput: '004'},
                {fieldName: 'totalCreditLimit', valueToInput: '400'},
                {fieldName: 'branchId', valueToInput: '1004', type: 'select'},
                {fieldName: 'rmId', valueToInput: '4222', type: 'select'},
                {fieldName: 'penaltyRate', valueToInput: '1.00', type: 'rate'},
                {fieldName: 'interestRate', valueToInput: '2.00', type: 'rate'},
                {fieldName: 'invoiceProcessingRate', valueToInput: '0.30', type: 'rate'},
                {fieldName: 'safetyDepositRate', valueToInput: '4.00', type: 'rate'},
                {fieldName: 'supplierFinancingRate', valueToInput: '50.00', type: 'rate'},
            ]
            const buyers = [
                {buyerId: '001', buyerCreditLimit: '100', creditPeriod: '60', financingRate: '60.01'},
                {buyerId: '002', buyerCreditLimit: '200', creditPeriod: '30', financingRate: '60.02'},
                {buyerId: '003', buyerCreditLimit: '300', creditPeriod: '10', financingRate: '70.03'},
            ]
            getElement('create-limit-button').click()
            addSupplierLimitToTestPreview(testFields)
            getElement('tab-next-btn').click()
            addBuyerLimit(buyers)
            getElement('preview-btn').click()
            cy.wait(5000)
            const assertionsList = [
                { dataTestId: 'scfProductCode-value', expectedValue: '01111' },
                { dataTestId: 'supplierId-value', expectedValue: '004' },
                { dataTestId: 'supplierName-value', expectedValue: 'Yamaha Motorbikes Ltd' },
                { dataTestId: 'supplierAddress-value', expectedValue: '789 Oak Road' },
                { dataTestId: 'cdAccount-value', expectedValue: '87967833571' },
                { dataTestId: 'branchId-value', expectedValue: '1004' },
                { dataTestId: 'branchName-value', expectedValue: 'Dhanmondi' },
                { dataTestId: 'rmId-value', expectedValue: '4222' },
                { dataTestId: 'rmName-value', expectedValue: 'Bappa' },
                { dataTestId: 'loanAccount-value', expectedValue: '87967833572' },
                { dataTestId: 'assignmentAccount-value', expectedValue: '87967833573' },
                { dataTestId: 'totalCreditLimit-value', expectedValue: '400' },
                { dataTestId: 'interestRate-value', expectedValue: '2' },
                { dataTestId: 'penaltyRate-value', expectedValue: '1' },
                { dataTestId: 'invoiceProcessingRate-value', expectedValue: '0.3' },
                { dataTestId: 'safetyDepositRate-value', expectedValue: '4' },
                { dataTestId: 'supplierFinancingRate-value', expectedValue: '50' },
              ];
              
              // Loop through the assertions list
              for (const assertion of assertionsList) {
                cy.get(`[data-testid="${assertion.dataTestId}"]`).should('be.visible').should('have.value', assertion.expectedValue);
              }
           
            // Iterate over each buyer in the buyers array
    for (const buyer of buyers) {
    // Use the buyerId to locate the row with the specific buyer
    cy.get('table tbody tr').contains('td', buyer.buyerId).parent('tr').within(() => {
      // Assert that other columns contain the expected values
      cy.get('.tableData').eq(2).should('have.text', buyer.buyerCreditLimit);
      cy.get('.tableData').eq(4).should('have.text', buyer.creditPeriod);
      cy.get('.tableData').eq(5).should('have.text', buyer.financingRate);
      // Add more assertions as needed for other columns
    });
  }
        })
        it('In preview page, click edit for supplier information, correct info should be displayed for both suplier and buyer.', () => {
            const testFields = [
                {fieldName: 'supplierId', valueToInput: '004'},
                {fieldName: 'totalCreditLimit', valueToInput: '400'},
                {fieldName: 'branchId', valueToInput: '1004', type: 'select'},
                {fieldName: 'rmId', valueToInput: '4222', type: 'select'},
                {fieldName: 'penaltyRate', valueToInput: '1.00', type: 'rate'},
                {fieldName: 'interestRate', valueToInput: '2.00', type: 'rate'},
                {fieldName: 'invoiceProcessingRate', valueToInput: '0.30', type: 'rate'},
                {fieldName: 'safetyDepositRate', valueToInput: '4.00', type: 'rate'},
                {fieldName: 'supplierFinancingRate', valueToInput: '50.00', type: 'rate'},
            ]
            const buyers = [
                {buyerId: '001', buyerCreditLimit: '100', creditPeriod: '60', financingRate: '60.01'},
                {buyerId: '002', buyerCreditLimit: '200', creditPeriod: '30', financingRate: '60.02'},
                {buyerId: '003', buyerCreditLimit: '300', creditPeriod: '10', financingRate: '70.03'},
            ]
            getElement('create-limit-button').click()
            addSupplierLimitToTestPreview(testFields)
            getElement('tab-next-btn').click()
            addBuyerLimit(buyers)
            getElement('preview-btn').click()
            // Locate the button with the text "Edit"
            cy.contains('button', 'Edit').click();
    
            //id: '004', name: 'Yamaha Motorbikes Ltd', address: '789 Oak Road', CDAccount: '87967833571', LoanAccount: '87967833572', AssignmentAccount: '87967833573' },
            const assertionsList = [
                { dataTestId: 'supplierId', expectedValue: '004' },
                { dataTestId: 'supplierName', expectedValue: 'Yamaha Motorbikes Ltd' },
                { dataTestId: 'supplierAddress', expectedValue: '789 Oak Road' },
                { dataTestId: 'scfProductCode', expectedValue: '01111' },
                { dataTestId: 'branchId', expectedValue: '1004' },
                { dataTestId: 'branchName', expectedValue: 'Dhanmondi' },
                { dataTestId: 'totalCreditLimit', expectedValue: '400' },
                { dataTestId: 'cdAccount', expectedValue: '87967833571' },
                { dataTestId: 'rmId', expectedValue: '4222' },
                { dataTestId: 'rmName', expectedValue: 'Bappa' },
                { dataTestId: 'penaltyRate', expectedValue: '1' },
                { dataTestId: 'interestRate', expectedValue: '2' },
                { dataTestId: 'invoiceProcessingRate', expectedValue: '0.3' },
                { dataTestId: 'safetyDepositRate', expectedValue: '4' },
                { dataTestId: 'supplierFinancingRate', expectedValue: '50' },
                { dataTestId: 'assignmentAccount', expectedValue: '87967833573' },
                { dataTestId: 'loanAccount', expectedValue: '87967833572' },
              ];
              
              // Loop through the assertions list
              for (const assertion of assertionsList) {
                cy.get(`[data-testid="${assertion.dataTestId}"]`).should('be.visible').should('have.value', assertion.expectedValue);
              }
    
              //check buyer info
              getElement('tab-next-btn').click()
              for (const buyer of buyers) {
                // Use the buyerId to locate the row with the specific buyer
                cy.get('table tbody tr').contains('td', buyer.buyerId).parent('tr').within(() => {
                  // Assert that other columns contain the expected values
                  cy.get('.tableData').eq(2).should('have.text', buyer.buyerCreditLimit);
                  cy.get('.tableData').eq(4).should('have.text', buyer.creditPeriod);
                  cy.get('.tableData').eq(5).should('have.text', buyer.financingRate);
                  
                });
              }
        });
        it('In preview page, click edit for a buyer, enter limit which is more than supplier limit, user should not be able to add this buyer. This test should fail as buyer limit cannot exceed supplier limit', () => {
            const testFields = [
                {fieldName: 'supplierId', valueToInput: '002'},
                {fieldName: 'totalCreditLimit', valueToInput: '1000'},
                {fieldName: 'branchId', valueToInput: '1003', type: 'select'},
                {fieldName: 'rmId', valueToInput: '4222', type: 'select'},
            ]
            const buyers = [
                {buyerId: '001', buyerCreditLimit: '100', creditPeriod: '70', financingRate: '10.01'},
                
            ]
            const buyersUpdate = [
                {buyerId: '003', buyerCreditLimit: '1001', creditPeriod: '20', financingRate: '9.01'},
                
            ]
            getElement('create-limit-button').click()
            addSupplierLimit(testFields)
            getElement('tab-next-btn').click()
            addBuyerLimit(buyers)
            getElement('preview-btn').click();
            cy.get('svg.text-primary').click();
            updateBuyerLimit(buyersUpdate)
            
            })
      });
     

    // it.only('In preview page, click edit for supplier information, update suplier and buyer, correct info should display in preview page.', () => {
    //     const testFields = [
    //         {fieldName: 'supplierId', valueToInput: '004'},
    //         {fieldName: 'totalCreditLimit', valueToInput: '400'},
    //         {fieldName: 'branchId', valueToInput: '1004', type: 'select'},
    //         {fieldName: 'rmId', valueToInput: '4222', type: 'select'},
    //         {fieldName: 'penaltyRate', valueToInput: '1.00', type: 'rate'},
    //         {fieldName: 'interestRate', valueToInput: '2.00', type: 'rate'},
    //         {fieldName: 'invoiceProcessingRate', valueToInput: '0.30', type: 'rate'},
    //         {fieldName: 'safetyDepositRate', valueToInput: '4.00', type: 'rate'},
    //         {fieldName: 'supplierFinancingRate', valueToInput: '50.00', type: 'rate'},
    //     ]
    //     const buyers = [
    //         {buyerId: '001', buyerCreditLimit: '100', creditPeriod: '60', financingRate: '60.01'},
    //         {buyerId: '002', buyerCreditLimit: '200', creditPeriod: '30', financingRate: '60.02'},
    //         {buyerId: '003', buyerCreditLimit: '300', creditPeriod: '10', financingRate: '70.03'},
    //     ]
    //     getElement('create-limit-button').click()
    //     addSupplierLimitToTestPreview(testFields)
    //     getElement('tab-next-btn').click()
    //     addBuyerLimit(buyers)
    //     getElement('preview-btn').click()
    //     // Locate the button with the text "Edit"
    //     cy.contains('button', 'Edit').click();
    //     const testFieldsEdit = [
    //         //{fieldName: 'supplierId', valueToInput: '004'},
    //         {fieldName: 'totalCreditLimit', valueToInput: '500', type: 'rate'},
    //         {fieldName: 'branchId', valueToInput: '1003', type: 'select'},
    //         {fieldName: 'rmId', valueToInput: '5222', type: 'select'},
    //         {fieldName: 'penaltyRate', valueToInput: '2.00', type: 'rate'},
    //         {fieldName: 'interestRate', valueToInput: '3.00', type: 'rate'},
    //         {fieldName: 'invoiceProcessingRate', valueToInput: '0.40', type: 'rate'},
    //         {fieldName: 'safetyDepositRate', valueToInput: '5.00', type: 'rate'},
    //         {fieldName: 'supplierFinancingRate', valueToInput: '60.00', type: 'rate'},
    //     ]
    //     const buyersEdit = [
    //         {buyerId: '005', buyerCreditLimit: '300', creditPeriod: '61', financingRate: '60.04'},
    //     ]
    //     addSupplierLimitToTestPreviewEdit(testFieldsEdit)
    //     // getElement('tab-next-btn').click()
    //     // addBuyerLimit(buyersEdit)
    //     // getElement('preview-btn').click()
    //     // //id: '004', name: 'Yamaha Motorbikes Ltd', address: '789 Oak Road', CDAccount: '87967833571', LoanAccount: '87967833572', AssignmentAccount: '87967833573' },
    //     // const assertionsList = [
    //     //     { dataTestId: 'supplierId', expectedValue: '004' },
    //     //     { dataTestId: 'supplierName', expectedValue: 'Yamaha Motorbikes Ltd' },
    //     //     { dataTestId: 'supplierAddress', expectedValue: '789 Oak Road' },
    //     //     { dataTestId: 'scfProductCode', expectedValue: '01111' },
    //     //     { dataTestId: 'branchId', expectedValue: '1003' },
    //     //     { dataTestId: 'branchName', expectedValue: 'Banasree' },
    //     //     { dataTestId: 'totalCreditLimit', expectedValue: '500' },
    //     //     { dataTestId: 'cdAccount', expectedValue: '87967833571' },
    //     //     { dataTestId: 'rmId', expectedValue: '5222' },
    //     //     { dataTestId: 'rmName', expectedValue: 'Moinur' },
    //     //     { dataTestId: 'penaltyRate', expectedValue: '2' },
    //     //     { dataTestId: 'interestRate', expectedValue: '3' },
    //     //     { dataTestId: 'invoiceProcessingRate', expectedValue: '0.4' },
    //     //     { dataTestId: 'safetyDepositRate', expectedValue: '5' },
    //     //     { dataTestId: 'supplierFinancingRate', expectedValue: '60' },
    //     //     { dataTestId: 'assignmentAccount', expectedValue: '87967833573' },
    //     //     { dataTestId: 'loanAccount', expectedValue: '87967833572' },
    //     //   ];
          
    //     //   // Loop through the assertions list
    //     //   for (const assertion of assertionsList) {
    //     //     cy.get(`[data-testid="${assertion.dataTestId}"]`).should('be.visible').should('have.value', assertion.expectedValue);
    //     //   }

    //     //   //check buyer info
    //     //   getElement('tab-next-btn').click()
    //     //   for (const buyer of buyers) {
    //     //     // Use the buyerId to locate the row with the specific buyer
    //     //     cy.get('table tbody tr').contains('td', buyer.buyerId).parent('tr').within(() => {
    //     //       // Assert that other columns contain the expected values
    //     //       cy.get('.tableData').eq(2).should('have.text', buyer.buyerCreditLimit);
    //     //       cy.get('.tableData').eq(4).should('have.text', buyer.creditPeriod);
    //     //       cy.get('.tableData').eq(5).should('have.text', buyer.financingRate);
    //     //       // Add more assertions as needed for other columns
    //     //     });
    //     //   }
    // });

})
describe('Factoring Finance Limit List Page', () => {
    beforeEach(() => {
        cy.login(user_id, password)
    })
    it('should show correct data when we click limit view icon in limit list page', () => {
        const testFields = [
            {fieldName: 'supplierId', valueToInput: '004'},
            {fieldName: 'totalCreditLimit', valueToInput: '400'},
            {fieldName: 'branchId', valueToInput: '1004', type: 'select'},
            {fieldName: 'rmId', valueToInput: '4222', type: 'select'},
            {fieldName: 'penaltyRate', valueToInput: '1.00', type: 'rate'},
            {fieldName: 'interestRate', valueToInput: '2.00', type: 'rate'},
            {fieldName: 'invoiceProcessingRate', valueToInput: '0.30', type: 'rate'},
            {fieldName: 'safetyDepositRate', valueToInput: '4.00', type: 'rate'},
            {fieldName: 'supplierFinancingRate', valueToInput: '50.00', type: 'rate'},
        ]
        const buyers = [
            {buyerId: '001', buyerCreditLimit: '100', creditPeriod: '60', financingRate: '60.01'},
            {buyerId: '002', buyerCreditLimit: '200', creditPeriod: '30', financingRate: '60.02'},
            {buyerId: '003', buyerCreditLimit: '300', creditPeriod: '10', financingRate: '70.03'},
        ]

        getElement('create-limit-button').click()
        addSupplierLimitToTestPreview(testFields)
        getElement('tab-next-btn').click()
        addBuyerLimit(buyers)
        getElement('preview-btn').click()
        getElement('authorizer').select('cad_checker')
        getElement('submit-limit-btn').click()
        getElement('limit-view-icon').click()
        const assertionsList = [
            { dataTestId: 'supplierId', expectedValue: '004' },
            { dataTestId: 'supplierName', expectedValue: 'Yamaha Motorbikes Ltd' },
            { dataTestId: 'supplierAddress', expectedValue: '789 Oak Road' },
            { dataTestId: 'scfProductCode', expectedValue: '01111' },
            { dataTestId: 'branchId', expectedValue: '1004' },
            { dataTestId: 'branchName', expectedValue: 'Dhanmondi' },
            { dataTestId: 'totalCreditLimit', expectedValue: '400' },
            { dataTestId: 'cdAccount', expectedValue: '87967833571' },
            { dataTestId: 'rmId', expectedValue: '4222' },
            { dataTestId: 'rmName', expectedValue: 'Bappa' },
            { dataTestId: 'penaltyRate', expectedValue: '1' },
            { dataTestId: 'interestRate', expectedValue: '2' },
            { dataTestId: 'invoiceProcessingRate', expectedValue: '0.3' },
            { dataTestId: 'safetyDepositRate', expectedValue: '4' },
            { dataTestId: 'supplierFinancingRate', expectedValue: '50' },
            { dataTestId: 'assignmentAccount', expectedValue: '87967833573' },
            { dataTestId: 'loanAccount', expectedValue: '87967833572' },
          ];
          
          // Loop through the assertions list
          for (const assertion of assertionsList) {
            cy.get(`[data-testid="${assertion.dataTestId}"]`).should('be.visible').should('have.value', assertion.expectedValue);
          }

          //check buyer info
          getElement('tab-next-btn').click()
          for (const buyer of buyers) {
            // Use the buyerId to locate the row with the specific buyer
            cy.get('table tbody tr').contains('td', buyer.buyerId).parent('tr').within(() => {
              // Assert that other columns contain the expected values
              cy.get('.tableData').eq(2).should('have.text', buyer.buyerCreditLimit);
              cy.get('.tableData').eq(4).should('have.text', buyer.creditPeriod);
              cy.get('.tableData').eq(5).should('have.text', buyer.financingRate);
              
            });
          }

    });
    it('should load empty list with message.', () => {
        // Intercept the API call and modify the response
        cy.intercept('api/v1/factoring-finance/limit/find', {data: []}).as('limitList');
        // Wait for the API call to complete
        cy.wait('@limitList')
        componentExists('empty-list')
        componentDoesNotExists("limit-list")
    });

    it('should load list with data.', () => {
        componentExists('limit-list')
        componentDoesNotExists("empty-list")
    });

    it('should load list with 2 data.', () => {
        // Intercept the API call and modify the response
        cy.intercept('api/v1/factoring-finance/limit/find', {data: [{}, {}]}).as('limitList');
        // Wait for the API call to complete
        cy.wait('@limitList')
        componentExists('limit-list')
        getTableRows('limit-list').should('have.length', 2);
    });

    it('should load list with 10 data.', () => {
        // Intercept the API call and modify the response
        cy.intercept('api/v1/factoring-finance/limit/find', {data: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]}).as('limitList');
        // Wait for the API call to complete
        cy.wait('@limitList')
        componentExists('limit-list')
        getTableRows('limit-list').should('have.length', 10);
    });
})

describe('Limit list filter.', () => {
    beforeEach(() => {
        cy.login(user_id, password)
    })

    it('should load list with search result.', () => {
        const searchTexts = ['001', '004', 'rancon', '003', '1000', 'ppa', 'sta']
        componentExists('limit-list')
        let searchInput = getSearchField();
        for (let searchText of searchTexts) {
            searchInput.clear().type(searchText)
            tableRowContainsText("limit-list", searchText)
        }
    });

    it('should load empty list with search result.', () => {
        const searchTexts = ['002', 'xan', '012', '5000', 'lppa']
        let searchInput = getSearchField();
        for (let searchText of searchTexts) {
            searchInput.clear().type(searchText)
            componentExists("empty-list")
        }
    });

    it('should load list with "Pending" status.', () => {
        getStatusField().select('Pending')
        componentExists("limit-list")
        getTableRows('limit-list')
            .each(($tr) => {
                cy.wrap($tr).get('td').eq(7).contains('Pending')
            })
    });

    it('should load list with "Accepted" status.', () => {
        getStatusField().select('Accepted')
        componentExists("limit-list")
        getTableRows('limit-list')
            .each(($tr) => {
                cy.wrap($tr).get('td').eq(7).contains('Accepted')
            })
    });

    it('should load list with "Date" Filtered.', () => {
        let startDate = {day: '8', month: calenderMonths.November, year: '2023'}
        let endDate = {day: '10', month: calenderMonths.November, year: '2023'}
        let selectedStartDate = new Date(`${startDate.month} ${startDate.day}, ${startDate.year}`)
        let selectedEndDate = new Date(`${endDate.month} ${endDate.day}, ${endDate.year}`)
        getDateTypeField().select('Disbursement Date')
        setStartDateField(startDate)
        setEndDateField(endDate)
        componentExists("limit-list")
        getTableRows('limit-list')
            .each(($tr) => {
                cy.wrap($tr).get('td').eq(5).invoke(`text`).then(dateString => {
                    let dateArray = dateString.split('/')
                    let receivedDate = new Date(`${dateArray[1]}/${dateArray[0]}/${dateArray[2]}`);
                    let inRange = receivedDate <= selectedEndDate && receivedDate >= selectedStartDate;
                    expect(inRange).to.be.true;
                })
            })
    });

})

describe('Cad authorizer page', () => {
    
    it('should show correct data when we click limit view icon in cad_authorizer page, after clicking approve status should be accepted, ', () => {
        // cy.login(user_id, password)
        // const testFields = [
        //     {fieldName: 'supplierId', valueToInput: '001'},
        //     {fieldName: 'totalCreditLimit', valueToInput: '400'},
        //     {fieldName: 'branchId', valueToInput: '1004', type: 'select'},
        //     {fieldName: 'rmId', valueToInput: '4222', type: 'select'},
        //     {fieldName: 'penaltyRate', valueToInput: '1.00', type: 'rate'},
        //     {fieldName: 'interestRate', valueToInput: '2.00', type: 'rate'},
        //     {fieldName: 'invoiceProcessingRate', valueToInput: '0.30', type: 'rate'},
        //     {fieldName: 'safetyDepositRate', valueToInput: '4.00', type: 'rate'},
        //     {fieldName: 'supplierFinancingRate', valueToInput: '50.00', type: 'rate'},
        // ]
        // const buyers = [
        //     {buyerId: '002', buyerCreditLimit: '100', creditPeriod: '60', financingRate: '60.01'},
        //     {buyerId: '003', buyerCreditLimit: '200', creditPeriod: '30', financingRate: '60.02'},
        //     {buyerId: '004', buyerCreditLimit: '300', creditPeriod: '10', financingRate: '70.03'},
        // ]

        // getElement('create-limit-button').click()
        // addSupplierLimitToTestPreview(testFields)
        // getElement('tab-next-btn').click()
        // addBuyerLimit(buyers)
        // getElement('preview-btn').click()
        // getElement('authorizer').select('cad_checker')
        // getElement('submit-limit-btn').click()

        // //login as cad authorizer
        // let user_id_cad = "222222";
        // let password_cad = "q12w3eo0pQ!";
        // cy.login(user_id_cad, password_cad)

        // cy.wait(5000)
        // getElement('limit-list') // Get the table
        //   .contains('td', '001') // Locate the cell containing the Supplier ID "001"
        //   .parent() // Go up to the row
        //   .should('be.visible')
        //   .find('[data-testid="limit-view-icon"]') // Find the view icon within that row
        //   .click(); // Click on the view icon

        //check buyer info
        // getElement('tab-next-btn').click()
        // for (const buyer of buyers) {
        //   // Use the buyerId to locate the row with the specific buyer
        //   cy.get('table tbody tr').contains('td', buyer.buyerId).parent('tr').within(() => {
        //     // Assert that other columns contain the expected values
        //     cy.get('.tableData').eq(2).should('have.text', buyer.buyerCreditLimit);
        //     cy.get('.tableData').eq(4).should('have.text', buyer.creditPeriod);
        //     cy.get('.tableData').eq(5).should('have.text', buyer.financingRate);
            
        //   });
        // }
        // const assertionsList = [
        //     { dataTestId: 'supplierId', expectedValue: '004' },
        //     { dataTestId: 'supplierName', expectedValue: 'Yamaha Motorbikes Ltd' },
        //     { dataTestId: 'supplierAddress', expectedValue: '789 Oak Road' },
        //     { dataTestId: 'scfProductCode', expectedValue: '01111' },
        //     { dataTestId: 'branchId', expectedValue: '1004' },
        //     { dataTestId: 'branchName', expectedValue: 'Dhanmondi' },
        //     { dataTestId: 'totalCreditLimit', expectedValue: '400' },
        //     { dataTestId: 'cdAccount', expectedValue: '87967833571' },
        //     { dataTestId: 'rmId', expectedValue: '4222' },
        //     { dataTestId: 'rmName', expectedValue: 'Bappa' },
        //     { dataTestId: 'penaltyRate', expectedValue: '1' },
        //     { dataTestId: 'interestRate', expectedValue: '2' },
        //     { dataTestId: 'invoiceProcessingRate', expectedValue: '0.3' },
        //     { dataTestId: 'safetyDepositRate', expectedValue: '4' },
        //     { dataTestId: 'supplierFinancingRate', expectedValue: '50' },
        //     { dataTestId: 'assignmentAccount', expectedValue: '87967833573' },
        //     { dataTestId: 'loanAccount', expectedValue: '87967833572' },
        //   ];
          
        //   // Loop through the assertions list
        //   for (const assertion of assertionsList) {
        //     cy.get(`[data-testid="${assertion.dataTestId}"]`).should('be.visible').should('have.value', assertion.expectedValue);
        //   }

        
        //   cy.contains('Approve').click();
        //   cy.contains('tr', '004').within(() => {
        //     cy.get('.tdStatus').should('have.text', 'Accepted');
        //   });
    });

  
    
  });
  