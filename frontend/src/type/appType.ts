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
    cart: any[]
    wishlist: any[]
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
};
