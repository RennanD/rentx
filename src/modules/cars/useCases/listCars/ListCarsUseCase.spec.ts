import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { CarRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let carsRepository: ICarsRepository;
let listCarsUseCase: ListAvailableCarsUseCase;

describe('List cars', () => {
  beforeEach(() => {
    carsRepository = new CarRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepository);
  });

  it('should be able to list all available cars', async () => {
    const car = {
      name: 'any name',
      brand: 'any brand',
      category_id: 'any category id',
      daily_rate: 200,
      description: 'any descript',
      fine_amount: 150,
      license_plate: 'NIU-3920',
    };

    await carsRepository.create(car);

    const cars = await listCarsUseCase.execute({});

    expect(cars[0]).toHaveProperty('id');
  });

  it('should able to filter all avalilable cars by name', async () => {
    const car = {
      name: 'any_name',
      brand: 'any brand',
      category_id: 'any category id',
      daily_rate: 200,
      description: 'any descript',
      fine_amount: 150,
      license_plate: 'NIU-3920',
    };

    await carsRepository.create(car);

    const cars = await listCarsUseCase.execute({ name: 'any_name' });

    expect(cars[0]).toHaveProperty('name');
    expect(cars[0].name).toEqual('any_name');
  });

  it('should able to filter all avalilable cars by brand', async () => {
    const car = {
      name: 'any_name',
      brand: 'any brand',
      category_id: 'any category id',
      daily_rate: 200,
      description: 'any descript',
      fine_amount: 150,
      license_plate: 'NIU-3920',
    };

    await carsRepository.create(car);

    const cars = await listCarsUseCase.execute({ brand: 'any brand' });

    expect(cars[0]).toHaveProperty('brand');
    expect(cars[0].brand).toEqual('any brand');
  });

  it('should able to filter all avalilable cars by category', async () => {
    const car = {
      name: 'any_name',
      brand: 'any brand',
      category_id: 'any category id',
      daily_rate: 200,
      description: 'any descript',
      fine_amount: 150,
      license_plate: 'NIU-3920',
    };

    await carsRepository.create(car);

    const cars = await listCarsUseCase.execute({
      category_id: 'any category id',
    });

    expect(cars[0]).toHaveProperty('category_id');
    expect(cars[0].category_id).toEqual('any category id');
  });
});
