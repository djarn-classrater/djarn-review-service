import {Entity, model, property} from '@loopback/repository';

@model()
export class Reviews extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    required: false,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  studentId: string;

  @property({
    type: 'string',
    required: true,
  })
  courseId: string;

  @property({
    type: 'string',
  })
  context?: string;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  date?: string;

  constructor(data?: Partial<Reviews>) {
    super(data);
  }
}

export interface ReviewsRelations {
  // describe navigational properties here
}

export type ReviewsWithRelations = Reviews & ReviewsRelations;
