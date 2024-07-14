import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { gender } from 'src/Enums/gender.enum';

@Entity()
@ObjectType()
export class Course {
    @PrimaryGeneratedColumn()
    @Field()
    course_id: number;

    @Column()
    @Field()
    title_course: string;

    @Column()
    @Field()
    description: string;

    @Column()
    @Field()
    sport_id: number;

    @Column()
    @Field()
    cdl_coach: number;

    @Column()
    @Field()
    quota: number;

}