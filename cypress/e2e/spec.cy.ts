const TEST_AGENT_NAME = 'Test New Agent 12345';
let agentId: string = '';

function theTestAgentShouldExist() {
  return cy.get('[data-id=agents-list]')
    .children()
    .filter(`:contains("${TEST_AGENT_NAME}")`)
    .should('have.length.at.least', 1);
}

describe('e2e Letta Chatbot Example', { testIsolation: false }, () => {
  before(() => {
    cy.visit('http://localhost:3000')
    cy.wait(3000)
  })

  it('should delete the test agent if it exists', () => {
    cy.get('[data-id=agents-list]')
      .children()
      .each(($el, index, $list) => {
        const text = $el.text().trim();

        if (text.includes(TEST_AGENT_NAME)) {
          const targetAgentId = $el.attr('data-id');

          if (!targetAgentId) {
            cy.log('No data-id found on matched element.');
            return false;
          }

          cy.log(`Found Test New Agent with data-id: ${targetAgentId}`);

          cy.get(`[data-id=options-menu-${targetAgentId}]`)
            .should('exist')
            .click();

          cy.get(`[data-id=delete-agent-button-${targetAgentId}]`)
            .should('exist')
            .click();

          cy.get('[data-id=delete-agent-confirmation]')
            .should('exist');

          cy.get('[data-id=delete-agent-confirmation-button]')
            .should('exist')
            .click();

          return false; // stops the `.each()` loop after first match
        }
      });
  })

  it('should create a new agent and edit its name', () => {
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

    cy.location('pathname', { timeout: 10000 }).should('include', '/agent-');

    cy.location('pathname').then((pathname) => {
      cy.log(pathname)
      agentId = pathname.slice(1)
      cy.log(`options-menu-${agentId}`)
      cy.get(`[data-id=options-menu-${agentId}]`).should('exist').and('be.visible').click().then(()=> {
        cy.get(`[data-id=edit-agent-button-${agentId}]`).should('exist').and('be.visible').click().then(() => {
          cy.get('[data-id=agent-name-input]').should('exist').and('be.visible').clear().type(TEST_AGENT_NAME)
          cy.get('[data-id=agent-name-input-save]').should('exist').and('be.visible').click()
        })
      })
    })

    theTestAgentShouldExist()
    cy.wait(5000)
  })

  it('should send a message to the new agent and receive something back', () => {
    let assistantMessages = 0
    // cy.get('[data-id*="_assistant"]').should('exist').and('be.visible').its('length')
    //   .then((count) => {
    //     assistantMessages = count;
    //   });
    cy.get('[data-id=message-popover]').should('exist').and('be.visible')
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
        cy.wait(2000)
        cy.get('[data-id*="_reasoning"]').should('not.be.visible')
        cy.get('[data-id=reasoning-message-switch]').click()
        cy.wait(2000)
        cy.get('[data-id*="_reasoning"]').should('be.visible')

      } else {
        cy.log('No reasoning messages to hide')
      }
    })
  })

  it('should toggle view Show Memory', () => {
    cy.get('[data-id=agent-details-trigger]').should('exist').and('be.visible').click().then(() => {
      cy.get('[data-id=agent-details-display-content').should('be.visible')
      cy.get('[data-id=agent-details-trigger]').click()
      cy.get('[data-id=agent-details-display-content').should('not.be.visible')
    })
  })

  it('should delete the new test agent that was just created', () => {
    cy.location('pathname').then((pathname) => {
      cy.log(pathname)
      agentId = pathname.slice(1)
      cy.log(`options-menu-${agentId}`)
      cy.get(`[data-id=options-menu-${agentId}]`).should('exist').and('be.visible').click().then(()=> {
        cy.get(`[data-id=delete-agent-button-${agentId}]`).should('exist').and('be.visible').click().then(() => {
            cy.get('[data-id=delete-agent-confirmation]')
              .should('exist')
              .and('be.visible')
              .then(() => {
                cy.get('[data-id=delete-agent-confirmation-button]')
                  .should('exist')
                  .and('be.visible')
                  .click();
              });
          });
        })
      })
  })
})