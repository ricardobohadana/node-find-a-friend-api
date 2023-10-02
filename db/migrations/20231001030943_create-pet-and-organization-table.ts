import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('organization', (table) => {
    table.uuid('id').primary() 
    table.string('person_name').notNullable()
    table.string('email').notNullable().unique()
    table.string('cep').notNullable()
    table.string('address').notNullable()
    table.string('city').notNullable()
    table.string('state').notNullable()
    table.string('phone_number').notNullable().unique()
    table.string('password').notNullable()
  });

  await knex.schema.createTable('pet', (table) => {
    table.uuid('id').primary()
    table.uuid('organization_id').notNullable().references('id').inTable('organization').onDelete('CASCADE')
    table.string('name').notNullable()
    table.string('description').notNullable()
    table.string('age').notNullable()
    table.string('size').notNullable()
    table.string('energy').notNullable()
    table.string('independence').notNullable()
    table.string('environment').notNullable()
    table.string('images').nullable()
    table.string('adoption_requirements').nullable()
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('pet')
  await knex.schema.dropTable('organization')
}
