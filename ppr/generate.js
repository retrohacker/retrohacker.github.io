const { Podcast } = require("podcast");

const feed = new Podcast({
  title: "Positively Power Ranch",
  description: "Exploring what makes our community work",
  feedUrl: "https://blankenship.io/ppr/rss.xml",
  siteUrl: "https://blankenship.io/ppr",
  imageUrl: "https://blankenship.io/ppr/cover.jpg",
  author: "William Blankenship",
  managingEditor: "William Blankenship",
  webMaster: "William Blankenship",
  copyright: "2024 William Blankenship",
  language: "en",
  categories: ["Society & Culture"],
  pubDate: "June 19, 2024 13:00:00 UTC",
  ttl: 60,
  itunesAuthor: "William Blankenship",
  itunesSubtitle: "Exploring what makes our community work",
  itunesOwner: { name: "William Blankenship", email: "podcast@blankenship.io" },
  itunesExplicit: false,
  itunesCategory: [
    {
      text: "Society & Culture",
      subcats: [
        {
          text: "Documentary",
        },
        {
          text: "Relationships",
        },
        {
          text: "Places & Travel",
        },
      ],
    },
  ],
  itunesImage: "https://blankenship.io/ppr/cover.jpg",
});

feed.addItem({
  title: "001: Russ Wicks",
  description: "Meet the Neighbors: Russ Wicks",
  url: "https://www.blankenship.io/ppr",
  date: "June 19, 2024",
  enclosure: {
    url: "https://pub-b4c15350e6b44595bca56540e4b52090.r2.dev/001_wicks.mp3",
    size: 68652,
    type: "audio/mpeg",
  },
});

const xml = feed.buildXml();
console.log(xml);
