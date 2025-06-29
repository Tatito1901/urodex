"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  memo,
} from "react";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from 'rehype-sanitize';

// URL de la API de Chat, obtenida de las variables de entorno con un fallback.
const CHAT_API_URL =
  process.env.NEXT_PUBLIC_CHAT_API_URL?.trim() || "/api/chat";

// Definición de la interfaz para la estructura de un mensaje.
interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

// =================================================================
// Componente Memoizado para Mensajes Individuales
// Usamos memo para evitar re-renderizados innecesarios de mensajes
// que no han cambiado, optimizando el rendimiento de la lista.
// =================================================================
const MessageItem = memo(({ message }: { message: Message }) => {
  return (
    <div
      className={`flex mb-4 ${
        message.isUser ? "justify-end" : "justify-start"
      }`}
    >
      {/* Avatar para mensajes del bot */}
      {!message.isUser && (
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex-shrink-0 flex items-center justify-center mr-2 shadow-md">
          <span className="text-white text-xs font-bold">U</span>
        </div>
      )}

      <div
        className={`p-3 md:p-4 rounded-2xl shadow-md transition-transform duration-200 
          // --- MEJORA DE RESPONSIVIDAD ---
          // Usamos un ancho máximo basado en porcentaje para móviles y fijo para pantallas más grandes.
          // Esto hace que las burbujas se sientan más naturales en cualquier ancho de pantalla.
          max-w-[85%] sm:max-w-md lg:max-w-lg 
          ${
            message.isUser
              ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-tr-none"
              : "bg-white border border-gray-100 rounded-tl-none shadow-sm hover:shadow-lg"
          }`}
      >
        {/* Contenido del mensaje: texto plano para usuario, Markdown para el bot */}
        {message.isUser ? (
          <div className="text-white font-medium break-words">{message.text}</div>
        ) : (
          <div className="prose prose-sm max-w-none prose-p:text-gray-700 prose-p:mb-2 prose-headings:text-gray-800 prose-strong:text-gray-900 prose-a:text-teal-600 hover:prose-a:text-teal-800">
             {/* Usamos ReactMarkdown para renderizar de forma segura la respuesta del bot */}
            <ReactMarkdown
              rehypePlugins={[rehypeSanitize]}
              components={{
                h1: ({node, ...props}) => <h1 {...props} className="text-xl font-bold my-3" />,
                h2: ({node, ...props}) => <h2 {...props} className="text-lg font-bold my-2" />,
                a: ({ node, ...props }) => (
                  <a
                    {...props}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="underline font-medium transition-colors"
                  />
                ),
                ul: ({ node, ...props }) => (
                  <ul {...props} className="list-disc ml-4 my-3 space-y-1" />
                ),
                ol: ({ node, ...props }) => (
                  <ol {...props} className="list-decimal ml-4 my-3 space-y-1" />
                ),
                code: ({ node, ...props }) => {
                  const isInline = !/\n/.test(props.children as string);
                  return isInline ? (
                    <code {...props} className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-teal-800" />
                  ) : (
                    <pre {...props} className="bg-gray-100 p-3 rounded-lg my-3 overflow-x-auto font-mono text-sm border" />
                  );
                }
              }}
            >
              {message.text}
            </ReactMarkdown>
          </div>
        )}
        <p
          className={`text-xs mt-2 text-right font-medium ${
            message.isUser ? "text-teal-100/80" : "text-gray-400"
          }`}
        >
          {message.timestamp}
        </p>
      </div>

      {/* Avatar para mensajes del usuario */}
      {message.isUser && (
        <div className="h-8 w-8 rounded-full bg-teal-700 flex-shrink-0 flex items-center justify-center ml-2 shadow-md">
          <span className="text-white text-xs font-bold">Tú</span>
        </div>
      )}
    </div>
  );
});
MessageItem.displayName = 'MessageItem';


