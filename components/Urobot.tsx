
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  memo,
  useMemo,
} from "react";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from 'rehype-sanitize';

// URL de la API
const CHAT_API_URL = process.env.NEXT_PUBLIC_CHAT_API_URL?.trim() || "/api/chat";

// --- TIPOS E INTERFACES ---
interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
  status?: 'sending' | 'sent' | 'error';
  isTyping?: boolean;
}

interface QuickAction {
  id: string;
  text: string;
  icon: string;
}

// --- DATOS ---
const quickActions: QuickAction[] = [
  { id: '1', text: '¿Qué síntomas son urgentes?', icon: '🚨' },
  { id: '2', text: 'Consejos de prevención', icon: '🛡️' },
  { id: '3', text: 'Agendar una cita', icon: '📅' },
  { id: '4', text: 'Información sobre tratamientos', icon: '💊' },
];

// --- HOOKS PERSONALIZADOS ---
const useAutoScroll = (dependency: any[]) => {
  const endRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 100);
    return () => clearTimeout(timer);
  }, dependency);
  
  return endRef;
};

const useTypingAnimation = (text: string, isTyping: boolean, speed: number = 10) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    if (!isTyping) {
      setDisplayedText(text);
      return;
    }
    
    let i = 0;
    setDisplayedText('');
    
    // Optimización: incremento adaptativo basado en la longitud del texto
    // Para textos más largos, aumentamos la velocidad de tipeo
    const chunkSize = text.length > 200 ? 4 : (text.length > 100 ? 2 : 1);
    const adjustedSpeed = text.length > 300 ? speed / 2 : speed;
    
    const timer = setInterval(() => {
      if (i < text.length) {
        // Incremento adaptativo para mayor velocidad
        i = Math.min(i + chunkSize, text.length);
        setDisplayedText(text.slice(0, i));
      } else {
        clearInterval(timer);
      }
    }, adjustedSpeed);
    
    return () => clearInterval(timer);
  }, [text, isTyping, speed]);
  
  return displayedText;
};

// --- COMPONENTES ---

// Componente de Avatar Mejorado
const Avatar = memo(({ isUser, isTyping }: { isUser: boolean; isTyping?: boolean }) => {
  const content = isUser ? (
    <span className="text-white text-xs font-bold">Tú</span>
  ) : (
    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );

  return (
    <div className={`
      h-10 w-10 rounded-full flex-shrink-0 flex items-center justify-center shadow-lg
      ${isUser 
        ? 'bg-gradient-to-br from-teal-600 to-teal-700' 
        : 'bg-gradient-to-br from-teal-400 to-teal-600'
      }
      ${isTyping ? 'animate-pulse' : ''}
      transition-all duration-300 hover:scale-105
    `}>
      {content}
    </div>
  );
});
Avatar.displayName = 'Avatar';

// Componente de Indicador de Estado
const MessageStatus = memo(({ status }: { status?: Message['status'] }) => {
  if (!status || status === 'sent') return null;
  
  return (
    <span className="ml-2 text-xs">
      {status === 'sending' && '⏳'}
      {status === 'error' && '❌'}
    </span>
  );
});
MessageStatus.displayName = 'MessageStatus';

