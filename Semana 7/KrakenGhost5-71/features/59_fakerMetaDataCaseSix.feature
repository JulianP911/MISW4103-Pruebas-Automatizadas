Feature: Editar la meta data del sitio web del usuario adminsitrador fallido

@user1 @web
Scenario: Como usuario administrador edito la meta data del sitio web (Campos con caracteres especiales)
  Given I navigate to page "<URL>"
  And I wait for 5 seconds
  And I login email "<USERNAME>" and password "<PASSWORD>"
  And I wait for 7 seconds
  When I click general settings
  And I wait for 2 seconds
  And I click meta data
  And I wait for 2 seconds
  And I enter title meta data "6"
  And I wait for 2 seconds
  And I enter description meta data "6"
  And I wait for 2 seconds
  And I click save meta data
  And I wait for 2 seconds
  Then I see changes in meta data