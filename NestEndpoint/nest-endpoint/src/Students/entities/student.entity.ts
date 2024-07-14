// student.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { gender } from 'src/Enums/gender.enum';

@Entity()
@ObjectType()
export class Student {
    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column()
    @Field()
    name: string;

    @Column()
    @Field()
    lastname: string;

    @Column()
    @Field()
    email: string;

    @Column()
    @Field()
    age: number;

    @Column()
    @Field()
    password: string;

    @Field()
    @Column({
        type: 'enum',
        enum: gender,
    })
    @Field()
    gender: gender;
}
