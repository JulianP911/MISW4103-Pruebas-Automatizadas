Feature: Crear memeber para que pueda cceder al sitio web del usuario administrador fallido

@user1 @web
Scenario: Como usuario administrador creo un nuevo member para suscribirlo al contenido del sitio web (caso negativo)
  Given I navigate to page "<URL>"
  And I wait for 5 seconds
  And I login email "<USERNAME>" and password "<PASSWORD>"
  And I wait for 7 seconds
  When I click members
  And I wait for 2 seconds
  And I click new member
  And I wait for 2 seconds
  And I enter member name "Ana Gutierrez"
  And I wait for 2 seconds
  And I enter member email " "
  And I wait for 2 seconds
  And I enter member note "Este usuario se utiliza con el proposito de pruebas"
  And I wait for 2 seconds
  And I click save
  And I wait for 2 seconds
  Then I see error for member