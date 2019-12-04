import { PrimaryGeneratedColumn, Column } from "typeorm";
import { User } from "./usuario.entity";

export class Product{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length:100})
    nome:string;

    @Column({default:0, name: "preco_venda"})
    precoVenda: number;

    user: User;

}