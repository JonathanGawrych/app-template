describe('My First Test', () => {
	it('Visits the initial project page', () => {
		cy.visit('/');
		cy.contains('Welcome');
		cy.contains('frontend template app is running!');
	});
});
