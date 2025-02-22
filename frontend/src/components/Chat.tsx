'use client'

import io, { Socket } from "socket.io-client"
import { useContext, useEffect, useState } from "react";
import { BiMessageDetail } from "react-icons/bi";
import { CiCircleRemove } from "react-icons/ci";
import { BiSolidSend } from "react-icons/bi";
import { AppContext } from "@/context/AppContext";

const socket: Socket = io(process.env.NEXT_PUBLIC_BACKEND_URL, {
    transports: ["websocket"],
    withCredentials: true
})

interface Message {
    userId: string,
    userName: string;
    role: string;
    message: string;
}

const Chat = () => {

    const { userData } = useContext(AppContext)

    const [isShow, setIsShow] = useState(false)

    // Messages States
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);

    const [unreadCount, setUnreadCount] = useState(0);

    // Send Message
    const sendMessage = () => {
        if (message.trim() === "") return;

        socket.emit(
            "sendMessage",
            {
                userId: userData && userData?._id,
                userName: userData && `${userData?.lastName} ${userData?.firstName}`,
                role: 'user',
                message: message,
            }
        )
        setMessage("")
    }

    useEffect(() => {
        const loadMessagesHandler = (dbMessages: Message[]) => {
            setMessages(dbMessages);
        };

        socket.on("loadMessages", loadMessagesHandler);

        return () => {
            socket.off("loadMessages", loadMessagesHandler);
        }
    }, [])

    useEffect(() => {
        const receiveMessageHandler = (data: Message) => {
            setMessages((prev) => [...prev, data])
        }

        socket.on("receiveMessage", receiveMessageHandler);

        return () => {
            socket.off("receiveMessage", receiveMessageHandler);
        }
    }, [])

    useEffect(() => {
        socket.on("newNotification", () => {
            setUnreadCount((prev) => prev + 1);
        });

        return () => {
            socket.off("newNotification");
        };
    }, []);

    useEffect(() => {
        if (userData && userData?._id) {
            socket.emit("join_room", userData._id);
        }
    }, [userData])

    return (
        <div>
            <div
                className="fixed bottom-10 right-5 bg-gray-200 shadow-md hover:shadow-lg rounded-full p-1 text-3xl text-red-500 hover:text-red-900 cursor-pointer"
                onClick={() => {
                    setIsShow(!isShow);
                    setUnreadCount(0);
                }}
            >
                {isShow ? <CiCircleRemove /> : <BiMessageDetail />}
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2">
                        {unreadCount}
                    </span>
                )}
            </div>

            <div
                className={`fixed bottom-24 right-5 w-80 h-[550px] rounded-md p-3 shadow-lg ${isShow ? 'block' : 'hidden'}`}
                style={{ background: 'linear-gradient(to bottom, #1F1F1F, #595959)' }}
            >
                <p className='text-white font-semibold text-lg sm:text-2xl cursor-pointer'>SUIT <span className='font-normal'>SHOP</span></p>
                <p className='text-white mt-1'>We will be back soon</p>

                <div className='mt-3 bg-white rounded-sm p-2 w-full h-[380px] overflow-y-auto'>
                    <p className='text-gray-800 text-sm'>Admin: Hello, how can I help you?</p>
                    {messages.map((message, index) => (
                        <div key={index} className={`p-2 rounded-md mt-2 ${message.role === 'Admin' ? 'bg-gray-200 text-left' : 'bg-blue-200 text-right'}`}>
                            {
                                message.role === 'Admin'
                                    ? <p className=' text-sm'><strong>{message.userName}:</strong> {message.message}</p>
                                    : <p className="text-gray-800 text-sm">{message.message}<strong> :{message.userName}</strong></p>
                            }
                        </div>
                    ))}
                </div>

                <div className='flex gap-2 items-center mt-5'>
                    <input
                        placeholder="Message..."
                        type="text"
                        className='py-2 px-2 w-full rounded-md focus:outline-none'
                        onChange={(event) => { setMessage(event.target.value) }}
                    />
                    <button
                        className={`bg-white p-3 rounded-md `}
                        onClick={sendMessage}
                    >
                        <BiSolidSend />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Chat