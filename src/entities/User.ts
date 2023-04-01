import "reflect-metadata"
import { Property } from '@mikro-orm/core';
import { PrimaryKey } from '@mikro-orm/core';
import { Entity } from '@mikro-orm/core';
import { Field, ObjectType } from 'type-graphql';


@ObjectType()
@Entity()
export class User {
    @Field()
    @PrimaryKey()
    id!: number

    @Field(() => Date)
    @Property({ type: "date" })
    createdAt: Date

    @Field(() => Date)
    @Property({ type: "date", onUpdate: () => new Date()})
    updatedAt: Date


    @Field()
    @Property({ type: "text", unique: true })
    username!: string
    
    @Property({type: "text"})
    password!: string
}