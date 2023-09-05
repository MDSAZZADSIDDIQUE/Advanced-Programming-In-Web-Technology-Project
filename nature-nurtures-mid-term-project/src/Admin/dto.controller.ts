import { Controller, Get, Param, Body, Post, Put } from '@nestjs/common';
import { createDto, Create_product_dto } from './dto/create-user.dto';
const User = [];
const Product = [];
@Controller('Add_admin')
export class dtocontroller {
  @Post()
  addUser(@Body() createUserDto: createDto) {
    User.push(createUserDto);

    console.log(createUserDto);
    return 'User added successfully';
  }

  @Get('/show')
  getuser() {
    return User;
  }

  @Get(':id')
  getusers(@Param('id') id: number) {
    const result = User.find((user) => user.id == +id);
    console.log(result);
    return 'success';
  }

  @Put(':id')
  updateAdmin(@Param('id') id: number, @Body() updateUser: createDto) {
    const updateIndex = User.findIndex((user) => user.id === +id);
    if (!updateIndex) {
      return;
    }
    User[updateIndex] = updateUser;
  }

  @Post('product')
  addProduct(@Body() product: Create_product_dto) {
    Product.push(product);
    console.log(product);
    return 'Success !';
  }

  @Put('/Update/:id')
  editProduct(
    @Param('id') id: number,
    @Body() editProduct: Create_product_dto,
  ) {
    const UpdateProduct = Product.findIndex((edit) => edit.id === +id);
    if (!UpdateProduct) {
      return;
    }

    Product[UpdateProduct] = editProduct;
  }

  @Get()
  showProduct() {
    return Product;
  }

  @Get('/Search/:id')
  Search(@Param('id') id: number) {
    const result = Product.find((pr) => pr.id == +id);
    console.log(result);
    return 'Search Success';
  }
}
