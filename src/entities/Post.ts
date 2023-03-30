import "reflect-metadata";
import { Entity, PrimaryKey, Property, TimeType } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

// * stacking decorators
// using @Field to convert to graphql types
@ObjectType()
@Entity()
export class Post {
    @Field(() => Int)
    @PrimaryKey()
    id!: number

    @Field(() => String)
    @Property({ type: TimeType })
    createdAt: string

    @Field(() => String)
    @Property({ type: TimeType, onUpdate: () => new Date() })
    updatedAt: string

    @Field()
    @Property({ type: "text" })
    title!: string
}
