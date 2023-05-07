export const defaultColumns = [
  {
    name: 'id',
    type: 'varchar',
    generationStrategy: 'uuid' as 'uuid' | 'increment' | 'rowid' | 'identity',
    isGenerated: true,
    isPrimary: true,
  },
  {
    name: 'createdAt',
    type: 'datetime',
    default: 'now()',
  },
  {
    name: 'updatedAt',
    type: 'datetime',
    default: 'now()',
  },
];
