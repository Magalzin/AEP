import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({nullable: true, default: null})
    secondEmail: string;

    @Column()
    password: string;

    @Column()
    gold: number;

    @Column({ default: null, nullable: true })
    phone : string;

    @Column()
    role: string;

    @Column({ default: false })
    isActive: boolean;

    @Column({ default: false })
    isEmailVerified: boolean;  // Indica se o e-mail foi verificado

    @Column({ nullable: true, default: null})
    verificationCode: string;

    @Column({ default: false })
    isPhoneVerified: boolean;

}
