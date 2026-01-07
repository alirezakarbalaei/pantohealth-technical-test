/// <reference types="cypress" />

describe('Map component', () => {
  beforeEach(() => {
    cy.visit('/') // your Next.js page with the map
  })

  it('renders the map', () => {
    cy.get('.leaflet-container').should('exist')
  })

  it('opens a popup when a marker is clicked', () => {
    cy.get('.leaflet-marker-icon').first().click()

    cy.get('.leaflet-popup-content-wrapper')
      .should('be.visible')
      .and('contain.text', 'Berlin') // replace with your station name
  })

  it('shows dark mode styling', () => {
    cy.get('button[data-theme-toggle]').click() // optional, if you have toggle

    cy.get('.leaflet-marker-icon').first().click()

    cy.get('.leaflet-popup-content-wrapper')
      .should('have.css', 'background-color')
      .and('eq', 'rgb(31, 41, 55)') // Tailwind bg-gray-800
  })

  it('tooltip appears on hover', () => {
    cy.get('.leaflet-marker-icon').first().trigger('mouseover')

    cy.get('.leaflet-tooltip')
      .should('be.visible')
      .and('contain.text', 'Berlin')
  })
})
