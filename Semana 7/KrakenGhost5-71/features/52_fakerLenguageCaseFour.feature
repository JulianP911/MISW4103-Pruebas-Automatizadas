Feature: Editar el idioma del sitio web del usuario adminsitrador fallido

@user1 @web
Scenario: Como usuario administrador edito el idioma del sitio web (Algun campo largo)
  Given I navigate to page "<URL>"
  And I wait for 5 seconds
  And I login email "<USERNAME>" and password "<PASSWORD>"
  And I wait for 7 seconds
  When I click general settings
  And I wait for 2 seconds
  And I click publication language
  And I wait for 2 seconds
  And I enter language web site "4"
  And I wait for 2 seconds
  And I click save publication lenguage
  And I wait for 2 seconds
  Then I see changes in publication lenguage