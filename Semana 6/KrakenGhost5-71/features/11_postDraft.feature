Feature: Crear post en la página web del usuario administrador

@user1 @web
Scenario: Como usuario administrador creo un nuevo post en el sitio web borrador
  Given I navigate to page "<URL>"
  And I wait for 5 seconds
  And I login email "<USERNAME>" and password "<PASSWORD>"
  And I wait for 7 seconds
  When I click posts
  And I wait for 2 seconds
  And I click new post
  And I wait for 2 seconds
  And I enter post title "Mi primer blog de pruebas automatizadas borrador"
  And I wait for 2 seconds
  And I enter post description "Bienvenidos a un mundo nuevo donde aprenderás sobre pruebas"
  And I wait for 2 seconds
  And I click back posts
  And I wait for 2 seconds
  And I click posts
  And I wait for 2 seconds
  Then I see post drafted