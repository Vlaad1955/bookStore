import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../database/entities/category.entity';
import { FindOptionsWhere, ILike, IsNull, Repository } from 'typeorm';
import { CategoryQueryDto } from '../common/validator/category.query.validator';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(Dto: CreateCategoryDto) {
    const category = await this.categoryRepository.create(Dto);

    const savedCategory = await this.categoryRepository.save(category);

    return savedCategory;
  }

  async findAll(query: CategoryQueryDto = {} as CategoryQueryDto) {
    const options = {
      page: Number(query.page ?? 1),
      limit: Number(query.limit ?? 10),
    };

    const filters: FindOptionsWhere<Category> = {};

    if (query.parentId === null || query.parentId === 'null') {
      filters.parentId = IsNull();
    } else if (query.parentId) {
      filters.parentId = ILike(`%${query.parentId}%`);
    }

    const order = {};
    if (query.sort) {
      order[query.sort] = query.order ?? 'ASC';
    }

    const [entities, total] = await this.categoryRepository.findAndCount({
      where: filters,
      select: {
        id: true,
        parentId: true,
        name: true,
      },
      order: order,
      skip: (options.page - 1) * options.limit,
      take: options.limit,
    });

    return {
      page: options.page,
      pages: Math.ceil(total / options.limit),
      countItems: total,
      entities: entities,
    };
  }

  async findOne(id: string) {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!category) {
      return null;
    }

    return category;
  }

  async update(id: string, Dto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    category.name = Dto.name ?? category.name;
    category.parentId = Dto.parentId ?? category.parentId;

    await this.categoryRepository.save(category);

    return { message: 'Category successfully updated' };
  }

  async remove(id: string) {
    const category = await this.categoryRepository.findOne({
      where: { id: id },
    });

    if (!category) {
      throw new UnauthorizedException('Category not found');
    }

    await this.categoryRepository.delete(id);
    return { message: 'Category successfully deleted' };
  }
}
