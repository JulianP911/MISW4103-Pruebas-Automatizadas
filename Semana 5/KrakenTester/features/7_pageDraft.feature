Feature: Crear page en el sitio web del usuario administrador borrador

@user1 @web
Scenario: Como usuario administrador creo un nuevo borrador de page para el sitio web **(caso positivo)**
  Given I navigate to page "http://localhost:2368/ghost/#/signin"
  And I login email "<USERNAME>" and password "<PASSWORD>"
  And I wait for 3 seconds
  When I click pages
  And I wait for 2 seconds
  And I click new page
  And I wait for 2 seconds
  And I enter page title "Mi primera página de pruebas automatizadas borrador"
  And I wait for 2 seconds
  And I enter page description "Esta página contiene información valiosa sobre pruebas automatizadas"
  And I wait for 2 seconds
  And I click back pages
  And I wait for 2 seconds
  And I click pages
  And I wait for 2 seconds
  Then I see page drafted