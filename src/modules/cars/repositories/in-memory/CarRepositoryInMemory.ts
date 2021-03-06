import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { IFindAllAvailableFilters } from '@modules/cars/dtos/IFilterCarsDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { ICarsRepository } from '../ICarsRepository';

class CarRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  public async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.cars.push(car);

    return car;
  }

  public async findAllAvailable({
    name,
    brand,
    category_id,
  }: IFindAllAvailableFilters): Promise<Car[]> {
    return this.cars.filter((car) => {
      if (name && !brand && !category_id) {
        if (car.available) {
          return car.name === name;
        }
      }
      if (!name && brand && !category_id) {
        if (car.available) {
          return car.brand === brand;
        }
      }
      if (!name && !brand && category_id) {
        if (car.available) {
          return car.category_id === category_id;
        }
      }
      return car.available && car;
    });
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  public async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id);
  }

  public async save(car: Car): Promise<Car> {
    this.cars = this.cars.map((carItem) => {
      if (carItem.id === car.id) {
        return car;
      }
      return carItem;
    });

    return car;
  }
}

export { CarRepositoryInMemory };
