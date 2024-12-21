describe('student profile page', () => {
   it('displays everything', () => {
      cy.setCookie('user_id', '2')
      cy.setCookie('role', '2')
      cy.visit('http://localhost:3000/profile/student')
      cy.intercept('/api/user/*').as('api')

      // 1
      cy.wait('@api').then(interception => {
         assert.equal(interception.response?.statusCode, 200)
      })

      // 2
      cy.wait('@api').then(interception => {
         assert.equal(interception.response?.statusCode, 200)
      })

      // 3
      cy.wait('@api').then(interception => {
         assert.equal(interception.response?.statusCode, 200)
      })

      // 4
      cy.wait('@api').then(interception => {
         assert.equal(interception.response?.statusCode, 200)
      })
   })
})
