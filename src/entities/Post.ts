import "reflect-metadata";
import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

// * stacking decorators
// using @Field to convert to graphql types
@ObjectType()
@Entity()
export class Post {
    @Field(() => Int)
    @PrimaryKey()
    id!: number

    @Field(() => Date)
    @Property({ type: Date })
    createdAt: Date

    @Field(() => String)
    @Property({ type: Date, onUpdate: () => new Date() })
    updatedAt: Date

    @Field()
    @Property({ type: "text" })
    title!: string
}
