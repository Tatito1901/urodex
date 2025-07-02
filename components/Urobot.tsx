import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  memo,
  useMemo,
} from "react";
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';

// Custom slower animations
const customAnimationStyles = `
@keyframes pulse-slow {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10%); }
}

.animate-pulse-slow {
  animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-bounce-slow {
  animation: bounce-slow 2s ease-in-out infinite;
}
`;

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

// --- HOOKS OPTIMIZADOS ---
const useAutoScroll = (dependency: any[]) => {
  const endRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 50);
    return () => clearTimeout(timer);
  }, dependency);
  
  return endRef;
};

const useTypingAnimation = (text: string, isTyping: boolean, speed: number = 8) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    if (!isTyping) {
      setDisplayedText(text);
      return;
    }
    
    let i = 0;
    setDisplayedText('');
    
    const chunkSize = text.length > 200 ? 3 : text.length > 100 ? 2 : 1;
    const adjustedSpeed = text.length > 300 ? speed / 2 : speed;
    
    const timer = setInterval(() => {
      if (i < text.length) {
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

const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  
  // Cargar mensajes al montar el componente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = sessionStorage.getItem('urobotMessages');
        if (saved) {
          const parsed = JSON.parse(saved);
          setMessages(parsed);
        }
      } catch (error) {
        console.error("Error loading messages:", error);
      }
    }
  }, []);

  // Guardar mensajes cuando cambien
  useEffect(() => {
    if (typeof window !== 'undefined' && messages.length > 0) {
      try {
        sessionStorage.setItem('urobotMessages', JSON.stringify(messages));
      } catch (error) {
        console.error("Error saving messages:", error);
      }
    }
  }, [messages]);

  return [messages, setMessages] as const;
};

// --- COMPONENTES OPTIMIZADOS ---

const Avatar = memo(({ isUser, isTyping }: { isUser: boolean; isTyping?: boolean }) => (
  <div className={`
    h-9 w-9 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-200
    ${isUser 
      ? 'bg-gradient-to-br from-teal-500 to-teal-600 text-white' 
      : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600'
    }
    ${isTyping ? "animate-pulse-slow" : ""}
  `}>
    {isUser ? (
      <span className="text-xs font-semibold">Tú</span>
    ) : (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    )}
  </div>
));
Avatar.displayName = 'Avatar';

