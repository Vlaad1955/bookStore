import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {BaseEntity} from "./base.entity";

@Entity()
export class Category extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', { nullable: false, unique: true })
    name: string;

    @Column('text', {nullable: true})
    parentId:string;
}
