// cypress/e2e/agenda.cy.js

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('Agenda de Contatos', () => {
  beforeEach(() => {
    cy.visit('https://ebac-agenda-contatos-tan.vercel.app/');
    cy.get('input[placeholder="Nome"]', { timeout: 10000 }).should('be.visible');
  });

  it('Deve incluir um contato', () => {
    cy.get('input[placeholder="Nome"]').type('Marcio Teste');
    cy.get('input[placeholder="E-mail"]').type('marcio@teste.com');
    cy.get('input[placeholder="Telefone"]').type('11999999999');
    cy.contains('button', /adicionar/i).click();

    cy.contains('Marcio Teste').should('exist');
  });

  it('Deve alterar um contato', () => {
    cy.contains('Marcio Teste')
      .closest('.contato')
      .contains('button', /editar/i)
      .click();

    cy.get('input[placeholder="Telefone"]').should('be.visible').clear().type('11888888888');
    cy.contains('button', /salvar/i).click();

    cy.contains('11888888888').should('exist');
  });

  it('Deve remover um contato', () => {
    cy.contains('Marcio Teste')
      .closest('.contato')
      .within(() => {
        cy.contains('button', /deletar/i).click({ force: true });
      });

    cy.contains('Marcio Teste').should('not.exist');
  });
});
