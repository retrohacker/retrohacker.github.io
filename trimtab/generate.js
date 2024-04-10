const { Podcast } = require("podcast");

const feed = new Podcast({
  title: "TrimTab",
  description: "The Peer-to-Peer Podcast.",
  feedUrl: "https://blankenship.io/trimtab/rss.xml",
  siteUrl: "https://blankenship.io/trimtab",
  imageUrl: "https://blankenship.io/trimtab/cover.jpg",
  author: "William Blankenship",
  managingEditor: "William Blankenship",
  webMaster: "William Blankenship",
  copyright: "2013 William Blankenship",
  language: "en",
  categories: ["Technology"],
  pubDate: "April 4, 2024 21:00:00 UTC",
  ttl: 60,
  itunesAuthor: "William Blankenship",
  itunesSubtitle: "The Peer to Peer Podcast.",
  itunesOwner: { name: "William Blankenship", email: "podcast@blankenship.io" },
  itunesExplicit: false,
  itunesCategory: [
    {
      text: "Technology",
    },
  ],
  itunesImage: "https://blankenship.io/trimtab/cover.jpg",
});

feed.addItem({
  title: "001: Dave Huseby",
  description:
    "Dave Huseby, founder of Cryptid and community organizer for libp2p.",
  url: "https://www.blankenship.io/trimtab",
  date: "April 4, 2024",
  enclosure: {
    url: "https://blankenship.io/trimtab/001-huseby/podcast.mp3",
    file: "./001-huseby/podcast.mp3",
  },
});

const xml = feed.buildXml();
console.log(xml);
