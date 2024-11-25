Feature: Obtain the number of videos in the system
  In order to have a video counter
  As a backoffice user
  I want to see the video counter

  Scenario: Without videos in the system
    Given I send a GET request to "/videos-counter"
    Then the response status code should be 200
    And the response body should be:
    """
    {
      "total": 0
    }
    """

  Scenario: With one video
  Given I send an event to the event bus:
  """
  {
    "data": {
      "id": "1",

      "type": "video.created",
     "occurredOn": "2021-01-01T00:00:00.000Z",
     "aggregateId": "ef8ac118-8d7f-49cc-abec-78e0d05af80a",
     "attributes": {
       "id": "ef8ac118-8d7f-49cc-abec-78e0d05af80a",
       "name": "video 1",
       "duration": "1h"
     },
      "meta": {
        "host": "localhost"
      }
    }
  }
  """
  When I send a GET request to "/videos-counter"
  Then the response status code should be 200
  And the response body should be:
    """
    {
      "total": 1
    }
    """