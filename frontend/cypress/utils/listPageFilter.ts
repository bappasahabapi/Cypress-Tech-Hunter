import {DateInputType} from "../utils/interfaces";

export const getSearchField = () => {
    return cy.get(`[data-testid=search]`)
}

export const getStatusField = () => {
    return cy.get(`[data-testid=status]`)
}

export const getDateTypeField = () => {
    return cy.get(`[data-testid=dateCategory]`)
}

export const setDateField = (testId: string, {day, year, month}: DateInputType) => {
    cy.get(`[data-testid=${testId}]`).click()
    cy.get(`[data-testid=${testId}]`).find('select').eq(1).select(year)
    cy.get(`[data-testid=${testId}]`).find('select').eq(0).select(month)
    cy.get('.react-datepicker__day:not(.react-datepicker__day--outside-month').contains(day).click()
}

export const setStartDateField = (date: DateInputType) => {
    setDateField('startDate', date)
}

export const setEndDateField = (date: DateInputType) => {
    setDateField('endDate', date)
}

export const setDisbursementDateField = (date: DateInputType) => {
    setDateField('disbursementDate', date)
}