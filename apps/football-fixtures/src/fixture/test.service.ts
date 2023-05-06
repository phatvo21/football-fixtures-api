import { TestInterface } from '@app/football-fixtures/fixture/data/repositories/interface/test.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
  constructor(
    @Inject('TestInterface')
    private readonly testRepo: TestInterface,
  ) {}

  public async findAll(): Promise<any> {
    return this.testRepo.findAll();
  }
}
