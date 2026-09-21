/**
 * Homepage LAYOUT ONLY — which article id appears in which
 * section/column/rail, plus a handful of homepage-only display fields
 * (`time` on the Latest ticker, `kicker` overrides in Opinion and
 * analysis). Article CONTENT (title, dek, author, image, tag, body) lives
 * entirely in data/categories/<category>.json; lib/getHomeContent.js
 * resolves every `{ id }` reference below against those files at render
 * time (see that file for the resolver itself).
 *
 * Rebuilt around the site's 4 real categories (U.S., Business, Finance,
 * World — 24 articles total). A few sections were renamed or repurposed
 * to fit real content instead of the old placeholder categories/brands:
 *   - "cryptos" -> "markets": every Finance article now appears
 *     somewhere in this section, so it is a genuine markets module
 *     rather than a narrow crypto-only one.
 *   - "economy" -> "business": same component (ArticleAdSection),
 *     now fed by the Business category.
 *   - "multiTopics": the old unrelated magazine-brand columns
 *     (Fortune / Legal / Breaking Views / Smartlife) are now one
 *     mini-column per real category.
 *   - "brandTeasers": the old unrelated sub-brand row (EL MOTOR / AS /
 *     Retina) now cross-promotes the site's own 4 categories, using
 *     each category's real accent color.
 *   - The old "markets" (Kutxabank-sponsored "Funds and plans") and
 *     "El País" sections were dropped rather than repurposed — both
 *     were tied to a specific external sponsor/outlet that has no
 *     equivalent in the new content, and folding them into another
 *     section kept every one of the 24 real articles from needing more
 *     than a few repeat appearances across the page.
 *
 * With only 24 real articles feeding roughly 50 homepage slots, some
 * articles are deliberately referenced more than once (a lead story
 * also turning up in Most viewed or a topic column) — the same pattern
 * real news homepages use, not an error.
 */
const homeLayout = {
  "hero": {
    "left": [
      {
        "id": "wld2"
      },
      {
        "id": "biz1"
      }
    ],
    "center": {
      "id": "fin5"
    },
    "right": [
      {
        "id": "us5"
      },
      {
        "id": "wld5"
      }
    ],
    "latestNews": [
      {
        "id": "wld4",
        "time": "09:15"
      },
      {
        "id": "fin6",
        "time": "16:40"
      },
      {
        "id": "wld6",
        "time": "07:30"
      }
    ]
  },
  "present": {
    "left": {
      "lead": {
        "id": "us1"
      },
      "items": [
        {
          "id": "biz6"
        },
        {
          "id": "fin3"
        },
        {
          "id": "wld1"
        }
      ]
    },
    "middle": {
      "opinionItems": [
        {
          "id": "us2"
        },
        {
          "id": "biz2"
        }
      ],
      "imageItem": {
        "id": "fin1"
      },
      "textItem": {
        "id": "wld3"
      }
    },
    "sponsored": {
      "title": "Get U.S., Business, Finance and World news in your inbox every morning",
      "image": "/images/pay-for-power.webp"
    }
  },
  "bestOfWeek": {
    "title": "The best of the week",
    "items": [
      {
        "id": "us4"
      },
      {
        "id": "biz3"
      },
      {
        "id": "fin4"
      },
      {
        "id": "wld1"
      }
    ]
  },
  "markets": {
    "title": "Markets",
    "lead": {
      "id": "fin2"
    },
    "columns": [
      [
        {
          "article": {
            "id": "fin1"
          }
        },
        {
          "article": {
            "id": "fin6"
          }
        }
      ]
    ],
    "secondaryRow": [
      {
        "id": "fin3"
      },
      {
        "id": "fin4"
      },
      {
        "id": "fin5"
      }
    ]
  },
  "opinionAndAnalysis": {
    "title": "Opinion and analysis",
    "items": [
      {
        "id": "biz2",
        "kicker": "Editorial"
      },
      {
        "id": "wld6",
        "kicker": "Analysis"
      },
      {
        "id": "us6",
        "kicker": "Analysis"
      },
      {
        "id": "fin6",
        "kicker": "Perspective"
      }
    ]
  },
  "business": {
    "title": "Business",
    "lead": {
      "id": "biz1"
    },
    "columns": [
      [
        {
          "article": {
            "id": "biz2"
          }
        },
        {
          "article": {
            "id": "biz5"
          }
        },
        {
          "article": {
            "id": "biz6"
          }
        }
      ]
    ]
  },
  "extras": {
    "title": "More headlines",
    "items": [
      {
        "id": "us3"
      },
      {
        "id": "wld5"
      },
      {
        "id": "us6"
      },
      {
        "id": "fin4"
      }
    ]
  },
  "multiTopics": [
    {
      "title": "U.S.",
      "items": [
        {
          "id": "us1"
        },
        {
          "id": "us3"
        },
        {
          "id": "us4"
        }
      ]
    },
    {
      "title": "Business",
      "items": [
        {
          "id": "biz1"
        },
        {
          "id": "biz4"
        },
        {
          "id": "biz5"
        }
      ]
    },
    {
      "title": "Finance",
      "items": [
        {
          "id": "fin2"
        },
        {
          "id": "fin5"
        },
        {
          "id": "fin6"
        }
      ]
    },
    {
      "title": "World",
      "items": [
        {
          "id": "wld1"
        },
        {
          "id": "wld2"
        },
        {
          "id": "wld4"
        }
      ]
    }
  ],
  "brandTeasers": [
    {
      "name": "U.S.",
      "color": "#2FE6C9",
      "href": "/us",
      "article": {
        "id": "us2"
      }
    },
    {
      "name": "BUSINESS",
      "color": "#7C6CFF",
      "href": "/business",
      "article": {
        "id": "biz3"
      }
    },
    {
      "name": "FINANCE",
      "color": "#FFD700",
      "href": "/finance",
      "article": {
        "id": "fin3"
      }
    },
    {
      "name": "WORLD",
      "color": "#FF3D5F",
      "href": "/world",
      "article": {
        "id": "wld3"
      }
    }
  ],
  "mostViewed": {
    "title": "Most viewed",
    "items": [
      {
        "id": "fin5"
      },
      {
        "id": "wld4"
      },
      {
        "id": "us3"
      },
      {
        "id": "biz1"
      },
      {
        "id": "wld2"
      },
      {
        "id": "fin6"
      },
      {
        "id": "us1"
      },
      {
        "id": "wld6"
      },
      {
        "id": "biz4"
      },
      {
        "id": "us5"
      }
    ]
  }
};

export default homeLayout;
