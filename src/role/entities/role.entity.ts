import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @OneToMany(() => User, (user) => user.role)
    users: User[];
}
