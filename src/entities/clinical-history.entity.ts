import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { User } from './user.entity';
  
  @Entity()
  export class ClinicalHistory {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    diagnosis: string;
  
    @Column()
    treatment: string;
  
    @Column()
    doctorNotes: string;
  
    @ManyToOne(() => User, (user) => user.histories, { onDelete: 'CASCADE' })
    patient: User;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  