const MessageStatus = memo(({ status }: { status?: Message['status'] }) => {
  if (!status || status === 'sent') return null;
  
  return (
    <span className="ml-2 text-xs">
      {status === 'sending' && <span className="text-gray-400">⏳</span>}
      {status === 'error' && <span className="text-red-500">❌</span>}
    </span>
  );
});
MessageStatus.displayName = 'MessageStatus';

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

  const markdownComponents = useMemo(() => ({
    h1: ({node, ...props}: any) => <h1 {...props} className="text-lg font-bold my-2 text-gray-900" />,
    h2: ({node, ...props}: any) => <h2 {...props} className="text-base font-bold my-2 text-gray-900" />,
    a: ({ node, ...props }: any) => (
      <a
        {...props}
        target="_blank"
        rel="noreferrer noopener"
        className="text-teal-600 hover:text-teal-700 underline transition-colors"
      />
    ),
    ul: ({ node, ...props }: any) => (
      <ul {...props} className="list-disc ml-4 my-2 space-y-1" />
    ),
    ol: ({ node, ...props }: any) => (
      <ol {...props} className="list-decimal ml-4 my-2 space-y-1" />
    ),
    code: ({ node, inline, ...props }: any) => {
      return inline ? (
        <code {...props} className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-teal-700" />
      ) : (
        <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg my-2 overflow-x-auto">
          <code {...props} className="font-mono text-sm" />
        </pre>
      );
    }
  }), []);

  return (
    <div className={`flex mb-4 ${message.isUser ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-2 duration-300`}>
      {!message.isUser && <Avatar isUser={false} isTyping={message.isTyping} />}
      
      <div className={`mx-2 relative group max-w-[85%] lg:max-w-2xl`}>
        <div className={`
          p-3 rounded-2xl transition-all duration-200
          ${message.isUser
            ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-tr-md"
            : "bg-white text-gray-900 border border-gray-200 rounded-tl-md shadow-sm hover:shadow-md"
          }
          ${message.status === 'error' ? 'border-red-300 bg-red-50' : ''}
        `}>
          {/* Contenido del mensaje */}
          {message.isUser ? (
            <div className="break-words">
              {displayedText}
              <MessageStatus status={message.status} />
            </div>
          ) : (
            <div className="prose prose-sm max-w-none">
              {message.isTyping ? (
                <div className="flex items-center space-x-2">
                  <span className="text-gray-700">{displayedText}</span>
                  {displayedText.length < message.text.length && (
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce-slow" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce-slow" style={{ animationDelay: '1s' }}></div>
                      <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce-slow" style={{ animationDelay: '2s' }}></div>
                    </div>
                  )}
                </div>
              ) : (
                <ReactMarkdown
                  rehypePlugins={[rehypeSanitize]}
                  components={markdownComponents}
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
            <span className="text-xs">{message.timestamp}</span>
            
            {/* Botones de acción */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-1">
              {!message.isUser && (
                <button
                  onClick={handleCopy}
                  className="p-1 rounded hover:bg-gray-100 transition-colors"
                  title="Copiar mensaje"
                >
                  {copied ? (
                    <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-3 h-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                  <svg className="w-3 h-3 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {message.isUser && <Avatar isUser={true} />}
    </div>
  );
});
MessageItem.displayName = 'MessageItem';

const TypingIndicator = memo(() => (
  <div className="flex mb-4 justify-start animate-in slide-in-from-bottom-2 duration-300">
    <Avatar isUser={false} isTyping={true} />
    <div className="ml-2 bg-white p-3 rounded-2xl rounded-tl-md border border-gray-200 shadow-sm">
      <div className="flex items-center space-x-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce-slow"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce-slow" style={{ animationDelay: '1s' }}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce-slow" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  </div>
));
TypingIndicator.displayName = 'TypingIndicator';

const QuickActions = memo(({ 
  onSelect, 
  disabled 
}: { 
  onSelect: (text: string) => void;
  disabled: boolean;
}) => (
  <div className="p-4 border-t border-gray-100 bg-gray-50/50">
    <p className="text-sm text-gray-600 mb-3 font-medium">Preguntas frecuentes:</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {quickActions.map((action) => (
        <button
          key={action.id}
          onClick={() => onSelect(action.text)}
          disabled={disabled}
          className="flex items-center space-x-2 p-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 hover:bg-teal-50 hover:border-teal-300 hover:text-teal-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-left"
        >
          <span>{action.icon}</span>
          <span>{action.text}</span>
        </button>
      ))}
    </div>
  </div>
));
QuickActions.displayName = 'QuickActions';

const EmptyState = memo(({ onSelect }: { onSelect: (text: string) => void }) => (
  <div className="flex-1 flex items-center justify-center p-6">
    <div className="text-center max-w-md">
      <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">¡Hola! Soy UROBOT</h3>
      <p className="text-gray-600 mb-6">Tu asistente urológico especializado. Pregúntame sobre síntomas, tratamientos o cualquier duda de salud urológica.</p>
      <QuickActions onSelect={onSelect} disabled={false} />
    </div>
  </div>
));
EmptyState.displayName = 'EmptyState';

// --- COMPONENTE PRINCIPAL ---
export default function Urobot({ 
  isOpen, 
  setIsOpen 
}: { 
  isOpen: boolean; 
  setIsOpen: (value: boolean) => void;
}) {
  // Add custom animation styles
  useEffect(() => {
    // Add styles to head once
    const styleEl = document.createElement('style');
    styleEl.textContent = customAnimationStyles;
    document.head.appendChild(styleEl);
    
    return () => {
      // Clean up when component unmounts
      document.head.removeChild(styleEl);
    };
  }, []);
  const [messages, setMessages] = useMessages();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  const abortCtrl = useRef<AbortController | null>(null);
  const messagesEndRef = useAutoScroll([messages]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus en input cuando se abre
  useEffect(() => {
    if (isOpen && inputRef.current) {
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Mostrar tooltip después de 3 segundos si no está abierto
  useEffect(() => {
    if (!isOpen && !isHovering) {
      const timer = setTimeout(() => {
        setShowTooltip(true);
      }, 3000);
      
      return () => clearTimeout(timer);
    } else {
      setShowTooltip(false);
    }
  }, [isOpen, isHovering]);

  // Auto-ocultar tooltip después de 5 segundos
  useEffect(() => {
    if (showTooltip) {
      const timer = setTimeout(() => {
        setShowTooltip(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [showTooltip]);

  // Limpieza del AbortController
  useEffect(() => {
    return () => abortCtrl.current?.abort();
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const clearChat = useCallback(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('urobotMessages');
    }
    setMessages([]);
  }, [setMessages]);

  const handleRetry = useCallback((message: Message) => {
    const messageIndex = messages.findIndex(m => m.id === message.id);
    if (messageIndex > 0) {
      const userMessage = messages[messageIndex - 1];
      if (userMessage.isUser) {
        setMessages(prev => prev.filter((_, index) => index < messageIndex - 1));
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

      // Actualizar estado del mensaje
      setTimeout(() => {
        setMessages(prev => prev.map(m => 
          m.id === userMsg.id ? { ...m, status: 'sent' } : m
        ));
      }, 200);

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
        
        // Quitar estado de typing
        const typingDuration = Math.min(data.text.length * 8, 1500) + 200;
        setTimeout(() => {
          setMessages(prev => prev.map(m => 
            m.id === botMsg.id ? { ...m, isTyping: false } : m
          ));
        }, typingDuration);

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
    [input, isLoading, messages, setMessages]
  );

  const handleQuickAction = useCallback((text: string) => {
    setInput(text);
    sendMessage(text);
  }, [sendMessage]);

  // Verificar si hay actividad (bot escribiendo o cargando)
  const hasActivity = isLoading || messages.some(msg => msg.isTyping);
  
  // Botón flotante cuando está cerrado
  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        {/* Tooltip animado */}
        <div className={`absolute bottom-full right-0 mb-3 transition-all duration-300 ${
          showTooltip ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}>
          <div className="relative bg-white rounded-lg shadow-lg border border-gray-200 px-4 py-2 min-w-max">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">UROBOT está activo</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">¡Haz clic para empezar a chatear!</p>
            
            {/* Flecha del tooltip */}
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white"></div>
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-200 translate-y-px"></div>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="group bg-gradient-to-r from-teal-500 to-teal-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95"
          aria-label="Abrir chat de UROBOT"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          
          {/* Indicador de estado - solo parpadea cuando hay actividad */}
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            {hasActivity && (
              <span className="animate-pulse-slow absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            )}
            <span className={`relative inline-flex rounded-full h-3 w-3 border-2 border-white shadow-sm transition-colors duration-200 ${
              hasActivity ? 'bg-green-500' : 'bg-gray-400'
            }`}></span>
          </span>
        </button>
      </div>
    );
  }

  // Chat abierto
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <div
        className="bg-white w-full h-full flex flex-col overflow-hidden 
                   sm:max-w-2xl sm:h-[85vh] sm:max-h-[700px] sm:rounded-2xl 
                   shadow-2xl animate-in zoom-in-95 duration-300"
        role="dialog"
        aria-modal="true"
        aria-labelledby="chat-title"
      >
        {/* Header simplificado */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white p-4 flex justify-between items-center flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <h2 id="chat-title" className="text-lg font-bold">UROBOT</h2>
              <p className="text-sm text-teal-100">Asistente Urológico</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {messages.length > 0 && (
              <button 
                onClick={clearChat}
                className="p-2 rounded-full hover:bg-white/10 transition-colors" 
                title="Limpiar chat"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
            <button 
              onClick={handleClose} 
              className="p-2 rounded-full hover:bg-white/10 transition-colors" 
              aria-label="Cerrar chat"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Área de mensajes */}
        {messages.length === 0 ? (
          <EmptyState onSelect={handleQuickAction} />
        ) : (
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50/30">
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
        )}

        {/* Formulario de entrada */}
        <form 
          onSubmit={(e) => sendMessage(undefined, e)} 
          className="p-4 border-t border-gray-200 bg-white flex-shrink-0"
        >
          <div className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                placeholder={isLoading ? "UROBOT está escribiendo..." : "Escribe tu consulta..."}
                className="w-full py-3 px-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-100 disabled:opacity-70"
                maxLength={500}
              />
              
              {input.length > 0 && (
                <span className={`absolute right-3 bottom-3 text-xs ${input.length > 450 ? 'text-red-500' : 'text-gray-400'}`}>
                  {input.length}/500
                </span>
              )}
            </div>
            
            <button
              type="submit"
              disabled={isLoading || !input.trim() || input.length > 500}
              className="p-3 rounded-2xl bg-gradient-to-r from-teal-500 to-teal-600 text-white transition-all duration-200 hover:from-teal-600 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
              aria-label="Enviar mensaje"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          
          <p className="text-xs text-gray-500 text-center mt-2">
            UROBOT proporciona información general. Consulta siempre a un profesional médico.
          </p>
        </form>
      </div>
    </div>
  );
}