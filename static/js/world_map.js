
/**
 * -----------------------------------------------
 * This map was created using amCharts Map Editor.
 *
 * To create your own map visit:
 * https://pixelmap.amcharts.com/
 *
 * For more information on amCharts visit:
 * https://www.amcharts.com/
 * -----------------------------------------------
 */

am5viewer.create("chartdiv", {
    "settings": {
        "editor": {
            "theme": "light",
            "themeTags": [
                "light"
            ],
            "userData": {
                "projection": "geoMercator",
                "geodata": "worldLow"
            },
            "heatMinFill": {
                "type": "Color",
                "value": "#ffffff"
            },
            "heatMaxFill": {
                "type": "Color",
                "value": "#0a7b25"
            },
            "heatNeutralFill": {
                "type": "Color",
                "value": "#ffffff"
            },
            "backgroundNoise": false,
            "heatActive": true
        },
        "editor.map": {
            "minZoomLevel": 0.8,
            "projection": "geoOrthographic",
            "panX": "rotateX",
            "zoomControl": {
                "type": "ZoomControl",
                "settings": {
                    "visible": true,
                    "position": "absolute",
                    "layout": {
                        "type": "VerticalLayout"
                    },
                    "themeTags": [
                        "zoomtools"
                    ],
                    "layer": 30
                }
            },
            "background": {
                "type": "Rectangle",
                "settings": {
                    "fill": {
                        "type": "Color",
                        "value": "#f1f1f1"
                    },
                    "fillOpacity": 1,
                    "width": 1707,
                    "height": 906,
                    "x": 0,
                    "y": 0,
                    "isMeasured": false
                }
            },
            "themeTags": [
                "map"
            ],
            "translateX": 853.4863503250591,
            "translateY": 450.4861324134129,
            "panY": "rotateY",
            "rotationX": -40.80517523956979,
            "rotationY": -2.589276068353419,
            "wheelY": "none",
            "homeZoomLevel": 1,
            "homeGeoPoint": {
                "longitude": 40.80689176960844,
                "latitude": 2.273389076251064
            },
            "homeRotationX": -40.80517523956979,
            "homeRotationY": -2.589276068353419
        },
        "editor.pointTemplate": {
            "toggleKey": "active",
            "centerX": {
                "type": "Percent",
                "value": 50
            },
            "centerY": {
                "type": "Percent",
                "value": 50
            },
            "tooltipText": "{name}"
        },
        "editor.bubbleTemplate": {
            "toggleKey": "active",
            "tooltipText": "{name}: {value}"
        },
        "editor.pixelTemplate": {
            "tooltipText": "{name}",
            "toggleKey": "active"
        },
        "editor.linePointTemplate": {
            "toggleKey": "active",
            "centerX": {
                "type": "Percent",
                "value": 50
            },
            "centerY": {
                "type": "Percent",
                "value": 50
            },
            "tooltipText": "{name}"
        },
        "editor.labelTemplate": {
            "toggleKey": "active",
            "tooltipText": "{name}"
        },
        "editor.polygonSeries": {
            "valueField": "value",
            "calculateAggregates": true,
            "id": "polygonseries",
            "exclude": [],
            "geometryField": "geometry",
            "geometryTypeField": "geometryType",
            "idField": "id"
        },
        "editor.lineSeries": {
            "layer": 30,
            "id": "lineseries",
            "lineTypeField": "lineType",
            "geometryField": "geometry",
            "geometryTypeField": "geometryType",
            "idField": "id"
        },
        "editor.pointSeries": {
            "fixedField": "fixed",
            "id": "pointseries",
            "geometryField": "geometry",
            "geometryTypeField": "geometryType",
            "idField": "id"
        },
        "editor.labelSeries": {
            "fixedField": "fixed",
            "id": "labelseries",
            "geometryField": "geometry",
            "geometryTypeField": "geometryType",
            "idField": "id"
        },
        "editor.bubbleSeries": {
            "calculateAggregates": true,
            "valueField": "value",
            "polygonIdField": "id",
            "id": "bubbleseries",
            "geometryField": "geometry",
            "geometryTypeField": "geometryType",
            "idField": "id"
        },
        "editor.gridSeries": {
            "themeTags": [
                "grid"
            ],
            "affectsBounds": false,
            "lineTypeField": "lineType",
            "geometryField": "geometry",
            "geometryTypeField": "geometryType",
            "idField": "id",
            "clipExtent": true
        },
        "editor.backgroundSeries": {
            "visible": true,
            "themeTags": [
                "polygon",
                "background"
            ],
            "affectsBounds": false,
            "geometryField": "geometry",
            "geometryTypeField": "geometryType",
            "idField": "id",
            "exclude": []
        },
        "editor.backgroundSeries.mapPolygons.template": {
            "forceInactive": true,
            "fill": {
                "type": "Color",
                "value": "#355883"
            },
            "stroke": {
                "type": "Color",
                "value": "#355883"
            }
        },
        "editor.gridSeries.mapLines.template": {
            "forceInactive": true,
            "stroke": {
                "type": "Color",
                "value": "#000000"
            },
            "strokeOpacity": 0.04
        }
    },
    "data": {
        "editor.polygonSeries": [
            {
                "id": "TV",
                "value": 875,
                "name": "Tuvalu"
            },
            {
                "id": "BV",
                "value": 3057,
                "name": "Bouvet Island"
            },
            {
                "id": "GI",
                "value": 2887,
                "name": "Gibraltar"
            },
            {
                "id": "GO",
                "value": 1175,
                "name": "Glorioso Islands"
            },
            {
                "id": "JU",
                "value": 8326,
                "name": "Juan De Nova Island"
            },
            {
                "id": "UM-DQ",
                "value": 6665,
                "name": "Jarvis Island"
            },
            {
                "id": "UM-FQ",
                "value": 1176,
                "name": "Baker Island"
            },
            {
                "id": "UM-HQ",
                "value": 6505,
                "name": "Howland Island"
            },
            {
                "id": "UM-JQ",
                "value": 9983,
                "name": "Johnston Atoll"
            },
            {
                "id": "UM-MQ",
                "value": 3591,
                "name": "Midway Islands"
            },
            {
                "id": "UM-WQ",
                "value": 5563,
                "name": "Wake Island"
            },
            {
                "id": "BQ",
                "value": 7381,
                "name": "Bonair, Saint Eustachius and Saba"
            },
            {
                "id": "NL",
                "value": 2211,
                "name": "Netherlands"
            },
            {
                "id": "ZW",
                "value": 4169,
                "name": "Zimbabwe"
            },
            {
                "id": "ZM",
                "value": 9360,
                "name": "Zambia"
            },
            {
                "id": "ZA",
                "value": 236,
                "name": "South Africa"
            },
            {
                "id": "YE",
                "value": 8097,
                "name": "Yemen"
            },
            {
                "id": "WS",
                "value": 2979,
                "name": "Samoa"
            },
            {
                "id": "WF",
                "value": 3710,
                "name": "Wallis and Futuna"
            },
            {
                "id": "PS",
                "value": 9519,
                "name": "Palestinian Territories"
            },
            {
                "id": "VU",
                "value": 8373,
                "name": "Vanuatu"
            },
            {
                "id": "VN",
                "value": 2597,
                "name": "Vietnam"
            },
            {
                "id": "VI",
                "value": 4597,
                "name": "US Virgin Islands"
            },
            {
                "id": "VG",
                "value": 2684,
                "name": "British Virgin Islands"
            },
            {
                "id": "VE",
                "value": 2463,
                "name": "Venezuela"
            },
            {
                "id": "VC",
                "value": 9464,
                "name": "Saint Vincent and the Grenadines"
            },
            {
                "id": "VA",
                "value": 9530,
                "name": "Vatican City"
            },
            {
                "id": "UZ",
                "value": 6674,
                "name": "Uzbekistan"
            },
            {
                "id": "US",
                "value": 320,
                "name": "United States"
            },
            {
                "id": "UY",
                "value": 3712,
                "name": "Uruguay"
            },
            {
                "id": "UA",
                "value": 9648,
                "name": "Ukraine"
            },
            {
                "id": "UG",
                "value": 1948,
                "name": "Uganda"
            },
            {
                "id": "TZ",
                "value": 6589,
                "name": "Tanzania"
            },
            {
                "id": "TW",
                "value": 2095,
                "name": "Taiwan"
            },
            {
                "id": "TR",
                "value": 2860,
                "name": "Türkiye"
            },
            {
                "id": "TN",
                "value": 5973,
                "name": "Tunisia"
            },
            {
                "id": "TT",
                "value": 2588,
                "name": "Trinidad and Tobago"
            },
            {
                "id": "TO",
                "value": 9844,
                "name": "Tonga"
            },
            {
                "id": "TL",
                "value": 1495,
                "name": "Timor-Leste"
            },
            {
                "id": "TM",
                "value": 3816,
                "name": "Turkmenistan"
            },
            {
                "id": "TK",
                "value": 7546,
                "name": "Tokelau"
            },
            {
                "id": "TJ",
                "value": 9312,
                "name": "Tajikistan"
            },
            {
                "id": "TH",
                "value": 3427,
                "name": "Thailand"
            },
            {
                "id": "TG",
                "value": 6703,
                "name": "Togo"
            },
            {
                "id": "TD",
                "value": 2530,
                "name": "Chad"
            },
            {
                "id": "TC",
                "value": 6955,
                "name": "Turks and Caicos Islands"
            },
            {
                "id": "SY",
                "value": 8902,
                "name": "Syria"
            },
            {
                "id": "SC",
                "value": 9425,
                "name": "Seychelles"
            },
            {
                "id": "SX",
                "value": 9687,
                "name": "Sint Maarten"
            },
            {
                "id": "SZ",
                "value": 2791,
                "name": "Eswatini"
            },
            {
                "id": "SE",
                "value": 2665,
                "name": "Sweden"
            },
            {
                "id": "SI",
                "value": 3168,
                "name": "Slovenia"
            },
            {
                "id": "SK",
                "value": 887,
                "name": "Slovakia"
            },
            {
                "id": "SR",
                "value": 5319,
                "name": "Suriname"
            },
            {
                "id": "ST",
                "value": 4628,
                "name": "Sao Tome and Principe"
            },
            {
                "id": "RS",
                "value": 1310,
                "name": "Serbia"
            },
            {
                "id": "PM",
                "value": 191,
                "name": "Saint Pierre and Miquelon"
            },
            {
                "id": "SO",
                "value": 6181,
                "name": "Somalia"
            },
            {
                "id": "SM",
                "value": 1582,
                "name": "San Marino"
            },
            {
                "id": "SV",
                "value": 6342,
                "name": "El Salvador"
            },
            {
                "id": "SL",
                "value": 4713,
                "name": "Sierra Leone"
            },
            {
                "id": "SB",
                "value": 9397,
                "name": "Solomon Islands"
            },
            {
                "id": "SH",
                "value": 7970,
                "name": "Saint Helena"
            },
            {
                "id": "GS",
                "value": 2603,
                "name": "South Georgia and South Sandwich Islands"
            },
            {
                "id": "SG",
                "value": 9533,
                "name": "Singapore"
            },
            {
                "id": "SN",
                "value": 7935,
                "name": "Senegal"
            },
            {
                "id": "SS",
                "value": 3169,
                "name": "South Sudan"
            },
            {
                "id": "SD",
                "value": 2121,
                "name": "Sudan"
            },
            {
                "id": "SA",
                "value": 3652,
                "name": "Saudi Arabia"
            },
            {
                "id": "EH",
                "value": 5334,
                "name": "Western Sahara"
            },
            {
                "id": "RW",
                "value": 5261,
                "name": "Rwanda"
            },
            {
                "id": "RU",
                "value": 2049,
                "name": "Russia"
            },
            {
                "id": "RO",
                "value": 3761,
                "name": "Romania"
            },
            {
                "id": "RE",
                "value": 6003,
                "name": "Reunion"
            },
            {
                "id": "QA",
                "value": 4132,
                "name": "Qatar"
            },
            {
                "id": "PF",
                "value": 6808,
                "name": "French Polynesia"
            },
            {
                "id": "PY",
                "value": 6576,
                "name": "Paraguay"
            },
            {
                "id": "PT",
                "value": 4361,
                "name": "Portugal"
            },
            {
                "id": "KP",
                "value": 6291,
                "name": "North Korea"
            },
            {
                "id": "PR",
                "value": 2371,
                "name": "Puerto Rico"
            },
            {
                "id": "PL",
                "value": 989,
                "name": "Poland"
            },
            {
                "id": "PG",
                "value": 7106,
                "name": "Papua New Guinea"
            },
            {
                "id": "PW",
                "value": 7439,
                "name": "Palau"
            },
            {
                "id": "PH",
                "value": 7355,
                "name": "Philippines"
            },
            {
                "id": "PE",
                "value": 9457,
                "name": "Peru"
            },
            {
                "id": "PN",
                "value": 6808,
                "name": "Pitcairn Islands"
            },
            {
                "id": "PA",
                "value": 1661,
                "name": "Panama"
            },
            {
                "id": "PK",
                "value": 1413,
                "name": "Pakistan"
            },
            {
                "id": "OM",
                "value": 6590,
                "name": "Oman"
            },
            {
                "id": "NZ",
                "value": 4039,
                "name": "New Zealand"
            },
            {
                "id": "SJ",
                "value": 4630,
                "name": "Svalbard and Jan Mayen"
            },
            {
                "id": "NR",
                "value": 6694,
                "name": "Nauru"
            },
            {
                "id": "NP",
                "value": 8875,
                "name": "Nepal"
            },
            {
                "id": "NO",
                "value": 3237,
                "name": "Norway"
            },
            {
                "id": "NU",
                "value": 8488,
                "name": "Niue"
            },
            {
                "id": "NI",
                "value": 1417,
                "name": "Nicaragua"
            },
            {
                "id": "NG",
                "value": 2932,
                "name": "Nigeria"
            },
            {
                "id": "NF",
                "value": 4738,
                "name": "Norfolk Island"
            },
            {
                "id": "NE",
                "value": 673,
                "name": "Niger"
            },
            {
                "id": "NC",
                "value": 3223,
                "name": "New Caledonia"
            },
            {
                "id": "NA",
                "value": 8489,
                "name": "Namibia"
            },
            {
                "id": "YT",
                "value": 5830,
                "name": "Mayotte"
            },
            {
                "id": "MY",
                "value": 6484,
                "name": "Malaysia"
            },
            {
                "id": "MW",
                "value": 6049,
                "name": "Malawi"
            },
            {
                "id": "MU",
                "value": 1224,
                "name": "Mauritius"
            },
            {
                "id": "MQ",
                "value": 5342,
                "name": "Martinique"
            },
            {
                "id": "MS",
                "value": 693,
                "name": "Montserrat"
            },
            {
                "id": "MR",
                "value": 8184,
                "name": "Mauritania"
            },
            {
                "id": "MZ",
                "value": 3781,
                "name": "Mozambique"
            },
            {
                "id": "MP",
                "value": 29,
                "name": "Northern Mariana Islands"
            },
            {
                "id": "MN",
                "value": 4587,
                "name": "Mongolia"
            },
            {
                "id": "ME",
                "value": 5969,
                "name": "Montenegro"
            },
            {
                "id": "MM",
                "value": 682,
                "name": "Myanmar"
            },
            {
                "id": "MT",
                "value": 9177,
                "name": "Malta"
            },
            {
                "id": "ML",
                "value": 3093,
                "name": "Mali"
            },
            {
                "id": "MK",
                "value": 8206,
                "name": "North Macedonia"
            },
            {
                "id": "MH",
                "value": 1229,
                "name": "Marshall Islands"
            },
            {
                "id": "MX",
                "value": 393,
                "name": "Mexico"
            },
            {
                "id": "MV",
                "value": 6025,
                "name": "Maldives"
            },
            {
                "id": "MG",
                "value": 6373,
                "name": "Madagascar"
            },
            {
                "id": "MD",
                "value": 8269,
                "name": "Moldova"
            },
            {
                "id": "MC",
                "value": 121,
                "name": "Monaco"
            },
            {
                "id": "MA",
                "value": 6922,
                "name": "Morocco"
            },
            {
                "id": "MF",
                "value": 6523,
                "name": "Saint Martin"
            },
            {
                "id": "MO",
                "value": 3756,
                "name": "Macau"
            },
            {
                "id": "LV",
                "value": 9426,
                "name": "Latvia"
            },
            {
                "id": "LU",
                "value": 7978,
                "name": "Luxembourg"
            },
            {
                "id": "LT",
                "value": 5423,
                "name": "Lithuania"
            },
            {
                "id": "LS",
                "value": 9380,
                "name": "Lesotho"
            },
            {
                "id": "LK",
                "value": 6746,
                "name": "Sri Lanka"
            },
            {
                "id": "LI",
                "value": 6554,
                "name": "Liechtenstein"
            },
            {
                "id": "LC",
                "value": 1842,
                "name": "Saint Lucia"
            },
            {
                "id": "LY",
                "value": 2803,
                "name": "Libya"
            },
            {
                "id": "LR",
                "value": 3868,
                "name": "Liberia"
            },
            {
                "id": "LB",
                "value": 3587,
                "name": "Lebanon"
            },
            {
                "id": "LA",
                "value": 3027,
                "name": "Lao People's Democratic Republic"
            },
            {
                "id": "KW",
                "value": 5614,
                "name": "Kuwait"
            },
            {
                "id": "XK",
                "value": 2657,
                "name": "Kosovo"
            },
            {
                "id": "KR",
                "value": 5353,
                "name": "South Korea"
            },
            {
                "id": "KN",
                "value": 8079,
                "name": "Saint Kitts and Nevis"
            },
            {
                "id": "KI",
                "value": 8024,
                "name": "Kiribati"
            },
            {
                "id": "KH",
                "value": 3452,
                "name": "Cambodia"
            },
            {
                "id": "KG",
                "value": 9969,
                "name": "Kyrgyzstan"
            },
            {
                "id": "KE",
                "value": 4808,
                "name": "Kenya"
            },
            {
                "id": "KZ",
                "value": 5428,
                "name": "Kazakhstan"
            },
            {
                "id": "JP",
                "value": 4382,
                "name": "Japan"
            },
            {
                "id": "JO",
                "value": 13,
                "name": "Jordan"
            },
            {
                "id": "JE",
                "value": 7377,
                "name": "Jersey"
            },
            {
                "id": "JM",
                "value": 9163,
                "name": "Jamaica"
            },
            {
                "id": "IT",
                "value": 2740,
                "name": "Italy"
            },
            {
                "id": "IL",
                "value": 7532,
                "name": "Israel"
            },
            {
                "id": "IS",
                "value": 7821,
                "name": "Iceland"
            },
            {
                "id": "IQ",
                "value": 40,
                "name": "Iraq"
            },
            {
                "id": "IR",
                "value": 6739,
                "name": "Iran"
            },
            {
                "id": "IE",
                "value": 8153,
                "name": "Ireland"
            },
            {
                "id": "IO",
                "value": 9033,
                "name": "British Indian Ocean Territory"
            },
            {
                "id": "IN",
                "value": 2606,
                "name": "India"
            },
            {
                "id": "IM",
                "value": 1474,
                "name": "Isle of Man"
            },
            {
                "id": "ID",
                "value": 8436,
                "name": "Indonesia"
            },
            {
                "id": "HU",
                "value": 3049,
                "name": "Hungary"
            },
            {
                "id": "HT",
                "value": 2135,
                "name": "Haiti"
            },
            {
                "id": "HR",
                "value": 2020,
                "name": "Croatia"
            },
            {
                "id": "HN",
                "value": 9262,
                "name": "Honduras"
            },
            {
                "id": "HM",
                "value": 920,
                "name": "Heard Island and McDonald Islands"
            },
            {
                "id": "HK",
                "value": 4373,
                "name": "Hong Kong"
            },
            {
                "id": "GY",
                "value": 6485,
                "name": "Guyana"
            },
            {
                "id": "GU",
                "value": 968,
                "name": "Guam"
            },
            {
                "id": "GF",
                "value": 4954,
                "name": "French Guiana"
            },
            {
                "id": "GT",
                "value": 9255,
                "name": "Guatemala"
            },
            {
                "id": "GL",
                "value": 3505,
                "name": "Greenland"
            },
            {
                "id": "GD",
                "value": 8181,
                "name": "Grenada"
            },
            {
                "id": "GR",
                "value": 9315,
                "name": "Greece"
            },
            {
                "id": "GQ",
                "value": 6575,
                "name": "Equatorial Guinea"
            },
            {
                "id": "GW",
                "value": 8650,
                "name": "Guinea-Bissau"
            },
            {
                "id": "GM",
                "value": 6201,
                "name": "Gambia"
            },
            {
                "id": "GP",
                "value": 7962,
                "name": "Guadeloupe"
            },
            {
                "id": "GN",
                "value": 8360,
                "name": "Guinea"
            },
            {
                "id": "GH",
                "value": 369,
                "name": "Ghana"
            },
            {
                "id": "GG",
                "value": 366,
                "name": "Guernsey"
            },
            {
                "id": "GE",
                "value": 5364,
                "name": "Georgia"
            },
            {
                "id": "GA",
                "value": 8614,
                "name": "Gabon"
            },
            {
                "id": "FR",
                "value": 47,
                "name": "France"
            },
            {
                "id": "FM",
                "value": 1831,
                "name": "Federated States of Micronesia"
            },
            {
                "id": "FO",
                "value": 7825,
                "name": "Faroe Islands"
            },
            {
                "id": "FK",
                "value": 258,
                "name": "Falkland Islands"
            },
            {
                "id": "FJ",
                "value": 9584,
                "name": "Fiji"
            },
            {
                "id": "FI",
                "value": 3071,
                "name": "Finland"
            },
            {
                "id": "ET",
                "value": 2638,
                "name": "Ethiopia"
            },
            {
                "id": "EE",
                "value": 8263,
                "name": "Estonia"
            },
            {
                "id": "ES",
                "value": 3083,
                "name": "Spain"
            },
            {
                "id": "ER",
                "value": 9507,
                "name": "Eritrea"
            },
            {
                "id": "GB",
                "value": 8020,
                "name": "United Kingdom"
            },
            {
                "id": "EG",
                "value": 8158,
                "name": "Egypt"
            },
            {
                "id": "EC",
                "value": 9875,
                "name": "Ecuador"
            },
            {
                "id": "DZ",
                "value": 2285,
                "name": "Algeria"
            },
            {
                "id": "DO",
                "value": 4987,
                "name": "Dominican Republic"
            },
            {
                "id": "DK",
                "value": 1727,
                "name": "Denmark"
            },
            {
                "id": "DM",
                "value": 7962,
                "name": "Dominica"
            },
            {
                "id": "DJ",
                "value": 4943,
                "name": "Djibouti"
            },
            {
                "id": "DE",
                "value": 2345,
                "name": "Germany"
            },
            {
                "id": "CZ",
                "value": 6245,
                "name": "Czechia"
            },
            {
                "id": "CY",
                "value": 6471,
                "name": "Cyprus"
            },
            {
                "id": "KY",
                "value": 6470,
                "name": "Cayman Islands"
            },
            {
                "id": "CX",
                "value": 9198,
                "name": "Christmas Island"
            },
            {
                "id": "CW",
                "value": 1442,
                "name": "Curaçao"
            },
            {
                "id": "CU",
                "value": 7670,
                "name": "Cuba"
            },
            {
                "id": "CR",
                "value": 1265,
                "name": "Costa Rica"
            },
            {
                "id": "CV",
                "value": 5576,
                "name": "Cape Verde"
            },
            {
                "id": "KM",
                "value": 5205,
                "name": "Comoros"
            },
            {
                "id": "CO",
                "value": 8603,
                "name": "Colombia"
            },
            {
                "id": "CK",
                "value": 8799,
                "name": "Cook Islands"
            },
            {
                "id": "CG",
                "value": 9682,
                "name": "Republic of Congo"
            },
            {
                "id": "CD",
                "value": 1140,
                "name": "Democratic Republic of Congo"
            },
            {
                "id": "CM",
                "value": 6019,
                "name": "Cameroon"
            },
            {
                "id": "CI",
                "value": 3855,
                "name": "Côte d'Ivoire"
            },
            {
                "id": "CN",
                "value": 9027,
                "name": "China"
            },
            {
                "id": "CL",
                "value": 4329,
                "name": "Chile"
            },
            {
                "id": "CH",
                "value": 4899,
                "name": "Switzerland"
            },
            {
                "id": "CC",
                "value": 9712,
                "name": "Cocos (Keeling) Islands"
            },
            {
                "id": "CA",
                "value": 3321,
                "name": "Canada"
            },
            {
                "id": "CF",
                "value": 6892,
                "name": "Central African Republic"
            },
            {
                "id": "BE",
                "value": 6915,
                "name": "Belgium"
            },
            {
                "id": "BW",
                "value": 9801,
                "name": "Botswana"
            },
            {
                "id": "BT",
                "value": 6321,
                "name": "Bhutan"
            },
            {
                "id": "BN",
                "value": 3683,
                "name": "Brunei"
            },
            {
                "id": "BB",
                "value": 8889,
                "name": "Barbados"
            },
            {
                "id": "BR",
                "value": 9502,
                "name": "Brazil"
            },
            {
                "id": "BO",
                "value": 4012,
                "name": "Bolivia"
            },
            {
                "id": "BM",
                "value": 6286,
                "name": "Bermuda"
            },
            {
                "id": "BZ",
                "value": 2534,
                "name": "Belize"
            },
            {
                "id": "BY",
                "value": 4488,
                "name": "Belarus"
            },
            {
                "id": "BL",
                "value": 2986,
                "name": "Saint Barthelemy"
            },
            {
                "id": "BS",
                "value": 6862,
                "name": "Bahamas"
            },
            {
                "id": "BH",
                "value": 1981,
                "name": "Bahrain"
            },
            {
                "id": "BA",
                "value": 1386,
                "name": "Bosnia and Herzegovina"
            },
            {
                "id": "BG",
                "value": 2164,
                "name": "Bulgaria"
            },
            {
                "id": "BD",
                "value": 2966,
                "name": "Bangladesh"
            },
            {
                "id": "BF",
                "value": 9234,
                "name": "Burkina Faso"
            },
            {
                "id": "BJ",
                "value": 8358,
                "name": "Benin"
            },
            {
                "id": "BI",
                "value": 7553,
                "name": "Burundi"
            },
            {
                "id": "AZ",
                "value": 4482,
                "name": "Azerbaijan"
            },
            {
                "id": "AT",
                "value": 2333,
                "name": "Austria"
            },
            {
                "id": "AU",
                "value": 867,
                "name": "Australia"
            },
            {
                "id": "TF",
                "value": 7785,
                "name": "French Southern and Antarctic Lands"
            },
            {
                "id": "AQ",
                "value": 1456,
                "name": "Antarctica"
            },
            {
                "id": "AS",
                "value": 15,
                "name": "American Samoa"
            },
            {
                "id": "AM",
                "value": 1300,
                "name": "Armenia"
            },
            {
                "id": "AR",
                "value": 1806,
                "name": "Argentina"
            },
            {
                "id": "AE",
                "value": 4635,
                "name": "United Arab Emirates"
            },
            {
                "id": "AD",
                "value": 30,
                "name": "Andorra"
            },
            {
                "id": "AX",
                "value": 6366,
                "name": "Aland Islands"
            },
            {
                "id": "AL",
                "value": 7711,
                "name": "Albania"
            },
            {
                "id": "AI",
                "value": 1310,
                "name": "Anguilla"
            },
            {
                "id": "AO",
                "value": 5914,
                "name": "Angola"
            },
            {
                "id": "AF",
                "value": 3451,
                "name": "Afghanistan"
            },
            {
                "id": "AG",
                "value": 3852,
                "name": "Antigua and Barbuda"
            },
            {
                "id": "AW",
                "value": 250,
                "name": "Aruba"
            }
        ],
        "editor.lineSeries": [],
        "editor.pointSeries": [],
        "editor.labelSeries": [],
        "editor.bubbleSeries": [],
        "editor.gridSeries": []
    }
});
