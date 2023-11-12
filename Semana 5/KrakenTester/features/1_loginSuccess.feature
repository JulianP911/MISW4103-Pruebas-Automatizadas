Feature: Inicio de sesión de usuario administrador exitoso

@user1 @web
Scenario: Como usuario administrador realizo el inicio sesión en Ghost (caso positivo)
  Given I navigate to page "http://localhost:2368/ghost/#/signin"
  And I wait for 5 seconds
  When I enter email "<USERNAME>"
  And I wait for 2 seconds
  And I enter password "<PASSWORD>"
  And I wait for 2 seconds
  And I click sign in
  And I wait for 2 seconds
  Then I check in dashboard