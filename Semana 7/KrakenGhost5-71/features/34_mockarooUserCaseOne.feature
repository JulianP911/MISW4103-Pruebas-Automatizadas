Feature: Editar información de usuario administrador exitoso

@user1 @web
Scenario: Como usuario administrador edito la información de mi perfil (Ubicacion, sitio web, facebook y bio validos)
  Given I navigate to page "<URL>"
  And I wait for 5 seconds
  And I login email "<USERNAME>" and password "<PASSWORD>"
  And I wait for 7 seconds
  And I load data user
  And I wait for 2 seconds
  When I click user
  And I wait for 2 seconds
  And I click your profile
  And I wait for 2 seconds
  And I enter user location "1"
  And I wait for 2 seconds
  And I enter user website "1"
  And I wait for 2 seconds
  And I enter user facebook "1"
  And I wait for 2 seconds
  And I enter user bio "1"
  And I wait for 2 seconds
  And I click save and close
  And I wait for 2 seconds
  Then I check in general setting