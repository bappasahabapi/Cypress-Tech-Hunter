import {getElement} from "../../utils/list";
import {clickManualAddDataBtn, gotoNextTab} from "../../utils/commonActions";
import { navigateToFactoringFinanceModule } from "../../utils/factoringFinance/collection";

let user_id = "151671";
let password = "q12w3eo0pQ!";

describe('Fund request create page.', () => {
    beforeEach(() => {
        cy.login(user_id, password)
    })

    it.only('should check fund request amount input validity.', () => {
        navigateToFactoringFinanceModule("Fund Request");
        getElement('create-fund-request-btn').click()
        getElement('supplierId').type('004')
        let requestAmountInput = getElement('requestAmount')
        let requestAmount, availableRequestAmount
        getElement('availableAmountForDisbursement-value').invoke('text').then(amount => {
            availableRequestAmount = Number(amount)
            requestAmount = availableRequestAmount + 1
            requestAmountInput.type(requestAmount.toString())
            getElement('requestAmount-error-list').contains('Exceeded Available Fund for Disbursement').should('be.visible')
        })
        requestAmountInput.clear()
        getElement('requestAmount-error-list').contains('This field is required.').should('be.visible')
    });

    it('should create new fund request.', () => {
        navigateToFactoringFinanceModule("Fund Request");
        getElement('create-fund-request-btn').click()
        getElement('supplierId').type('004')
        getElement('requestAmount').type('80')
        gotoNextTab()
        clickManualAddDataBtn()
        getElement('fund-requisition-modal').find('[data-testid=fund-requisition-table] [data-testid=table-row]').each($tr => {
            cy.wrap($tr).find('div').click()
        })
    });
})