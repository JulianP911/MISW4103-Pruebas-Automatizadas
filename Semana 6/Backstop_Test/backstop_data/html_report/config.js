report({
  "testSuite": "BackstopJS",
  "tests": [
    {
      "pair": {
        "reference": "../../screenshots/bitmaps_reference/backstop_default_scenario_0_document_0_default.png",
        "test": "../../screenshots/bitmaps_test/20231118-105142/backstop_default_scenario_0_document_0_default.png",
        "selector": "document",
        "fileName": "backstop_default_scenario_0_document_0_default.png",
        "label": "scenario",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "./screenshots/bitmaps_test/backstop_default_scenario_0_document_0_default.png",
        "referenceUrl": "./screenshots/bitmaps_reference/backstop_default_scenario_0_document_0_default.png",
        "expect": 0,
        "viewportLabel": "default",
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "rawMisMatchPercentage": 4.803193430656934,
          "misMatchPercentage": "4.80",
          "analysisTime": 80
        },
        "diffImage": "../../screenshots/bitmaps_test/20231118-105142/failed_diff_backstop_default_scenario_0_document_0_default.png"
      },
      "status": "fail"
    }
  ],
  "id": "backstop_default"
});