describe('Form Input', () => {
    it('can reach site', () => {
        cy.visit('http://localhost:3000')
    })

    it('can type into name field', () => {
        cy.get('input[name="name"]')
        .type('Typing into the name field')
        .should('have.value', 'Typing into the name field')
    })

    it('can type into email field', () => {
        cy.get('input[name="email"]')
        .type('test@test.com')
        .should('have.value', 'test@test.com')
    })

    it('can type into passworld field', () => {
        cy.get('input[name="password"]')
        .type('password')
        .should('have.value', 'password')
    })

    it('can check tos box', () => {
        cy.get('input[name="consent"]')
        .check()
        .should('have.prop', 'checked', true)
    })

    // it('can uncheck tos box', () => {
    //     cy.get('input[name="consent"]')
    //     .uncheck()
    //     .should('have.prop', 'checked', false)
    // })

    it('can click on submit to add user', () => {
        cy.get('button.submit').click()
    })
})

describe('Form Validation', () => {
    it('validates name correctly', () => {
        cy.visit('http://localhost:3000')
        cy.contains('Name must be at least three characters long.').should('not.exist')
        cy.get('input[name="name"]').type('a')
        cy.contains('Name must be at least three characters long.')
        cy.get('input[name="name"]').type('b')
        cy.contains('Name must be at least three characters long.')
        cy.get('input[name="name"]').type('c')
        cy.contains('Name must be at least three characters long.').should('not.exist')
    })

    it('validates email correctly', () => {
        cy.contains('Email must be a valid email address.').should('not.exist')
        cy.get('input[name="email"]').type('test@test')
        cy.contains('Email must be a valid email address.')
        cy.get('input[name="email"]').type('.com')
        cy.contains('Email must be a valid email address.').should('not.exist')
    })

    it('validates password correctly', () => {
        cy.contains('Password must be at least 4 characters long.').should('not.exist')
        cy.get('input[name="password"]').type('123')
        cy.contains('Password must be at least 4 characters long.')
        cy.get('input[name="password"]').type('4')
        cy.contains('Password must be at least 4 characters long.').should('not.exist')
    })
})