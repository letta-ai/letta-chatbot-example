describe('e2e Letta Chatbot Example', { testIsolation: false }, () => {
  before(() => {
    cy.visit('http://localhost:3000')
    cy.wait(3000)
  })

  it.skip('should be able to create a new agent', () => {
    let numAgents = 0

    cy.get('[data-id=agents-list]').children().its('length').then((count) => {
      cy.log(`Number of agents: ${count}`)
      numAgents = count
    })

    cy.get('[data-id=create-agent-button]', { timeout: 10000 }).should('exist').and('be.visible').click()
      .then(() => {
        cy.wait(2000)
        let numAgentsAfterCreation = 0

        cy.get('[data-id=agents-list]').children().its('length').then((count) => {
          cy.log(`Number of agents after click: ${count}`)
          numAgentsAfterCreation = count
          expect(numAgentsAfterCreation).to.equal(numAgents + 1)
        })
      })
  })

  it('should be able to send message to the new agent and receive something back', () => {
    let assistantMessages = 0
    cy.get('[data-id*="_assistant"]').should('exist').and('be.visible').its('length')
      .then((count) => {
        assistantMessages = count;
      });
    cy.get('[data-id=message-input]').type('Hello, agent!{enter}')
    cy.get('[data-id*="_user"]').should('contain.text', 'Hello, agent!')

    cy.wait(10000) // wait for the response

    cy.get('[data-id*="_assistant"]').should('exist').and('be.visible').its('length').then((count) => {
      expect(count).to.be.greaterThan(assistantMessages)
    })
  })

  it('should toggle view reasoning messages', () => {
    let reasoningMessagesIsVisible = 0

    cy.get('[data-id*="_reasoning"]').should('exist').and('be.visible').its('length').then((count) => {
      reasoningMessagesIsVisible = count
      if (reasoningMessagesIsVisible > 0) {
        cy.get('[data-id=reasoning-message-switch]').click()
        cy.get('[data-id*="_reasoning"]').should('not.be.visible')
      } else {
        cy.log('No reasoning messages to hide')
      }
    })
  })

  it.only('should toggle view Show Memory', () => {
    cy.get('[data-id=agent-details-trigger]').should('exist').and('be.visible').click().then(() => {
      cy.get('[data-id=agent-details-display-content').should('be.visible')
      cy.get('[data-id=agent-details-trigger]').click()
      cy.get('[data-id=agent-details-display-content').should('not.be.visible')
    })
  })

  // edit agent
  // delete agent
  // show memory
})