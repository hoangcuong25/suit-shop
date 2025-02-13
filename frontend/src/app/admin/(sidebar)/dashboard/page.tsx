import { FaUsers } from "react-icons/fa";
import { GiPerfumeBottle } from "react-icons/gi";
import { FaBox } from "react-icons/fa";
import { FaMoneyBill } from "react-icons/fa";

const Dashboard = () => {

    // const { users, products, orders, formatMoney } = useContext(AppContext)

    // const totalRevenue = (): number => {
    //     let revenue = 0

    //     orders.map((i: any) => {
    //         revenue += i.price
    //     })

    //     return revenue
    // }

    return (
        <div className='m-5'>
            <div className='flex flex-wrap gap-3'>
                <div className='flex items-center gap-3.5 bg-gray-100 p-4 min-w-52 rounded shadow-md cursor-pointer hover:-translate-y-2 transition-all duration-300'>
                    <FaUsers className='text-3xl text-gray-800' />
                    <div>
                        <p className='text-xl font-medium text-gray-600'>
                            {/* {users.length} */}
                            123
                        </p>
                        <p className='text-gray-500'>Member</p>
                    </div>
                </div>

                <div className='flex items-center gap-3.5 bg-gray-100 p-4 min-w-52 rounded shadow-md cursor-pointer hover:-translate-y-2 transition-all duration-300'>
                    <GiPerfumeBottle className='text-3xl text-gray-800' />
                    <div>
                        <p className='text-xl font-medium text-gray-600'>
                            {/* {products.length} */} 123
                        </p>
                        <p className='text-gray-500'>Product</p>
                    </div>
                </div>

                <div className='flex items-center gap-3.5 bg-gray-100 p-4 min-w-52 rounded shadow-md cursor-pointer hover:-translate-y-2 transition-all duration-300'>
                    <FaBox className='text-3xl text-gray-800' />
                    <div>
                        <p className='text-xl font-medium text-gray-600'>
                            {/* {orders.length} */} 123
                        </p>
                        <p className='text-gray-500'>Orders</p>
                    </div>
                </div>

                <div className='flex items-center gap-3.5 bg-gray-100 p-4 min-w-52 rounded shadow-md cursor-pointer hover:-translate-y-2 transition-all duration-300'>
                    <FaMoneyBill className='text-3xl text-gray-800' />
                    <div>
                        <p className='text-xl font-medium text-gray-600'>
                            {/* {formatMoney(totalRevenue())} */}
                            123 vnđ</p>
                        <p className='text-gray-500'>Revenue</p>
                    </div>
                </div>

            </div>

            <div className='bg-white'>
                <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t bg-gray-100 shadow-md'>
                    <p className='font-bold text-xl'>Recent Orders</p>
                </div>

            </div>
        </div>
    )
}

export default Dashboard