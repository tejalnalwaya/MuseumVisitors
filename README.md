# Museum Visitors
    This project is aimed to fetch the highest and lowest visited museums information by contacting LA city API.

    API used from LA city: https://data.lacity.org/resource/trxm-jn3c.json

# Folder structure

    .
    ├── rest                    # Rest layer where apis are written
    │   ├── museumVisitors.rest.js    # APIs
    ├── services                # Service layer which handles business logic
    │   ├── MuseumVisitors.js  # Service file
    ├── utils                # Common functions for the project
    │   ├── utils.js  # functions file
    ├── lib                # For other validation dependencies
    │   ├── joiSchemas.js  # Joi validation for request params
    └── README.md               # Full documentation about the project


## Run the service
    node index.js

# REST API

## Fetch highest and lowest visited by date (in milliseconds)

### Request

 {{url}}/api/visitors?date=1404198000000
### Response

    {
        "month": "Jul",
        "year": 2014,
        "highest": {
            "museum": "avila_adobe",
            "visitors": 32378
        },
        "lowest": {
            "museum": "hellman_quon",
            "visitors": 120
        },
        "total": 60535
    }

### Request with ignore mueseum

`GET /api/visitors?date=1404198000000&ignore=avila_adobe`

 {{url}}/api/visitors?date=1404198000000&ignore=visitor_center_avila_adobe

### Response 
{
  "attendance": {
    "month": "Jul",
    "year": 2014,
    "highest": {
      "museum": "avila_adobe",
      "visitors": 32378
    },
    "lowest": {
      "museum": "hellman_quon",
      "visitors": 120
    },
    "ignored": {
      "museum": "visitor_center_avila_adobe",
      "visitors": 3527
    },
    "total": 57008
  }
}