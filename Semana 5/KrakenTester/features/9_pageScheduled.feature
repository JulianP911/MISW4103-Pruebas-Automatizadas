Feature: Crear post en el sitio web del usuario administrador programado

@user1 @web
Scenario: Como usuario administrador creo un nuevo post con publicación programada (caso positivo)
  Given I navigate to page "http://localhost:2368/ghost/#/signin"
  And I login email "<USERNAME>" and password "<PASSWORD>"
  And I wait for 3 seconds
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
  And I click dropdown right now
  And I wait for 2 seconds
  And I click schedule for later
  And I wait for 2 seconds
  And I enter utc hour "17:00"
  And I wait for 2 seconds
  And I click continue, final review
  And I wait for 2 seconds
  And I click publish post in future
  And I wait for 2 seconds
  And I click editor
  And I wait for 2 seconds
  And I click back pages
  And I wait for 2 seconds
  And I click pages
  And I wait for 2 seconds
  Then I see page scheduled