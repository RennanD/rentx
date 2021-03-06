import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory';
import { BadRequestError } from '@shared/errors/BadRequestError';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

describe('Create Category', () => {
  let createCategory: CreateCategoryUseCase;
  let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategory = new CreateCategoryUseCase(categoriesRepositoryInMemory);
  });

  it('should be able to create a new category', async () => {
    await createCategory.execute({
      name: 'any category',
      description: 'any description',
    });

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      'any category'
    );

    expect(categoryCreated).toHaveProperty('id');
  });

  it('should not be able to create a new category with duplicated name', async () => {
    await createCategory.execute({
      name: 'any category',
      description: 'any description',
    });

    expect(async () => {
      await createCategory.execute({
        name: 'any category',
        description: 'any description',
      });
    }).rejects.toBeInstanceOf(BadRequestError);
  });
});
