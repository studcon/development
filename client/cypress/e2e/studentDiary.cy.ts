describe('student diary page', () => {
  it('displays everything', () => {
    cy.setCookie('user_id', '2')
    cy.setCookie('role', '2')
    cy.visit('http://localhost:3000/diary/student')
    cy.get('#diary__subjects').children() // subjects are loaded and displayed
    cy.get('#diary__subjects').children().first().click()
    cy.get('#diary__subject__wrapper').should('not.contain.text', 'Choose subject')

  })
})
