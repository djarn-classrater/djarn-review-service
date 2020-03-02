import { Entity, model, property } from '@loopback/repository';

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
  student_id: string;

  @property({
    type: 'string',
    required: true,
  })
  course_id: string;

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
