import moment from 'moment';
import { login } from './auth'

export function open_task_page() {
  login()
  cy.get('#tasks').click()
  cy.location().should( location => {
    expect(location.hash).to.eq('#/tasks')
  })
}

export function open_task_form() {
  cy.get('#tasksform').click() 
  cy.get('form').should('be.visible') 
}

export function check_empty_form() {
  cy.get('button[type=submit]').click()

  cy.get('span.help-block.text-danger').should('contain', 'Muddat maydoni kiritilishi kerak.')
  cy.get('span.help-block.text-danger').should('contain', 'Ustuvorlik maydoni kiritilishi kerak.')
  cy.get('span.help-block.text-danger').should('contain', 'Kategoriya maydoni kiritilishi kerak.')
  cy.get('span.help-block.text-danger').should('contain', 'Sarlavha madoni kiritlishi kerak.')
}

export function filled_task(type) {
  // Label
  cy.get('label#label-due-date').should('contain', 'Muddati')
  cy.get('label#label-priority').should('contain', 'Bu vazifa shoshilinchmi?')
  cy.get('label#label-category').should('contain', 'Vazifa kategoriyasi')
  cy.get('label#label-title').should('contain', 'Sarlavha')
  cy.get('label#label-description').should('contain', 'Izoh')

  // Typing the form
  cy.get('input#due_date').click()
  cy.get('span.next').first().click()
  cy.get('span').contains(15).first().click()

  cy.get('label').contains('Yes').first().click()

  cy.get('select#category').select(type)
  cy.get('input#title').type(type + ' Task '+moment().valueOf())
  cy.get('textarea#description').type(type + 'Vazifa izohi'+moment().valueOf())
  if (type == 'AREA' || type == 'RESERVOIR') {
    cy.get('button').contains('OK').click()
  } else {
    cy.get('button[type=submit]').click()
    cy.get('form').should('not.be.visible')
  }
}
