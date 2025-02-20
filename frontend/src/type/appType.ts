/* eslint-disable @typescript-eslint/no-explicit-any */

export type UserData = {
    _id: string
    firstName: string
    lastName: string
    email: string
    phone: string
    password: string
    dob: string
    image: string | null
    address: string
    gender: string
    cart: CartData[]
    wishlist: any[]
    points: number
}

export type ProductData = {
    _id: string;
    name: string;
    type: string;
    oldPrice: number;
    newPrice: number;
    image1: string;
    image2: string;
    comments: any[];
    interesting: boolean;
    rate: any[]
}

export type CartData = {
    product: ProductData
    amount: any[]
}

export type OrderData = {
    _id: string
    userId: string
    status: string
    productList: []
    date: string
    price: number
    optionShip: string
    optionPayment: string
}

export type CouponData = {
    _id: string
    code: string
    discount: number
    isActive: boolean
    userId: string
}
