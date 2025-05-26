import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity('serie')
export class Serie {
  @PrimaryGeneratedColumn()
  id: bigint;

  @Column('text', { unique: true })
  name: string;

@Column('text', { nullable: true })
description: string;


 



} 

