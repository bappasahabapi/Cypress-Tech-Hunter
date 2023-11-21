import {getElement} from "../utils/list";

export const gotoNextTab = () => {
  getElement('tab-next-btn').click()
}

export const clickManualAddDataBtn = () => {
  getElement('manual-add-data-button').click()
}