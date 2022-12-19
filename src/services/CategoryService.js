import { Category } from '../models/Category.js';
import { Product } from '../models/Product.js';

export const createCategory = async (name, description) => {
    try {
        const model = await Category.findOne(
            {
                where: {
                    name: name
                }
            }
        )
        if (model) {
            return {
                status: 400,
                message: 'Category already exists'
            }
        }
        const category = await Category.create({
            name: name,
            description: description
        })
        return {
            status: 200,
            message: 'Category created',
            data: category
        }
    } catch (error) {
        return {
            status: 500,
            message: 'Internal server error',
            error: error
        }
    }
}

export const findCategoryAll = async () => {
    try {
        const categories = await Category.findAll()
        if (!categories) {
            return {
                status: 404,
                message: 'Categories not found'
            }
        }
        return {
            status: 200,
            message: 'Categories found',
            data: categories
        }
    } catch (error) {
        return {
            status: 500,
            message: 'Internal server error',
            error: error
        }
    }
}

export const findCategoryById = async (id) => {
    try {
        const category = await Category.findOne(
            {
                where: {
                    id: id
                }
            }
        )
        if (!category) {
            return {
                status: 404,
                message: 'Category not found'
            }
        }
        return {
            status: 200,
            message: 'Category found',
            data: category
        }
    } catch (error) {
        return {
            status: 500,
            message: 'Internal server error',
            error: error
        }
    }
}

export const updateCategory = async (id, name, description) => {
    try {
        const category = await Category.findOne(
            {
                where: {
                    id: id
                }
            }
        )
        if (!category) {
            return {
                status: 404,
                message: 'Category not found'
            }
        }
        if (category.name !== name) {
            const model = await Category.findOne(
                {
                    where: {
                        name: name
                    }
                }
            )
            if (model) {
                return {
                    status: 400,
                    message: 'Category already exists'
                }
            }
        }
        category.name = name
        category.description = description
        await category.save()
        return {
            status: 200,
            message: 'Category updated',
            data: category
        }
    } catch (error) {
        return {
            status: 500,
            message: 'Internal server error',
            error: error
        }
    }
}

export const deleteCategory = async (id) => {
    try {
        const category = await Category.findOne(
            {
                where: {
                    id: id
                }
            }
        )
        if (!category) {
            return {
                status: 404,
                message: 'Category not found'
            }
        }
        const products = await Product.findAll(
            {
                where: {
                    category_id: id
                }
            }
        )
        if (products.length > 0) {
            return {
                status: 400,
                message: 'Category has products associated'
            }
        }
        await category.destroy()
        return {
            status: 200,
            message: 'Category deleted'
        }
    } catch (error) {
        return {
            status: 500,
            message: 'Internal server error',
            error: error
        }
    }
}

