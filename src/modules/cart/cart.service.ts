import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from '../../entities/cart-item.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
  ) {}

  async create(createCartItemDto: any): Promise<CartItem> {
    const cartItem = this.cartItemRepository.create(createCartItemDto);
    return this.cartItemRepository.save(cartItem);
  }

  async findAll(): Promise<CartItem[]> {
    return this.cartItemRepository.find({
      relations: ['user', 'product', 'variant'],
    });
  }

  async findById(id: number): Promise<CartItem> {
    const cartItem = await this.cartItemRepository.findOne({
      where: { id },
      relations: ['user', 'product', 'variant'],
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    return cartItem;
  }

  async update(id: number, updateCartItemDto: any): Promise<CartItem> {
    const cartItem = await this.findById(id);
    Object.assign(cartItem, updateCartItemDto);
    return this.cartItemRepository.save(cartItem);
  }

  async remove(id: number): Promise<void> {
    const cartItem = await this.findById(id);
    await this.cartItemRepository.remove(cartItem);
  }

  async findByUserId(userId: number): Promise<CartItem[]> {
    return this.cartItemRepository.find({
      where: { userId },
      relations: ['product', 'variant'],
    });
  }
}
