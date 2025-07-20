/* eslint-disable react-hooks/exhaustive-deps */
import { getDatabase, onValue, ref, remove, set } from 'firebase/database';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { firebase } from '@/common/libs/firebase';
import { MessageProps } from '@/common/types/chat';

import ChatAuth from './ChatAuth';
import ChatInput from './ChatInput';
import ChatList from './ChatList';

const Chat = ({ isWidget = false }: { isWidget?: boolean }) => {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<MessageProps[]>([]);
  
  // All hooks must be called at the top level
  const database = firebase ? getDatabase(firebase) : null;
  const databaseChat = process.env.NEXT_PUBLIC_FIREBASE_CHAT_DB || 'chat';

  const handleSendMessage = (message: string) => {
    if (!firebase || !database) return;
    
    const messageId = uuidv4();
    const messageRef = ref(database, `${databaseChat}/${messageId}`);

    set(messageRef, {
      id: messageId,
      name: session?.user?.name,
      email: session?.user?.email,
      image: session?.user?.image,
      message,
      created_at: new Date().toISOString(),
      is_show: true,
    });
  };

  const handleDeleteMessage = (id: string) => {
    if (!firebase || !database) return;
    
    const messageRef = ref(database, `${databaseChat}/${id}`);

    if (messageRef) {
      remove(messageRef);
    }
  };

  useEffect(() => {
    if (!firebase || !database) return;
    
    const messagesRef = ref(database, databaseChat);
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const messagesData = snapshot.val();
      if (messagesData) {
        const messagesArray = Object.values(messagesData) as MessageProps[];
        const sortedMessage = messagesArray.sort((a, b) => {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);
          return dateA.getTime() - dateB.getTime();
        });
        setMessages(sortedMessage);
      }
    });

    return () => unsubscribe();
  }, [database, databaseChat]);

  // Check if Firebase is initialized after all hooks
  if (!firebase) {
    return (
      <div className="text-center p-4">
        <p>Chat feature is currently unavailable. Please check Firebase configuration.</p>
      </div>
    );
  }

  return (
    <>
      <ChatList
        isWidget={isWidget}
        messages={messages}
        onDeleteMessage={handleDeleteMessage}
      />
      {session ? (
        <ChatInput onSendMessage={handleSendMessage} isWidget={isWidget} />
      ) : (
        <ChatAuth isWidget={isWidget} />
      )}
    </>
  );
};

export default Chat;
