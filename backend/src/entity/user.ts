import {Entity, PrimaryColumn, Column} from "typeorm";

@Entity("user")
export class User {
  @PrimaryColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;
}
