Feature: Eliminar member para que no pueda acceder al sitio web del usuario administrador

@user1 @web
Scenario: Como usuario administrador elimino un member (caso positivo)
  Given I navigate to page "<URL>"
  And I wait for 5 seconds
  And I login email "<USERNAME>" and password "<PASSWORD>"
  And I wait for 7 seconds
  And I click members
  And I wait for 2 seconds
  And I click new member
  And I wait for 2 seconds
  And I enter member name "Alba Gutierrez"
  And I wait for 2 seconds
  And I enter member email "alba@yopmail.com"
  And I wait for 2 seconds
  And I enter member note "Este usuario se utiliza con el proposito de pruebas"
  And I wait for 2 seconds
  And I click save
  And I wait for 2 seconds
  When I click members
  And I wait for 2 seconds
  And I click member created
  And I wait for 2 seconds
  And I click member settings
  And I wait for 2 seconds
  And I click delete member
  And I wait for 2 seconds
  Then I confirm delete member