Feature: Crear memeber para que pueda acceder al sitio web del usuario administrador exitoso

@user1 @web
Scenario: Como usuario administrador creo un nuevo member para suscribirlo al contenido del sitio web	(Nombre, email y nota validos)
  Given I navigate to page "<URL>"
  And I wait for 5 seconds
  And I login email "<USERNAME>" and password "<PASSWORD>"
  And I wait for 7 seconds
  When I click members
  And I wait for 2 seconds
  And I click new member
  And I wait for 2 seconds
  And I enter member name "1"
  And I wait for 2 seconds
  And I enter member email "1"
  And I wait for 2 seconds
  And I enter member note "1"
  And I wait for 2 seconds
  And I click save
  And I wait for 2 seconds
  And I click members
  Then I see member created