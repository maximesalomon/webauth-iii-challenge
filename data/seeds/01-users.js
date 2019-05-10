
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username: "maximesalomon", password: "fvewfbhewfbnkj", department: "Marketing" },
        { username: "laurenfichel", password: "fv643t473ewfbhewfbnkj", department: "Human Resources" },
        { username: "orlandocastillo", password: "fvewfb54224hewfbnkj", department: "Engineering" },
      ]);
    });
};
