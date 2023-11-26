Feature: Cambio de contrasenia del usuario administrador fallido

@user1 @web
Scenario: Como usuario administrador realizo el cambio de contrasenia de mi perfil (Campos de contrasenia vieja y nueva invalidos)
  Given I navigate to page "<URL>"
  And I wait for 5 seconds
  And I login email "<USERNAME>" and password "<PASSWORD>"
  And I wait for 7 seconds
  When I click user
  And I wait for 2 seconds
  And I click your profile
  And I wait for 2 seconds
  And I click change password
  And I wait for 2 seconds
  And I enter old password invalid
  And I wait for 2 seconds
  And I enter new password
  And I wait for 2 seconds
  And I enter repeat new password
  And I wait for 2 seconds
  And I click change password
  And I wait for 2 seconds
  Then I see error do not match password