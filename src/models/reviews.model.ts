import {Entity, model, property} from '@loopback/repository';

@model()
export class Reviews extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  id: number;

  @property({
    type: 'number',
    required: true,
  })
  student_id: number;

  @property({
    type: 'number',
    required: true,
  })
  course_id: number;

  @property({
    type: 'string',
  })
  context?: string;

  @property({
    type: 'date',
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
