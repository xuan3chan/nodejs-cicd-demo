import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('menu_items')
export class MenuItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column()
  price: string;

  @Column()
  category: string;

  @Column({ nullable: true })
  tag: string;

  @Column()
  image: string;

  @Column({ nullable: true })
  altText: string;
}
