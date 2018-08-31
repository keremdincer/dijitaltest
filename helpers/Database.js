const path = require('path')

const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, '..', 'database', 'dt.db')
  },
  useNullAsDefault: true
})

const createTables = async () => {
  // Users
  await knex.schema.dropTableIfExists('users')
  await knex.schema.createTable('users', table => {
    table.increments()
    table.string('name')
    table.string('surname')
    table.date('birthdate')
    table.string('gender')
  })

  // Tests
  await knex.schema.dropTableIfExists('tests')
  await knex.schema.createTable('tests', table => {
    table.increments()
    table.string('name')
    table.string('description')
    table.boolean('active')
  })

  // Sections
  await knex.schema.dropTableIfExists('sections')
  await knex.schema.createTable('sections', table => {
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
    table.integer('section').unsigned().notNullable()

    table.foreign('section').references('id').inTable('sections')
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

  // AnswerRecords
  await knex.schema.dropTableIfExists('answerrecords')
  await knex.schema.createTable('answerrecords', table => {
    table.increments()
    table.integer('answer').unsigned().notNullable()
    table.integer('testrecord').unsigned().notNullable()

    table.foreign('answer').references('id').inTable('answers')
    table.foreign('testrecord').references('id').inTable('testrecords')
  })
}

const populate = async () => {
  // Tests
  let testId = await knex('tests').insert({
    name: 'Beck Anksiyete Ölçeği',
    description: `Aşağıda insanların kaygılı yada endişeli oldukları zamanlarda 
    yaşadıkları bazı belirtiler verilmiştir. Lütfen her maddeyi dikkatle 
    okuyunuz. Daha sonra, her maddedeki belirtilerin bugün dahil son bir 
    haftadır sizi ne kadar rahatsız ettiğini aşağıdaki ölçekten yararlanarak 
    maddelerin yanındaki uygun yere (X) işareti koyarak belirleyiniz.`,
    active: true
  })

  // Sections
  let sectionId = await knex('sections').insert({
    name: '',
    description: '',
    test: testId[0]
  })

  // ScoreGroups
  let scoreGroupId = await knex('scoregroups').insert({
    name: 'Toplam Puan',
    description: '',
    test: testId[0]
  })

  // Questions
  await knex('questions').insert([
    {
      text: '1. Bedeninizin herhangi bir yerinde uyuşma veya karıncalanma',
      section: sectionId[0]
    },
    {
      text: '2. Sıcak/ateş basmaları',
      section: sectionId[0]
    },
    {
      text: '3. Bacaklarda halsizlik, titreme',
      section: sectionId[0]
    },
    {
      text: '4. Gevşeyememe',
      section: sectionId[0]
    },
    {
      text: '5. Çok kötü şeyler olacak korkusu',
      section: sectionId[0]
    },
    {
      text: '6. Baş dönmesi ve sersemlik',
      section: sectionId[0]
    },
    {
      text: '7. Kalp çarpıntısı',
      section: sectionId[0]
    },
    {
      text: '8. Dengeyi kaybetme duygusu',
      section: sectionId[0]
    },
    {
      text: '9. Dehşete kapılma',
      section: sectionId[0]
    },
    {
      text: '10. Sinirlilik',
      section: sectionId[0]
    },
    {
      text: '11. Boğuluyormuş gibi olma duygusu',
      section: sectionId[0]
    },
    {
      text: '12. Ellerde titreme',
      section: sectionId[0]
    },
    {
      text: '13. Titreklik',
      section: sectionId[0]
    },
    {
      text: '14. Kontrolü kaybetme korkusu',
      section: sectionId[0]
    },
    {
      text: '15. Nefes almada güçlük',
      section: sectionId[0]
    },
    {
      text: '16. Ölüm korkusu',
      section: sectionId[0]
    },
    {
      text: '17. Korkuya kapılma',
      section: sectionId[0]
    },
    {
      text: '18. Midede hazımsızlık yada rahatsızlık hissi',
      section: sectionId[0]
    },
    {
      text: '19. Baygınlık',
      section: sectionId[0]
    },
    {
      text: '20. Yüzün kızarması',
      section: sectionId[0]
    },
    {
      text: '21. Terleme (sıcağa bağlı olmayan)',
      section: sectionId[0]
    }
  ])
 
  // Answers
  let questions = await knex('questions').select('id').where('section', sectionId[0])
  for (let question of questions) {
    let answerId = await knex('answers')
      .insert({ text: '0. Hiç', question: question.id })
    await knex('answerpoints').insert({
      malepoint: 0,
      femalepoint: 0,
      answer: answerId[0],
      scoregroup: scoreGroupId[0]
    })
    answerId = await knex('answers')
      .insert({ text: '1. Hafif derecede', question: question.id })
    await knex('answerpoints').insert({
      malepoint: 1,
      femalepoint: 1,
      answer: answerId[0],
      scoregroup: scoreGroupId[0]
    })
    answerId = await knex('answers')
      .insert({ text: '2. Orta derecede', question: question.id })
    await knex('answerpoints').insert({
      malepoint: 2,
      femalepoint: 2,
      answer: answerId[0],
      scoregroup: scoreGroupId[0]
    })
    answerId = await knex('answers')
      .insert({ text: '3. Ciddi derecede', question: question.id })
    await knex('answerpoints').insert({
      malepoint: 3,
      femalepoint: 3,
      answer: answerId[0],
      scoregroup: scoreGroupId[0]
    })
  }

  // Users
  let userId = await knex('users').insert({
    name: 'John',
    surname: 'Doe',
    gender: 'Erkek',
    birthdate: new Date(1990, 12, 27, 0, 0, 0, 0)
  })

  // Services
  let serviceId = await knex('services').insert({
    name: 'Beck Depresyon Ölçeği',
    description: '',
    user: userId[0],
    done: false
  })

  // TestRecord
  await knex('testrecords').insert({
    test: testId[0],
    service: serviceId[0],
    done: false,
  })
}

module.exports = {
  createTables,
  populate,
  knex
}