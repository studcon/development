describe('successeful auth page spec', () => {
	it('checks successeful login', () => {
		cy.visit('http://localhost:3000/auth')
		cy.get('input[type="text"]').type('alex')
		cy.get('input[type="password"]').type('alex')
		cy.get('button').click()
		cy.url().should('eq', 'http://localhost:3000/profile/student')
	})
})

describe('failed auth page spec', () => {
	it('checks login failure', () => {
		cy.visit('http://localhost:3000/auth')
		cy.get('input[type="text"]').type('alexaoejowjroar')
		cy.get('input[type="password"]').type('alexrkaprkawr')
		cy.get('button').click()
		cy.get('div[role="alert"]').should('be.visible')
	})
})

