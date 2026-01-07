describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/') // loads full page
  })

  it('shows loading state initially', () => {
    cy.get('.fade-in').contains('Loading Train Stations')
  })

  it('shows the stations list and map after load', () => {
    cy.get('.leaflet-container').should('exist')
    cy.get('ul.stations-list li').should('have.length.greaterThan', 0)
  })

  it('selects a station and shows bottom info card', () => {
    cy.get('ul.stations-list li').first().click()
    cy.get('div.absolute').should('contain.text', 'Berlin') // or first station name
  })
})
