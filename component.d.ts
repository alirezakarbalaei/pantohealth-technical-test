import { mount } from 'cypress/react'
import type { MountReturn } from '@cypress/react'

declare global {
  namespace Cypress {
    interface Chainable<Subject = MountReturn> {
      /**
       * Mount a React component in a test
       * @example cy.mount(<MyComponent />)
       */
      mount: typeof mount
    }
  }
}

export {}
