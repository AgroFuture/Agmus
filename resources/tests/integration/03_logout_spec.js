import { login } from '../factory/auth'

describe('Logout specs', () => {
  it ('should have logout link', () => {
    login()
    cy.get('#signout').should('contain', 'Ch')
    cy.get('#signout').click()
    cy.location().should( location => {
      expect(location.hash).to.eq('#/auth/login')
    })
  })

  it ('Agar foydalanuvchi allaqachon tizimdan chiqqan bolsa, boshqaruv paneli sahifasiga kirmasligi kerak', () => {
    login()
    cy.get('#signout').should('contain', 'Chiqish')
    cy.get('#signout').click()

    cy.visit('/#/')
    cy.location().should( location => {
      expect(location.hash).to.eq('#/auth/login?redirect=%2F')
    })

    cy.visit('/#/intro/area')
    cy.location().should( location => {
      expect(location.hash).to.eq('#/auth/login?redirect=%2Fintro%2Farea')
    })
  })

  it ('brauzerda vuex kaliti bilan local xotira bolmasligi kerak', () => {
    login()
    cy.get('#signout').should('contain', 'Sign Out')
    cy.get('#signout').click()

    expect(localStorage.getItem('vuex')).to.eq(null)
  })
})
