describe('student profile page', () => {
	it('displays everything', () => {
		// visiting
		cy.setCookie('user_id', '2')
		cy.setCookie('role', '2')
		cy.visit('http://localhost:3000/profile/student')
		// xhr (api) interception
		cy.intercept('/api/user/*').as('api')
		// i could not find the way to process requsets in a loop

		// /user/getUser
		cy.wait('@api').then(interception => {
			assert.equal(interception.response?.statusCode, 200)
		})

		// /user/getGroup
		cy.wait('@api').then(interception => {
			assert.equal(interception.response?.statusCode, 200)
		})

		// /user/getSubjects
		cy.wait('@api').then(interception => {
			assert.equal(interception.response?.statusCode, 200)
		})

		// /user/getNews
		cy.wait('@api').then(interception => {
			assert.equal(interception.response?.statusCode, 200)
		})

		// displaying
		cy.get('#student__name').should('not.contain.text', '...') // check for loading stub not being displayed. it means that data is displayed correctly
		cy.get('#student__group').should('not.contain.text', '...')
		cy.get('#student__subjects').should('not.contain.text', '...')
		cy.get('#student__news').should('not.contain.text', '...')
	})
})
