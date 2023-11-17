Feature: Crear post en el sitio web del usuario administrador programado

@user1 @web
Scenario: Como usuario administrador creo un nuevo post con publicación programada (caso positivo)
  Given I navigate to page "<URL>"
  And I wait for 5 seconds
  And I login email "<USERNAME>" and password "<PASSWORD>"
  And I wait for 7 seconds
  When I click pages
  And I wait for 2 seconds
  And I click new page
  And I wait for 2 seconds
  And I enter page title "Mi primera página de pruebas automatizadas programada"
  And I wait for 2 seconds
  And I enter page description "Esta página contiene información valiosa sobre pruebas automatizadas"
  And I wait for 2 seconds
  And I click publish
  And I wait for 2 seconds
  And I click schedule for later
  And I wait for 2 seconds
  And I enter utc hour "17:00"
  And I wait for 2 seconds
  And I click schedule
  And I wait for 2 seconds
  And I click back pages
  And I wait for 2 seconds
  And I click pages
  And I wait for 2 seconds
  Then I see page scheduled