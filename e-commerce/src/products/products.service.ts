import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  private products = [
    { id: '1', name: 'Wireless Mouse', price: 29.99, category: 'electronics' },
    { id: '2', name: 'Mechanical Keyboard', price: 89.99, category: 'electronics' },
    { id: 3, name: 'Coffee Mug', price: 12.50, category: 'kitchen' },
  ];

  getAllProducts(category?: string, maxPrice?: string) {
    let results = this.products;

    if (category) {
      results = results.filter((product) => product.category.toLowerCase() === category.toLowerCase());
    }

    if (maxPrice) {
      const priceCap = Number(maxPrice);
      if (!isNaN(priceCap)) {
        results = results.filter((product) => product.price <= priceCap);
      }
    }

    return results;
  }

  getProductById(id: string) {
    const product = this.products.find((product) => product.id === id)

    if (!product) {
      throw new NotFoundException(`Product with ID: ${id} was not found`)
    }

    return product;
  }

  createProduct(dto: CreateProductDto) {
    if (!dto.name || dto.name.trim() === '') {
      throw new BadRequestException('Produce name is required');
    }

    if (dto.price === undefined || dto.price < 0) {
      throw new BadRequestException('Valid product price is required')
    }

    const newProduct = {
      id: (this.products.length + 1).toString(),
      name: dto.name,
      price: dto.price,
      category: dto.category || 'general'
    };

    this.products.push(newProduct);
    return newProduct;
  }

  updateProduct(id: string, dto: UpdateProductDto) {
    const product = this.getProductById(id);

    if (dto.name) product.name = dto.name;
    if (dto.price) product.price = dto.price;
    if (dto.category) product.category = dto.category;

    return product;
  }

  deleteProduct(id: string) {
    const product = this.getProductById(id);
    this.products = this.products.filter((product) => product.id === id);
    return product;
  }
}
