Feature: Inicio de sesión de usuario administrador fallido

@user1 @web
Scenario Outline: Como usuario administrador realizo el inicio de sesión con campos vacios (caso negativo)
  Given I navigate to page "http://localhost:2368/ghost/#/signin"
  And I wait for 5 seconds
  When I enter email " "
  And I wait for 2 seconds
  And I enter password " "
  And I wait for 2 seconds
  And I click sign in
  And I wait for 2 seconds
  Then I see error for login in

@user2 @web
Scenario Outline: Como usuario administrador realizo el inicio de sesión con campos invalidos (caso negativo)
  Given I navigate to page "http://localhost:2368/ghost/#/signin"
  And I wait for 5 seconds
  When I enter email "pruebasyopmail.com"
  And I wait for 2 seconds
  And I enter password "Pruebas"
  And I wait for 2 seconds
  And I click sign in
  And I wait for 2 seconds
  Then I see error for login in