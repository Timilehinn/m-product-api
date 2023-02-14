import { Request, Response } from 'express';
export declare const addProduct: (req: Request, res: Response) => Promise<void>;
export declare const deleteProduct: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const fetchProductsByPage: (req: Request, res: Response) => Promise<void>;
export declare const fetchAllProducts: (req: Request, res: Response) => Promise<void>;
export declare const fetchProduct: (req: Request, res: Response) => Promise<void>;
export declare const updateProduct: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
