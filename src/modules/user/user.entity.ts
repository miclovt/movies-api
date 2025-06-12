import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RateEntity } from '../rate/rate.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column({ nullable: true })
  pass: string;
  @OneToMany(() => RateEntity, (rate) => rate.user)
  rates: RateEntity[];
}
