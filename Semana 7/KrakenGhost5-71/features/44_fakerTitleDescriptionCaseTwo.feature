Feature: Editar la informacion del sitio web del usuario adminsitrador exitoso

@user1 @web
Scenario: Como usuario administrador edito titulo y descripcion del sitio web (Sin titulo pero con descripción valido)
  Given I navigate to page "<URL>"
  And I wait for 5 seconds
  And I login email "<USERNAME>" and password "<PASSWORD>"
  And I wait for 7 seconds
  When I click general settings
  And I wait for 2 seconds
  And I click title and description
  And I wait for 2 seconds
  And I enter title web site "2"
  And I wait for 2 seconds
  And I enter description web site "2"
  And I wait for 2 seconds
  And I click save web site
  And I wait for 2 seconds
  Then I see changes in title and description web site