import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProfileLink {
  @Field(() => String)
  label!: string;

  @Field(() => String)
  url!: string;
}

@ObjectType()
export class Skill {
  @Field(() => String)
  name!: string;
}

@ObjectType()
export class Experience {
  @Field(() => String)
  company!: string;

  @Field(() => String)
  position!: string;

  @Field(() => String, { description: 'Месяц начала в формате YYYY-MM.' })
  startedAt!: string;

  @Field(() => String, { nullable: true, description: 'Месяц окончания в формате YYYY-MM. null для текущей работы.' })
  endedAt!: string | null;

  @Field(() => [String])
  achievements!: string[];
}

@ObjectType()
export class Project {
  @Field(() => String)
  name!: string;

  @Field(() => String)
  url!: string;

  @Field(() => String)
  description!: string;
}

@ObjectType()
export class Profile {
  @Field(() => String)
  name!: string;

  @Field(() => String)
  description!: string;

  @Field(() => [ProfileLink])
  links!: ProfileLink[];

  @Field(() => [Skill])
  skills!: Skill[];

  @Field(() => [Experience])
  experience!: Experience[];

  @Field(() => [Project])
  projects!: Project[];
}
