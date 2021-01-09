import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class alterProviderOnAppointments1609980320248
  implements MigrationInterface {
  tableName: string = 'appointments';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(this.tableName, 'provider');
    await queryRunner.addColumn(
      this.tableName,
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true,
      })
    );
    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        name: 'fk_appointments_provider_id',
        columnNames: ['provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      this.tableName,
      'fk_appointments_provider_id'
    );

    await queryRunner.dropColumn(this.tableName, 'provider_id');

    await queryRunner.addColumn(
      this.tableName,
      new TableColumn({
        name: 'provider',
        type: 'varchar',
      })
    );
  }
}
