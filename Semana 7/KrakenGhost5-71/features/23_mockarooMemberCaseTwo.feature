Feature: Editar memeber para que pueda acceder al sitio web del usuario administrador exitoso

@user1 @web
Scenario: Como usuario administrador edito un member para suscribirlo al contenido del sitio web (Sin nombre ni nota pero con email valido)
  Given I navigate to page "<URL>"
  And I wait for 5 seconds
  And I login email "<USERNAME>" and password "<PASSWORD>"
  And I wait for 7 seconds
  And I load data member
  And I wait for 2 seconds
  And I click members
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
  When I click members
  And I wait for 2 seconds
  And I click member created
  And I wait for 2 seconds
  And I enter member name dynamic "2"
  And I wait for 2 seconds
  And I enter member email dynamic "2"
  And I wait for 2 seconds
  And I enter member note dynamic "2"
  And I wait for 2 seconds
  And I click save
  And I wait for 2 seconds
  And I click members
  And I wait for 2 seconds
  Then I see member edited email dynamic