import { Body, Controller, Post, Session, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { SellerService } from "./seller.service";
import { SessionGuard } from "src/member/session.gaurd";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import { productDTO } from "./product.dto";
import { ProductEntity } from "./product.entity";

@Controller('seller')
export class SellerController {
    constructor(private readonly sellerService: SellerService) {}
        //Add Product
        @Post('/addproduct')
        @UseGuards(SessionGuard)
        @UsePipes(new ValidationPipe)
        @UseInterceptors(FileInterceptor('productPicture',
        { fileFilter(req, file, callback) {
            if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)) {
                callback(null, true);
            } else {
                callback(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false)
            }
        },
        limits: { fileSize: 1000000 },
        storage:diskStorage({
            destination: './pictures/product_pictures',
            filename(req, file, callback) {
                callback(null, Date.now() + file.originalname)
            },
        })
        }))
        async addProduct(@Session() session,@Body() product: productDTO, @UploadedFile() productPicture: Express.Multer.File): Promise<ProductEntity> {
            const memberID = session.memberID;
            product.picture = productPicture.filename;
            return await this.sellerService.addProduct(memberID, product);
        }
}