import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from 'src/api/entities/sale.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SaleService {

    constructor(@InjectRepository(Sale) private readonly repository: Repository<Sale>){}

    async findById(user, saleId: number): Promise<Sale>{
        let payment = await this.repository.findOne(saleId);
        if(payment.user == user){
            return payment;
        }
    }

    async findAll(user): Promise<Sale[]>{
        let products = await this.repository.find({
            where: [{user: user}]
        });
        return products;
    }

    async save(user, sale: Sale): Promise<Sale>{
        sale.user = user;
        return this.repository.save(sale);
    }

    async update(user, sale: Sale, saleId: number): Promise<Sale>{
        if(sale.id == saleId){
            sale.user = user;
            return await this.repository.save(sale);
        }
    }
    
    async delete(user, saleId: number){
        let product = await this.repository.findOne(saleId);
        if(product.id == saleId && product.user == user){
            this.repository.delete({id: saleId})
        }
    }

}
