Feature: Obtain the number of videos in the system
  In order to have a video counter
  As a backoffice user
  I want to see the video counter

  Scenario: With one video
    Given I send to the eventbus:
    """
    {
      "data": {
        "id": "1",
        "type": "video",
       "occurred_on": "2021-01-01T00:00:00.000Z",
       "aggregate_id": "8c1f1b1b-1b1b-1b1b-1b1b-1b1b1b1b1b1b",
       "attributes": {
         "name": "video 1",
         "duration": "1h",
       },
        "meta": {
          "host": "localhost",
        }
      }
    }
    """
    When I send a GET request to "/videos-counter"
    Then the response status code is 200