Feature: Restablecer contraseña de usuario administrador fallido

@user1 @web
Scenario: Como usuario administrador restablezco la contraseña de mi usuario (caso negativo)
  Given I navigate to page "<URL>"
  And I wait for 5 seconds
  When I enter email "pruebas@yopmail.com"
  And I wait for 2 seconds
  And I click Forgot?
  And I wait for 5 seconds
  Then I see error for forgot password