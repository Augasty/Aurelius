describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/')
  })
})

describe('Login with Google', () => {
  it('should sign in with Google successfully', () => {
    cy.visit('http://localhost:5173/');

    cy.contains('Login with Google').click();
    // Wait for the sign-in process to complete
    cy.wait(5000); // Adjust the wait time as needed

    // Assert that the user is redirected to the home page
    cy.url().should('eq', 'http://localhost:5173/'); // Adjust the URL as needed
  });
});