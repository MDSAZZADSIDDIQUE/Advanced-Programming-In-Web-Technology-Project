import { Injectable } from "@nestjs/common";
import { productDTO } from "./product.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "./product.entity";
import { Repository } from "typeorm";
import { SellerEntity } from "./seller.entity";

@Injectable()
export class SellerService {
    constructor(
        @InjectRepository(ProductEntity)
        private productRepository: Repository<ProductEntity>,
        @InjectRepository(SellerEntity)
        private sellerRepository: Repository<SellerEntity>
    ) {}

    // Add Product
    async addProduct(memberID, product: productDTO): Promise<ProductEntity> {
        const sellerDetails = await this.sellerRepository.findOneBy({ memberID : memberID });
        product.sellerID = sellerDetails.sellerID;
        product.reviews = {};
        return await this.productRepository.save(product);
    }
}