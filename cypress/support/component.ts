// ***********************************************************
// cypress/support/component.ts
// ***********************************************************

import './commands'
import { mount } from 'cypress/react'

// Extend Cypress types using ES module style
// This avoids using the `namespace` keyword directly

declare global {
  interface Cypress {
    mount: typeof mount
  }
}

// Add the mount command
Cypress.Commands.add('mount', mount)

// Example usage:
// cy.mount(<MyComponent />)
