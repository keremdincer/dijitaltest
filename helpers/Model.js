const knex = require('./Database').knex

const testModel = async id => {
  let test = await knex('tests').where('id', id).first()
  test.sections = await knex('sections').where('test', test.id)
  for (let s in test.sections) {
    let section = test.sections[s]
    section.questions =
      await knex('questions').where('section', section.id)

    for (let q in section.questions) {
      let question = section.questions[q]
      question.answers =
        await knex('answers').where('question', question.id)
    }
  }
  return test
}

module.exports = {
  test: testModel
}
