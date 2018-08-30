const path = require('path')

const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, '..', 'database', 'dt.db')
  }
})

const createTables = async () => {
  // Tests
  await knex.schema.dropTableIfExists('tests')
  await knex.schema.createTable('tests', table => {
    table.increments()
    table.string('name')
    table.string('description')
    table.boolean('active')
  })

  // SubGroups
  await knex.schema.dropTableIfExists('subgroups')
  await knex.schema.createTable('subgroups', table => {
    table.increments()
    table.string('name')
    table.string('description')
    table.integer('test').unsigned().notNullable()

    table.foreign('test').references('id').inTable('tests')
  })

  // Questions
  await knex.schema.dropTableIfExists('questions')
  await knex.schema.createTable('questions', table => {
    table.increments()
    table.string('text')
    table.integer('subgroup').unsigned().notNullable()

    table.foreign('subgroup').references('id').inTable('subgroups')
  })

  // Answers
  await knex.schema.dropTableIfExists('answers')
  await knex.schema.createTable('answers', table => {
    table.increments()
    table.string('text')
    table.integer('question').unsigned().notNullable()

    table.foreign('question').references('id').inTable('questions')
  })

  // ScoreGroups
  await knex.schema.dropTableIfExists('scoregroups')
  await knex.schema.createTable('scoregroups', table => {
    table.increments()
    table.string('name')
    table.string('description')
    table.integer('test').unsigned().notNullable()

    table.foreign('test').references('id').inTable('tests')
  })

  // AnswerPoints
  await knex.schema.dropTableIfExists('answerpoints')
  await knex.schema.createTable('answerpoints', table => {
    table.float('malepoint')
    table.float('femalepoint')
    table.integer('answer').unsigned().notNullable()
    table.integer('scoregroup').unsigned().notNullable()

    table.foreign('answer').references('id').inTable('answers')
    table.foreign('scoregroup').references('id').inTable('scoregroups')

    table.primary(['answer', 'scoregroup'])
  })

  // Services
  await knex.schema.dropTableIfExists('services')
  await knex.schema.createTable('services', table => {
    table.increments()
    table.string('name')
    table.string('description')
    table.integer('user')
    table.boolean('done')
  })

  // TestRecords
  await knex.schema.dropTableIfExists('testrecords')
  await knex.schema.createTable('testrecords', table => {
    table.increments()
    table.integer('test').unsigned().notNullable()
    table.integer('service').unsigned().notNullable()
    table.boolean('done')

    table.foreign('test').references('id').inTable('tests')
    table.foreign('service').references('id').inTable('services')
  })
}

module.exports = {
  createTables
}