// =================================================================
// Componente Principal del Chatbot
// =================================================================
export default function Urobot({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (value: boolean) => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const abortCtrl = useRef<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Efecto para cargar y guardar mensajes en sessionStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedMessages = sessionStorage.getItem('urobotMessages');
        if (savedMessages) {
          setMessages(JSON.parse(savedMessages));
        } else {
          // Mensaje inicial si no hay historial
          setMessages([
            {
              id: crypto.randomUUID(),
              text: "¡Hola! Soy UROBOT, tu asistente urológico especializado. ¿En qué puedo ayudarte hoy?",
              isUser: false,
              timestamp: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
            },
          ]);
        }
      } catch (error) {
        console.error("Failed to parse messages from sessionStorage", error);
        // Fallback to initial message if parsing fails
        setMessages([
            {
              id: crypto.randomUUID(),
              text: "¡Hola! Soy UROBOT, tu asistente urológico especializado. ¿En qué puedo ayudarte hoy?",
              isUser: false,
              timestamp: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
            },
          ]);
      }
    }
  }, []); // Se ejecuta solo una vez al montar el componente

  useEffect(() => {
    if (typeof window !== 'undefined' && messages.length > 0) {
      sessionStorage.setItem('urobotMessages', JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll al final de los mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Limpieza del AbortController al desmontar
  useEffect(() => {
    return () => abortCtrl.current?.abort();
  }, []);

  const handleClose = useCallback(() => {
     if (typeof window !== 'undefined') {
        sessionStorage.removeItem('urobotMessages');
      }
      setMessages([]); // Limpia los mensajes del estado
      setIsOpen(false);
  }, [setIsOpen]);


  const sendMessage = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const text = input.trim();
      if (!text || isLoading) return;

      const userMsg: Message = {
        id: crypto.randomUUID(),
        text,
        isUser: true,
        timestamp: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
      };
      
      // Añadimos el mensaje de usuario
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsLoading(true);

      abortCtrl.current = new AbortController();
      
      const conversationHistory = [...messages, userMsg].map(msg => ({
        role: msg.isUser ? 'user' : 'assistant', 
        text: msg.text
      }));

      try {
        const res = await fetch(CHAT_API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text, history: conversationHistory }),
          signal: abortCtrl.current.signal,
        });

        if (!res.ok) throw new Error(`Error en la API: ${res.status}`);

        const data = await res.json();
        const botMsg: Message = {
          id: crypto.randomUUID(),
          text: data.text || "No se recibió una respuesta.",
          isUser: false,
          timestamp: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
        };
        
        setMessages((prev) => [...prev, botMsg]);

      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Error enviando mensaje:", err);
          const errorMsg: Message = {
            id: crypto.randomUUID(),
            text: "Lo siento, algo salió mal. Por favor, intenta de nuevo.",
            isUser: false,
            timestamp: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
          };
          setMessages((prev) => [...prev, errorMsg]);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [input, isLoading, messages] 
  );

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="group bg-gradient-to-r from-teal-500 to-teal-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:from-teal-600 hover:to-teal-700 flex items-center space-x-3 transition-all duration-300 transform hover:scale-105"
        >
           <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
           </svg>
          <span className="hidden sm:inline font-semibold pr-2">UROBOT</span>
           <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-white"></span>
          </span>
        </button>
      </div>
    );
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity flex items-center justify-center p-0 sm:p-4"
        onClick={handleClose}
      >
        <div
          className="bg-gray-50 w-full h-full flex flex-col z-50 overflow-hidden 
                     sm:max-w-lg sm:h-[85vh] sm:max-h-[700px] sm:rounded-2xl 
                     shadow-2xl transform transition-all duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header del Chat */}
          <div className="bg-gradient-to-r from-teal-500 to-teal-700 text-white p-4 flex justify-between items-center shadow-lg flex-shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center shadow-inner">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold tracking-tight">UROBOT</h2>
                <p className="text-xs sm:text-sm opacity-85 font-medium">Asistente Urológico</p>
              </div>
            </div>
            <button onClick={handleClose} className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-full transition-all" aria-label="Cerrar chat">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Área de Mensajes */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto custom-scrollbar">
            {messages.map((msg) => (
              <MessageItem key={msg.id} message={msg} />
            ))}
            {isLoading && messages[messages.length - 1]?.isUser && (
              <div className="flex mb-4 justify-start items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-400 to-teal-500 flex-shrink-0 animate-pulse mr-2" />
                <div className="bg-white p-3 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse-fast"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse-medium"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse-slow"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Formulario de Envío */}
          <form onSubmit={sendMessage} className="p-3 sm:p-4 border-t border-gray-200 bg-white/80 backdrop-blur-sm flex-shrink-0">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                placeholder={isLoading ? "Generando respuesta..." : "Escribe tu pregunta..."}
                className="w-full py-3 px-4 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 shadow-sm disabled:opacity-70"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-3 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-300 shadow-md transform hover:scale-105 disabled:bg-gray-300 disabled:from-gray-300 disabled:scale-100 disabled:shadow-none"
                title="Enviar mensaje"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Estilos para el scrollbar y animaciones de tipeo */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #9ca3af; border-radius: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #14b8a6; }
        .animate-pulse-fast { animation-delay: 0s; animation: pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .animate-pulse-medium { animation-delay: 0.2s; animation: pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .animate-pulse-slow { animation-delay: 0.4s; animation: pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
      `}</style>
    </>
  );
}
