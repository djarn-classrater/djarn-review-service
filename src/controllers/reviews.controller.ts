import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Reviews} from '../models';
import {ReviewsRepository} from '../repositories';

export class ReviewsController {
  constructor(
    @repository(ReviewsRepository)
    public reviewsRepository: ReviewsRepository,
  ) {}

  @post('/reviews', {
    responses: {
      '200': {
        description: 'Reviews model instance',
        content: {'application/json': {schema: getModelSchemaRef(Reviews)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reviews, {
            title: 'NewReviews',
            exclude: ['id', 'date'],
          }),
        },
      },
    })
    reviews: Omit<Reviews, 'id'>,
  ): Promise<Reviews> {
    return this.reviewsRepository.create(reviews);
  }

  @get('/reviews/count', {
    responses: {
      '200': {
        description: 'Reviews model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Reviews))
    where?: Where<Reviews>,
  ): Promise<Count> {
    return this.reviewsRepository.count(where);
  }

  @get('/reviews', {
    responses: {
      '200': {
        description: 'Array of Reviews model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Reviews, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.string('studentId') studentId?: string,
    @param.query.string('courseId') courseId?: string,
    @param.array('excludeStudentIds', 'query', {
      type: 'string',
      uniqueItems: true,
    })
    excludeIds?: string | string[],
  ): Promise<Reviews[]> {
    return this.reviewsRepository.find({
      where: {
        studentId: {
          eq: studentId,
          nin: typeof excludeIds === 'string' ? [excludeIds] : excludeIds,
        },
        courseId,
      },
    });
  }

  @patch('/reviews', {
    responses: {
      '200': {
        description: 'Reviews PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reviews, {partial: true}),
        },
      },
    })
    reviews: Reviews,
    @param.query.object('where', getWhereSchemaFor(Reviews))
    where?: Where<Reviews>,
  ): Promise<Count> {
    return this.reviewsRepository.updateAll(reviews, where);
  }

  @get('/reviews/{id}', {
    responses: {
      '200': {
        description: 'Reviews model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Reviews, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(Reviews))
    filter?: Filter<Reviews>,
  ): Promise<Reviews> {
    return this.reviewsRepository.findById(id, filter);
  }

  @patch('/reviews/{id}', {
    responses: {
      '204': {
        description: 'Reviews PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reviews, {
            partial: true,
            exclude: ['id', 'date'],
          }),
        },
      },
    })
    reviews: Reviews,
  ): Promise<void> {
    await this.reviewsRepository.updateById(id, reviews);
  }

  @put('/reviews/{id}', {
    responses: {
      '204': {
        description: 'Reviews PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'appliction/json': {
          schema: getModelSchemaRef(Reviews, {
            exclude: ['id', 'date'],
          }),
        },
      },
    })
    reviews: Reviews,
  ): Promise<void> {
    await this.reviewsRepository.replaceById(id, reviews);
  }

  @del('/reviews/{id}', {
    responses: {
      '204': {
        description: 'Reviews DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.reviewsRepository.deleteById(id);
  }

  @get('/reviews/history', {
    responses: {
      '200': {
        description: 'Review history',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Reviews, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  getReviewHistory() {
    /*
    [
      {id: 1, studentId: '600610773', courseId: '261361', context: 'test', date: ?},
      {id: 2, studentId: '600610773', courseId: '261361', context: 'updated', date: ?},
    ];
    **/
    throw Error('Not implemented');
  }
}
