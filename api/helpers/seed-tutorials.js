module.exports = {


  friendlyName: 'Seed tutorials',


  description: 'Seed sample tutorial records.',


  exits: {

    success: {
      description: 'Seeded sample tutorial records.',
    },

  },


  fn: async function (_inputs, exits) {
    await Tutorial.createEach([
      {
        "title": "nodejs 101",
        "summary": "nodejs tutorial",
        "author": "John Smith",
        "status": "draft",
        "content": "Yo what's up everybody??"
      },
      {
        "title": "nodejs 102",
        "summary": "nodejs tutorial",
        "author": "Will Bob",
        "status": "draft",
        "content": "Yo what's up everybody??"
      },
      {
        "title": "python 101",
        "summary": "python tutorial",
        "author": "Doe John",
        "status": "published",
        "content": "Yo what's up everybody??"
      },
      {
        "title": "ruby 101",
        "summary": "ruby tutorial",
        "author": "Harly Smit",
        "status": "published",
        "content": "Yo what's up everybody??"
      }
    ])

    exits.success()
  }
};
