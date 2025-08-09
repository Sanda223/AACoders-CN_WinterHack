const express = require('express');
const router = express.Router();
const authenticateToken = require('./middleware/auth');

router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const db = req.db;
    const id = req.params.id;

    if (!/^nm\d+$/.test(id)) {
      return res.status(400).json({
        error: true,
        message: "Invalid person ID format"
      });
    }

    // Get person info
    const person = await db('names')
      .select('primaryName as name', 'birthYear', 'deathYear')
      .where({ nconst: id })
      .first();

    if (!person) {
      return res.status(404).json({
        error: true,
        message: "No record exists of a person with this ID"
      });
    }

    // Get roles (principals) with movie info + rating
    const rolesRaw = await db('principals as p')
      .join('basics as b', 'p.tconst', 'b.tconst')
      .leftJoin('ratings as r', function() {
        this.on('b.tconst', '=', 'r.tconst')
            .andOn('r.source', '=', db.raw('?', ['Internet Movie Database']));
      })
      .select(
        'b.primaryTitle as movieName',
        'b.tconst as movieId',
        'p.category',
        'p.characters',
        'r.source',
        'r.value as imdbRating'
      )
      .where('p.nconst', id)
      .orderBy('p.ordering');
    console.log("RolesRaw:", rolesRaw);

    // Parse characters into array
    const roles = rolesRaw.map(role => ({
      movieName: role.movieName,
      movieId: role.movieId,
      category: role.category,
      characters: role.characters ? role.characters.split(',').map(c => c.trim()) : [],
      imdbRating: role.imdbRating || null

    }));

    res.status(200).json({
      name: person.name,
      birthYear: person.birthYear ? Number(person.birthYear) : null,
      deathYear: person.deathYear ? Number(person.deathYear) : null,
      roles
    });

  } catch (err) {
    console.error("Error fetching person:", err);
    res.status(500).json({ error: true, message: 'Internal server error' });
  }
});

module.exports = router;
