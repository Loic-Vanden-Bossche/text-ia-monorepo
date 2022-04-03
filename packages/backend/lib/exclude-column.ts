import {getRepository, ObjectType} from "typeorm";

export default <Entity>(
  entity: ObjectType<Entity>,
  columnsToExclude: string[]
): string[] =>
  getRepository(entity).metadata.columns
    .map(column => column.databaseName)
    .filter(columnName => !columnsToExclude.includes(columnName));
