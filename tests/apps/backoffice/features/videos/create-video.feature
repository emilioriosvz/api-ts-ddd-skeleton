Feature: Create a new video
  In order to have videos in the platform
  As a user with admin permissions
  I want to create a new video

  Scenario: A valid non existing video
    Given I send a PUT request to "/videos/ef8ac118-8d7f-49cc-abec-78e0d05af80a" with body:
    """
    {
      "id": "ef8ac118-8d7f-49cc-abec-78e0d05af80a",
      "name": "The best video",
      "duration": "5 hours"
    }
    """
    Then the response status code should be 201
    And the response should be empty

  Scenario: A valid non existing video
    Given I send a PUT request to "/videos/ef8ac118-8d7f-49cc-abec-78e0d05af80a" with body:
    """
    {
      "id": "ef8ac118-8d7f-49cc-abec-78e0d05af80a",
      "name": "The best video",
      "duration": 5
    }
    """
    # Unprocessable Entity
    Then the response status code should be 422
