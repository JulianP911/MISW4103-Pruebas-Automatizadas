Feature: Crear memeber para que pueda acceder al sitio web del usuario administrador fallido

@user1 @web
Scenario: Como usuario administrador creo un nuevo member para suscribirlo al contenido del sitio web (Campos con caracteres especiales)
  Given I navigate to page "<URL>"
  And I wait for 5 seconds
  And I login email "<USERNAME>" and password "<PASSWORD>"
  And I wait for 7 seconds
  When I click members
  And I wait for 2 seconds
  And I click new member
  And I wait for 2 seconds
  And I enter member name "5"
  And I wait for 2 seconds
  And I enter member email "5"
  And I wait for 2 seconds
  And I enter member note "5"
  And I wait for 2 seconds
  And I click save
  And I wait for 2 seconds
  And I click members
  Then I see member error email