// Componente de Mensaje Individual Mejorado
const MessageItem = memo(({ 
  message, 
  onRetry 
}: { 
  message: Message; 
  onRetry?: (message: Message) => void;
}) => {
  const displayedText = useTypingAnimation(message.text, message.isTyping || false);
  const [copied, setCopied] = useState(false);
  
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [message.text]);

  return (
    <div
      className={`flex mb-6 ${
        message.isUser ? "justify-end" : "justify-start"
      } animate-fadeIn`}
    >
      {!message.isUser && <Avatar isUser={false} isTyping={message.isTyping} />}
      
      <div className={`mx-3 relative group max-w-[85%] sm:max-w-md lg:max-w-lg`}>
        <div
          className={`
            p-4 rounded-2xl shadow-lg transition-all duration-300
            ${message.isUser
              ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-tr-sm"
              : "bg-white/95 backdrop-blur-sm border border-gray-100 rounded-tl-sm hover:shadow-xl"
            }
            ${message.status === 'error' ? 'border-red-300 bg-red-50' : ''}
          `}
        >
          {/* Contenido del mensaje */}
          {message.isUser ? (
            <div className="text-white font-medium break-words">
              {displayedText}
              <MessageStatus status={message.status} />
            </div>
          ) : (
            <div className="prose prose-sm max-w-none prose-p:text-gray-700 prose-headings:text-gray-800">
              {message.isTyping ? (
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">{displayedText}</span>
                  {displayedText.length < message.text.length && (
                    <span className="inline-flex space-x-1">
                      <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </span>
                  )}
                </div>
              ) : (
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
                        className="text-teal-600 hover:text-teal-700 underline font-medium transition-colors"
                      />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul {...props} className="list-disc ml-4 my-3 space-y-1" />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol {...props} className="list-decimal ml-4 my-3 space-y-1" />
                    ),
                    code: ({ node, inline, ...props }) => {
                      return inline ? (
                        <code {...props} className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-teal-700" />
                      ) : (
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg my-3 overflow-x-auto">
                          <code {...props} className="font-mono text-sm" />
                        </pre>
                      );
                    }
                  }}
                >
                  {displayedText}
                </ReactMarkdown>
              )}
            </div>
          )}
          
          {/* Timestamp y acciones */}
          <div className={`flex items-center justify-between mt-2 ${
            message.isUser ? "text-teal-100/80" : "text-gray-400"
          }`}>
            <p className="text-xs font-medium">
              {message.timestamp}
            </p>
            
            {/* Botones de acción */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
              {!message.isUser && (
                <button
                  onClick={handleCopy}
                  className="p-1 rounded hover:bg-gray-100 transition-colors"
                  title="Copiar mensaje"
                >
                  {copied ? (
                    <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
              )}
              
              {message.status === 'error' && onRetry && (
                <button
                  onClick={() => onRetry(message)}
                  className="p-1 rounded hover:bg-red-100 transition-colors"
                  title="Reintentar"
                >
                  <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Línea de conexión estilizada */}
        {!message.isUser && message.isTyping && (
          <div className="absolute -bottom-4 left-4 w-0.5 h-4 bg-gradient-to-b from-gray-200 to-transparent"></div>
        )}
      </div>
      
      {message.isUser && <Avatar isUser={true} />}
    </div>
  );
});
MessageItem.displayName = 'MessageItem';

// Componente de Indicador de Escritura
const TypingIndicator = memo(() => (
  <div className="flex mb-4 justify-start items-center animate-fadeIn">
    <Avatar isUser={false} isTyping={true} />
    <div className="ml-3 bg-white/95 backdrop-blur-sm p-4 rounded-2xl rounded-tl-sm border border-gray-100 shadow-sm">
      <div className="flex items-center space-x-2">
        <span className="block w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
        <span className="block w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
        <span className="block w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
      </div>
    </div>
  </div>
));
TypingIndicator.displayName = 'TypingIndicator';

// Componente de Acciones Rápidas
const QuickActions = memo(({ 
  onSelect, 
  disabled 
}: { 
  onSelect: (text: string) => void;
  disabled: boolean;
}) => (
  <div className="px-4 pb-2">
    <p className="text-xs text-gray-500 mb-2 font-medium">Preguntas frecuentes:</p>
    <div className="flex flex-wrap gap-2">
      {quickActions.map((action) => (
        <button
          key={action.id}
          onClick={() => onSelect(action.text)}
          disabled={disabled}
          className="flex items-center space-x-1 px-3 py-1.5 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full text-xs font-medium text-gray-700 hover:bg-teal-50 hover:border-teal-300 hover:text-teal-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
        >
          <span>{action.icon}</span>
          <span>{action.text}</span>
        </button>
      ))}
    </div>
  </div>
));
QuickActions.displayName = 'QuickActions';

// --- COMPONENTE PRINCIPAL ---
export default function Urobot({ 
  isOpen, 
  setIsOpen 
}: { 
  isOpen: boolean; 
  setIsOpen: (value: boolean) => void;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  
  const abortCtrl = useRef<AbortController | null>(null);
  const messagesEndRef = useAutoScroll([messages]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mensaje inicial
  const initialMessage: Message = useMemo(() => ({
    id: 'initial',
    text: "¡Hola! Soy UROBOT, tu asistente urológico especializado. Estoy aquí para ayudarte con información médica confiable y orientación sobre salud urológica. ¿En qué puedo asistirte hoy?",
    isUser: false,
    timestamp: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
  }), []);

  // Efecto para cargar mensajes del sessionStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedMessages = sessionStorage.getItem('urobotMessages');
        if (savedMessages) {
          const parsed = JSON.parse(savedMessages);
          setMessages(parsed);
          setShowQuickActions(parsed.length <= 1);
        } else {
          setMessages([initialMessage]);
        }
      } catch (error) {
        console.error("Error loading messages:", error);
        setMessages([initialMessage]);
      }
    }
  }, [initialMessage]);

  // Guardar mensajes en sessionStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && messages.length > 0) {
      sessionStorage.setItem('urobotMessages', JSON.stringify(messages));
    }
  }, [messages]);

  // Focus en input cuando se abre
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Limpieza del AbortController
  useEffect(() => {
    return () => abortCtrl.current?.abort();
  }, []);

  const handleClose = useCallback(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('urobotMessages');
    }
    setMessages([]);
    setIsOpen(false);
  }, [setIsOpen]);

  const handleRetry = useCallback((message: Message) => {
    const messageIndex = messages.findIndex(m => m.id === message.id);
    if (messageIndex > 0) {
      const userMessage = messages[messageIndex - 1];
      if (userMessage.isUser) {
        // Eliminar el mensaje de error y su mensaje de usuario asociado
        setMessages(prev => prev.filter((_, index) => index < messageIndex - 1));
        // Reenviar el mensaje
        sendMessage(userMessage.text);
      }
    }
  }, [messages]);

  const sendMessage = useCallback(
    async (text?: string, e?: React.FormEvent<HTMLFormElement>) => {
      if (e) {
        e.preventDefault();
      }
      
      const messageText = text || input.trim();
      if (!messageText || isLoading) return;

      const userMsg: Message = {
        id: crypto.randomUUID(),
        text: messageText,
        isUser: true,
        timestamp: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
        status: 'sending'
      };
      
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsLoading(true);
      setShowQuickActions(false);

      // Actualizar estado del mensaje a "enviado"
      setTimeout(() => {
        setMessages(prev => prev.map(m => 
          m.id === userMsg.id ? { ...m, status: 'sent' } : m
        ));
      }, 300);

      abortCtrl.current = new AbortController();
      
      const conversationHistory = [...messages, userMsg].map(msg => ({
        role: msg.isUser ? 'user' : 'assistant', 
        text: msg.text
      }));

      try {
        const res = await fetch(CHAT_API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: messageText, history: conversationHistory }),
          signal: abortCtrl.current.signal,
        });

        if (!res.ok) throw new Error(`API Error: ${res.status}`);

        const data = await res.json();
        const botMsg: Message = {
          id: crypto.randomUUID(),
          text: data.text || "No se recibió una respuesta válida.",
          isUser: false,
          timestamp: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
          isTyping: true
        };
        
        setMessages((prev) => [...prev, botMsg]);
        
        // Después de mostrar el texto completo, quitar el estado de typing con tiempo adaptativo
        const adaptiveTime = Math.min(data.text.length * 10, 2000) + 300; // máximo 2.3 segundos para textos largos
        setTimeout(() => {
          setMessages(prev => prev.map(m => 
            m.id === botMsg.id ? { ...m, isTyping: false } : m
          ));
        }, adaptiveTime);

      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Error sending message:", err);
          const errorMsg: Message = {
            id: crypto.randomUUID(),
            text: "Lo siento, hubo un problema al procesar tu mensaje. Por favor, intenta de nuevo.",
            isUser: false,
            timestamp: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
            status: 'error'
          };
          setMessages((prev) => [...prev, errorMsg]);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [input, isLoading, messages]
  );

  const handleQuickAction = useCallback((text: string) => {
    setInput(text);
    sendMessage(text);
  }, [sendMessage]);

  // Botón flotante cuando está cerrado
  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative bg-gradient-to-r from-teal-500 to-teal-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl hover:from-teal-600 hover:to-teal-700 flex items-center space-x-3 transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="hidden sm:inline font-bold pr-2 tracking-wide">UROBOT</span>
          
          {/* Indicador de estado */}
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-white shadow-sm"></span>
          </span>
          
          {/* Tooltip */}
          <span className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
            ¡Haz clic para chatear!
          </span>
        </button>
      </div>
    );
  }

  // Chat abierto
  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-300 flex items-center justify-center p-0 sm:p-4"
        onClick={handleClose}
      >
        <div
          className="bg-gradient-to-b from-gray-50 to-white w-full h-full flex flex-col z-50 overflow-hidden 
                     sm:max-w-lg sm:h-[90vh] sm:max-h-[800px] sm:rounded-2xl 
                     shadow-3xl transform transition-all duration-300 animate-slideUp"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header con mejor contraste y accesibilidad */}
          <div className="bg-gradient-to-r from-teal-600 via-teal-700 to-teal-800 text-white p-4 sm:p-5 flex justify-between items-center shadow-lg flex-shrink-0 border-b border-teal-900/30">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md border border-white/40 animate-glow">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-400 border-2 border-white shadow-[0_0_10px_rgba(74,222,128,0.5)]"></span>
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white drop-shadow-sm">UROBOT</h2>
                <p className="text-sm text-teal-100 font-medium">Asistente Urológico Online</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Botón de información */}
              <button className="p-2 rounded-full bg-teal-500/20 hover:bg-teal-500/40 transition-all duration-200" title="Información">
                <svg className="w-5 h-5 text-teal-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              
              {/* Botón de cerrar */}
              <button 
                onClick={handleClose} 
                className="p-2 rounded-full bg-teal-500/20 hover:bg-teal-500/40 transition-all duration-200 transform hover:rotate-90" 
                aria-label="Cerrar chat"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Área de mensajes con degradado sutil */}
          <div className="flex-1 overflow-hidden relative">
            <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-gray-50 to-transparent z-10 pointer-events-none"></div>
            <div className="h-full overflow-y-auto custom-scrollbar p-4 sm:p-6">
              {messages.map((msg) => (
                <MessageItem 
                  key={msg.id} 
                  message={msg} 
                  onRetry={msg.status === 'error' ? handleRetry : undefined}
                />
              ))}
              
              {isLoading && messages[messages.length - 1]?.isUser && <TypingIndicator />}
              
              <div ref={messagesEndRef} />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none"></div>
          </div>

          {/* Acciones rápidas */}
          {showQuickActions && messages.length <= 1 && (
            <QuickActions onSelect={handleQuickAction} disabled={isLoading} />
          )}

          {/* Formulario de entrada mejorado */}
          <form 
            onSubmit={(e) => sendMessage(undefined, e)} 
            className="p-4 border-t border-gray-200 bg-white/95 backdrop-blur-sm flex-shrink-0"
          >
            <div className="flex items-end space-x-2">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                  placeholder={isLoading ? "UROBOT está escribiendo..." : "Escribe tu consulta aquí..."}
                  className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 disabled:opacity-70 disabled:bg-gray-100"
                />
                
                {/* Indicador de caracteres */}
                {input.length > 0 && (
                  <span className="absolute right-3 bottom-3 text-xs text-gray-400">
                    {input.length}/500
                  </span>
                )}
              </div>
              
              {/* Botón de enviar */}
              <button
                type="submit"
                disabled={isLoading || !input.trim() || input.length > 500}
                className="p-3 rounded-2xl bg-gradient-to-r from-teal-500 to-teal-600 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                title="Enviar mensaje"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            
            {/* Disclaimer */}
            <p className="text-xs text-gray-400 text-center mt-2">
              UROBOT proporciona información general. Consulta siempre a un profesional médico.
            </p>
          </form>
        </div>
      </div>

      {/* Estilos CSS */}
      <style jsx global>{`
        /* Scrollbar personalizado */
        .custom-scrollbar::-webkit-scrollbar { 
          width: 6px; 
        }
        .custom-scrollbar::-webkit-scrollbar-track { 
          background: transparent; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: #cbd5e1; 
          border-radius: 3px; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { 
          background: #14b8a6; 
        }
        
        /* Animaciones optimizadas */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes glow {
          0% { box-shadow: 0 0 5px rgba(255,255,255,0.5); }
          50% { box-shadow: 0 0 15px rgba(255,255,255,0.8); }
          100% { box-shadow: 0 0 5px rgba(255,255,255,0.5); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out forwards;
        }
        
        .animate-glow {
          animation: glow 2s infinite;
        }
        
        /* Sombra 3D */
        .shadow-3xl {
          box-shadow: 
            0 0 0 1px rgba(0, 0, 0, 0.05),
            0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 35px 35px -5px rgba(0, 0, 0, 0.05);
        }
        
        /* Efecto de pulse mejorado */
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
        
        /* Efecto bounce para typing */
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-10px); }
        }
      `}</style>
    </>
  );
}