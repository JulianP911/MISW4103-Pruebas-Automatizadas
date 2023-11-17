Feature: Editar page en el sitio web del usuario administrador

@user1 @web
Scenario: Como usuario administrador edito una page creada previamente de mis borradores (caso positivo)
  Given I navigate to page "<URL>"
  And I wait for 5 seconds
  And I login email "<USERNAME>" and password "<PASSWORD>"
  And I wait for 7 seconds
  And I click pages
  And I wait for 2 seconds
  And I click new page
  And I wait for 2 seconds
  And I enter page title "Mi primera página de pruebas automatizadas"
  And I wait for 2 seconds
  And I enter page description "Esta página contiene información valiosa sobre pruebas automatizadas"
  And I wait for 2 seconds
  And I click back pages
  And I wait for 2 seconds
  And I click pages
  And I wait for 2 seconds
  And I see page drafted before edited
  And I wait for 2 seconds
  When I click page drafted
  And I wait for 2 seconds
  And I enter page title "Mi primera página de pruebas automatizadas editada"
  And I wait for 2 seconds
  And I enter page description "Esta página contiene información valiosa sobre pruebas automatizadas editada"
  And I wait for 2 seconds
  And I click back pages
  And I wait for 2 seconds
  Then I see page edited