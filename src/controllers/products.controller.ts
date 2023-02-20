require('dotenv').config()
import { isEmpty, isFinite } from 'lodash'
import { isFloat } from 'lodash-contrib'
import { Request, Response, NextFunction } from 'express';
import ProductModel from "../schemas/product.model";
import { GenerateProductCode } from "../helpers";
import { ProductI } from '../interface';

export const addProduct = async (req: Request, res: Response) => {
    try {
        const { name, price, description } = req.body;
        const validateFields = () => {
            let valid = { state: true, error: ''};
            if (isEmpty(name) || name.length < 3){
                valid.state = false;
                valid.error = 'Name cannot be less than 3 characters';                
            }else if(isEmpty(description) || description.length < 3){
                valid.state = false;
                valid.error = 'Description cannot be less than 3 characters';
            }else if(!isFinite(price) || price < 100) {
              valid.state = false;
              valid.error = 'Price must be of type Number and not less than 500';
            }
            return valid
          };
        let validation = validateFields()
        if(validation.state){
            await ProductModel.create({ ...req.body, productCode: GenerateProductCode() })
            res.json({ message: 'Product added successfully', status: 200 }).status(200)
        }else{
            res.json({ message: 'Something went wrong, please try again', error: validation.error, status: 400 }).status(400)
        }
    } catch (err) {
        res.json({ message: err.message, status: 500 }).status(500)
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { code } = req.params
        const exists = await ProductModel.exists({ productCode: code });
        if(isEmpty(code)){
            return res.json({ message: 'Product code is required to perform this action', status: 400 }).status(400)
        }else if(!exists){
            return res.json({ message: 'Product with code does not exist', status: 400 }).status(400)
        }
        await ProductModel.deleteOne({ productCode: code })
        res.json({ message: 'Product deleted successfully', status: 201 }).status(201)
    } catch (err) {
        res.json({ message: err.message, status: 500 }).status(500)
    }
}

export const fetchProductsByPage = async (req: Request, res: Response) => {
    try {
        const { page } = req.params

        console.log(parseInt(page.toString()), ' ---page number')
        const validateFields = () => {
            let valid = true;
            if(isEmpty(page) || isFloat(page.toString()) || parseInt(page.toString()) < 1){
                valid = false
            }
            return valid
        }
        // when the page param is not a valid number, it returns the first page as default
        if(!validateFields()){
           let first_page = await ProductModel.find().skip(0).limit(10)
           res.json({ data: { products: first_page, info: { prev: null, page: 1, next: 2, items: first_page.length } }, message: 'Page must be of type Number and not less than 1', status: 200 }).status(200)
        }else{
            var limit = 5
            var item_count = parseInt(page.toString()) * limit
            var offset = item_count == 0? limit : item_count - limit
            var prev = parseInt(page.toString()) <= 1? null : parseInt(page.toString()) - 1
            let current_page = await ProductModel.find().skip(offset).limit(limit)
            var next = current_page.length < limit? null : parseInt(page.toString()) + 1

            res.json({ data: { products: current_page, info: { prev, page, next, items: current_page.length } }, message: 'successful', status: 200 }).status(200)
        }
    } catch (err) {
        console.log(err.message)
        res.json({ message: err.message, status: 500 }).status(500)
    }
}


export const fetchAllProducts = async (req: Request, res: Response) => {
    try {
           const products = await ProductModel.find()
           res.json({ products, info: { items: products.length }, status: 200 }).status(200)
    } catch (err) {
        console.log(err.message)
        res.json({ message: err.message, status: 500 }).status(500)
    }
}

export const fetchProduct = async (req: Request, res: Response) => {
    try {
        const { code } = req.params;
           const products = await ProductModel.findOne({ productCode: code })
           res.json({ products, status: 200 }).status(200)
    } catch (err) {
        console.log(err.message)
        res.json({ message: err.message, status: 500 }).status(500)
    }
}


export const updateProduct = async (req: Request, res: Response) => {
    try {
        // const { description, price, quantity, name, imgUrl } = req.body;
        const { code } = req.params
        const { rating, productCode, _id, __v, ...properties } = req.body;
        const exists = await ProductModel.exists({ productCode: code });

        if(isEmpty(code)){
            return res.json({ message: 'Product code is required to perform this action', status: 400 }).status(400)
        }else if(!exists){
            return res.json({ message: 'Product with code does not exist', status: 400 }).status(400)
        }

        const validateFields = () => {
            let valid = { state: true, error: ''};
            if (!isEmpty(properties.name) && properties.name.length < 3){
                valid.state = false;
                valid.error = 'Name cannot be less than 3 characters';                
            }else if(!isEmpty(properties.description) && properties.description.length < 3){
                valid.state = false;
                valid.error = 'Description cannot be less than 3 characters';
            }else if(!isEmpty(properties.price) && !isFinite(properties.price) || properties.price < 500) {
              valid.state = false;
              valid.error = 'Price must be of type Number and not less than 500';
            }else if(!isEmpty(properties.quantity) && !isFinite(properties.quantity)) {
                valid.state = false;
                valid.error = 'Price must be of type Number and not less than 500';
            }
            return valid
        };
        let validation = validateFields()
        console.log(validation, ' ---- valid field')
        console.log(req.body)
        console.log(properties, ' ---new')
        if(validation.state){
            await ProductModel.updateOne({ productCode: code }, { ...properties });
            res.json({ message: 'Product details updated successfully', status: 200, code }).status(200)
        }else{
            res.json({ message: 'Product update failed', error: validation.error, status: 400, code }).status(400)
        }
        
    } catch (err) {
        res.json({ message: err.message, status: 500 }).status(500)
    }
}

