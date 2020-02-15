module.exports = {
  async up(db, client) {
    db.createCollection( "Ingredient", {
      validator: {
        $and: [
          {
            "name": {$type: "string", $exists: true}
          },
          {
            "ico": {$type: "string", $exists: true}
          }
          ]
      }
    } );
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
  },

  async down(db, client) {
    db.dropCollection("Ingredient");
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
