'use client'

import { Button } from "@/components/ui/button";
import { AdminContext } from "@/context/AdminContext";
import { useContext, useEffect, useState } from "react";
import { BiSolidSend } from "react-icons/bi";
import { MdMessage } from "react-icons/md";
import io, { Socket } from "socket.io-client"

const socket: Socket = io(process.env.NEXT_PUBLIC_BACKEND_URL)

interface Message {
    userId: string,
    userName: string;
    role: string;
    message: string;
}

const Page = () => {

    const { users } = useContext(AdminContext)

    const [userId, setUserId] = useState<string>("")

    // Messages States
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([])

    // Send Message
    const sendMessage = () => {
        if (message.trim() === "") return;

        socket.emit(
            "sendMessage",
            {
                userId: userId, // roomId
                userName: 'Admin',
                role: 'Admin',
                message: message,
            }
        )
        setMessage("")
    }

    useEffect(() => {
        socket.on("loadMessages", (dbMessages: Message[]) => {
            setMessages(dbMessages);
        });

        return () => {
            socket.off("loadMessages");
        };
    }, []);

    useEffect(() => {
        const receiveMessageHandler = (data: Message) => {
            setMessages((prev) => [...prev, data]);
        };

        socket.on("receiveMessage", receiveMessageHandler);

        return () => {
            socket.off("receiveMessage", receiveMessageHandler);
        };
    }, []);

    useEffect(() => {
        socket.emit("join_room", userId);
    }, [userId])

    return (
        <div className='m-5'>
            <div className='flex flex-col w-96 gap-3'>
                <div className='flex items-center gap-5 bg-gray-100 p-4 min-w-52 rounded shadow-md cursor-pointer hover:-translate-y-2 transition-all duration-300'>
                    <div className='text-xl font-bold '>Messages</div>
                    <MdMessage className='text-3xl text-gray-800' />
                </div>

                <div className='flex flex-col gap-3'>
                    <div className='flex items-center gap-5 border border-gray-300 bg-gray-100 p-4 min-w-52 rounded shadow-md over'>
                        <div>
                            <p className='font-semibold text-lg sm:text-2xl cursor-pointer'>Users</p>

                            <div className='mt-3 bg-white rounded-sm p-2 w-full h-[380px] overflow-y-auto'>
                                {users.map((user) => (
                                    <div key={user._id} className='flex items-center justify-between gap-3 my-2 p-2 border border-gray-300 rounded-sm w-60'>
                                        <p className='text-gray-800 text-sm cursor-pointer'>{`${user?.lastName} ${user?.firstName}`}</p>
                                        <Button
                                            className={`${userId === user._id ? 'bg-[#0e141a] text-white' : ''}`}
                                            onClick={() => setUserId(user._id)}
                                        >
                                            Texting
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>


                    <div className='flex items-center gap-5 border border-gray-300 bg-gray-100 p-4 min-w-52 rounded shadow-md '>
                        <div>
                            <p className='font-semibold text-lg sm:text-2xl cursor-pointer'>SUIT <span className='font-normal'>SHOP</span></p>

                            <div className='mt-3 bg-white rounded-sm p-2 w-full h-[380px] overflow-y-auto'>
                                <p className='text-gray-800 text-sm'>Admin: Hello, how can I help you?</p>
                                {
                                    messages.length > 0 ? (
                                        messages.map((message, index) => (
                                            <div key={index} className={`p-2 rounded-md mt-2 ${message.role === 'Admin' ? 'bg-gray-200 text-left' : 'bg-blue-200 text-right'}`}>
                                                {
                                                    message.role === 'Admin'
                                                        ? <p className=' text-sm'><strong>{message.userName}:</strong> {message.message}</p>
                                                        : <p className="text-gray-800 text-sm">{message.message}<strong> :{message.userName}</strong></p>
                                                }
                                            </div>
                                        ))
                                    ) : (
                                        <p className='text-center mt-10'>Don&apos;t have any messages</p>
                                    )
                                }
                            </div>

                            <div className='flex gap-2 items-center mt-5'>
                                <input
                                    placeholder="Message..."
                                    type="text"
                                    className='py-2 px-2 w-full rounded-md focus:outline-none border border-gray-300'
                                    onChange={(event) => { setMessage(event.target.value) }}
                                />
                                <button
                                    className='bg-white p-3 rounded-md border border-gray-300'
                                    onClick={sendMessage}
                                >
                                    <BiSolidSend />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page