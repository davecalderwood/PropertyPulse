'use client'
import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import getUnreadMessageCount from "@/app/actions/get-unread-message-count";

const MessageContext = createContext();

export function MessageProvider({ children }) {
    const [unreadCount, setUnreadCount] = useState(0);

    const { data: session } = useSession();

    useEffect(() => {
        if (session && session.user) {
            getUnreadMessageCount().then((res) => {
                if (res.count) setUnreadCount(res.count);
            })
        }
    }, [getUnreadMessageCount, session])

    return (
        <MessageContext.Provider
            value={{
                unreadCount,
                setUnreadCount
            }}>
            {children}
        </MessageContext.Provider>
    )
}

export function useMessageContext() {
    return useContext(MessageContext);
}