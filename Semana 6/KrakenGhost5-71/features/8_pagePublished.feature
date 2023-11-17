Feature: Crear page en el sitio web del usuario administrador publicada

@user1 @web
Scenario: Como usuario administrador creo una nueva page para publicarla en el sitio web (caso positivo)
  Given I navigate to page "<URL>"
  And I wait for 5 seconds
  And I login email "<USERNAME>" and password "<PASSWORD>"
  And I wait for 7 seconds
  When I click pages
  And I wait for 2 seconds
  And I click new page
  And I wait for 2 seconds
  And I enter page title "Mi primera página de pruebas automatizadas"
  And I wait for 2 seconds
  And I enter page description "Esta página contiene información valiosa sobre pruebas automatizadas"
  And I wait for 2 seconds
  And I click publish
  And I wait for 2 seconds
  And I click continue, final review
  And I wait for 2 seconds
  And I click publish post, right now
  And I wait for 2 seconds
  And I click editor
  And I wait for 2 seconds
  And I click back pages
  And I wait for 2 seconds
  And I click pages
  And I wait for 2 seconds
  Then I see page published