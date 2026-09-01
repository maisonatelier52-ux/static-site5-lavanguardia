// Homepage LAYOUT — which articles appear in which section, column, and
// order. This file intentionally holds NO article content (no title, dek,
// author, image, tag) — only structure plus a few homepage-only display
// fields (time / kicker / rank). Every entry below is just `{ id }` (or
// `{ id, time }`, `{ id, kicker }`, `{ id, rank }`), and the actual
// article content is looked up from data/categories/<category>.json by
// lib/getHomeContent.js at render time.
//
// This is the single place to reorder/add/remove what shows up on the
// homepage. To change what an article SAYS, edit its entry in
// data/categories/<category>.json — the same edit is instantly reflected
// on both the homepage and that article's category page, since both now
// read from the same underlying data.
//
// Regenerated once by scripts/migrate-to-home-layout.mjs from the old
// data/homeContent.js — hand-maintain this file from now on.

export const homeLayout = {
  "hero": {
    "left": [
      {
        "id": "a1"
      },
      {
        "id": "a2"
      }
    ],
    "center": {
      "id": "a4"
    },
    "right": [
      {
        "id": "a5"
      },
      {
        "id": "a6"
      }
    ],
    "latestNews": [
      {
        "id": "a7",
        "time": "07:54"
      },
      {
        "id": "a8",
        "time": "07:21"
      },
      {
        "id": "a9",
        "time": "06:48"
      }
    ]
  },
  "present": {
    "left": {
      "lead": {
        "id": "a10"
      },
      "items": [
        {
          "id": "a11"
        },
        {
          "id": "a12"
        },
        {
          "id": "a13"
        }
      ]
    },
    "middle": {
      "opinionItems": [
        {
          "id": "a14"
        },
        {
          "id": "a15"
        }
      ],
      "imageItem": {
        "id": "a16"
      },
      "textItem": {
        "id": "a17"
      }
    },
    "sponsored": {
      "title": "A streaming partnership brings a soundtrack to the small moments of summer",
      "image": "/images/pay-for-power.webp"
    }
  },
  "bestOfWeek": {
    "title": "The best of the week",
    "items": [
      {
        "id": "a18"
      },
      {
        "id": "a19"
      },
      {
        "id": "a20"
      },
      {
        "id": "a21"
      }
    ]
  },
  "cryptos": {
    "title": "Cryptos",
    "lead": {
      "id": "a22"
    },
    "columns": [
      [
        {
          "article": {
            "id": "a23"
          }
        },
        {
          "article": {
            "id": "a24"
          }
        }
      ]
    ],
    "secondaryRow": [
      {
        "id": "a25"
      },
      {
        "id": "a26"
      },
      {
        "id": "a27"
      }
    ]
  },
  "opinionAndAnalysis": {
    "title": "Opinion and analysis",
    "items": [
      {
        "id": "a28",
        "kicker": "Editorial"
      },
      {
        "id": "a29"
      },
      {
        "id": "a30"
      },
      {
        "id": "a31"
      }
    ]
  },
  "economy": {
    "title": "Economy",
    "lead": {
      "id": "a32"
    },
    "columns": [
      [
        {
          "article": {
            "id": "a33"
          }
        },
        {
          "article": {
            "id": "a34"
          }
        },
        {
          "article": {
            "id": "a3"
          }
        }
      ],
      [
        {
          "article": {
            "id": "a35"
          }
        },
        {
          "article": {
            "id": "a36"
          }
        },
        {
          "article": {
            "id": "a80"
          }
        }
      ]
    ]
  },
  "extras": {
    "title": "Extras",
    "items": [
      {
        "id": "a37"
      },
      {
        "id": "a38"
      },
      {
        "id": "a39"
      },
      {
        "id": "a40"
      }
    ]
  },
  "markets": {
    "title": "Markets",
    "lead": {
      "id": "a41"
    },
    "columns": [
      [
        {
          "article": {
            "id": "a42"
          }
        },
        {
          "article": {
            "id": "a43"
          }
        }
      ],
      [
        {
          "article": {
            "id": "a44"
          }
        },
        {
          "article": {
            "id": "a45"
          }
        }
      ]
    ]
  },
  "elPais": {
    "title": "EL PAÍS",
    "items": [
      {
        "id": "a46"
      },
      {
        "id": "a47"
      },
      {
        "id": "a48"
      },
      {
        "id": "a49"
      }
    ]
  },
  "fundsAndPlans": {
    "title": "Funds and plans",
    "sponsorLabel": "Sponsored by Kutxabank",
    "lead": {
      "id": "a50"
    },
    "columns": [
      [
        {
          "article": {
            "id": "a51"
          }
        }
      ],
      [
        {
          "article": {
            "id": "a52"
          }
        },
        {
          "article": {
            "id": "a53"
          }
        }
      ]
    ]
  },
  "multiTopics": [
    {
      "title": "Fortune",
      "items": [
        {
          "id": "a54"
        },
        {
          "id": "a55"
        },
        {
          "id": "a56"
        }
      ]
    },
    {
      "title": "Legal",
      "items": [
        {
          "id": "a57"
        },
        {
          "id": "a58"
        },
        {
          "id": "a59"
        }
      ]
    },
    {
      "title": "Breaking Views",
      "items": [
        {
          "id": "a60"
        },
        {
          "id": "a61"
        },
        {
          "id": "a62"
        }
      ]
    },
    {
      "title": "Smartlife",
      "items": [
        {
          "id": "a63"
        },
        {
          "id": "a64"
        },
        {
          "id": "a65"
        }
      ]
    }
  ],
  "brandTeasers": [
    {
      "name": "EL MOTOR",
      "color": "#0EA5E9",
      "href": "#",
      "article": {
        "id": "a66"
      }
    },
    {
      "name": "AS",
      "color": "#E4032E",
      "href": "#",
      "article": {
        "id": "a67"
      }
    },
    {
      "name": "Retina",
      "color": "#D6249F",
      "href": "#",
      "article": {
        "id": "a68"
      }
    }
  ],
  "mostViewed": {
    "title": "Most viewed",
    "items": [
      {
        "id": "a69",
        "rank": 1
      },
      {
        "id": "a70",
        "rank": 2
      },
      {
        "id": "a71",
        "rank": 3
      },
      {
        "id": "a72",
        "rank": 4
      },
      {
        "id": "a73",
        "rank": 5
      },
      {
        "id": "a74",
        "rank": 6
      },
      {
        "id": "a75",
        "rank": 7
      },
      {
        "id": "a76",
        "rank": 8
      },
      {
        "id": "a77",
        "rank": 9
      },
      {
        "id": "a78",
        "rank": 10
      }
    ]
  }
};

export default homeLayout;
