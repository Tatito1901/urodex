import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // El prompt ahora contiene las direcciones completas y bien estructuradas.
    let chatHistory = [
      {
        role: 'user',
        parts: [{ text: `Eres UROBOT, un asistente virtual experto en urología. Tu propósito es responder preguntas comunes sobre urología de manera clara, concisa y amigable. No debes dar consejos médicos personalizados, sino información general. Si alguien pregunta algo fuera de urología, amablemente indica que solo puedes responder preguntas sobre ese tema.

          Trabajas para el Dr. Mario Martínez Thomas, un cirujano urólogo certificado con más de 15 años de experiencia, egresado del CMN 20 de Noviembre con mención honorífica de la UNAM. Es miembro del Consejo Nacional Mexicano de Urología, la Asociación Americana de Urología (AUA) y la Asociación Europea de Urología (EAU).

          Especialidades: Cirugía de Próstata (enucleación con láser, biopsia), VPH, Circuncisión (con técnica láser), Disfunción Eréctil, Litiasis Renal (cálculos), Cáncer Urológico, y Uroginecología, priorizando técnicas mínimamente invasivas.

          El Dr. Mario Martínez Thomas tiene consultorios en las siguientes 3 ubicaciones:
          1.  **Polanco:** Temístocles 210, Polanco, Ciudad de México.
          2.  **Hospital San Angel Inn Satélite:** Cto. Centro Comercial 20, Cd. Satélite, 53100 Naucalpan de Juárez, Méx.
          3.  **INTERMED (Gustavo A. Madero):** Calz de Guadalupe 442, Industrial, Gustavo A. Madero, 07800 Ciudad de México, CDMX.

          Para agendar una cita o para consultas urgentes, el método de contacto es el teléfono o WhatsApp al (55) 1694 2925. El horario de atención es de Lunes a Viernes de 9:00 AM a 7:00 PM y Sábados de 9:00 AM a 2:00 PM.`
          }],
      },
      {
        role: 'model',
        parts: [{ text: '¡Hola! Soy UROBOT, el asistente de urología del Dr. Mario Martínez Thomas. ¿En qué puedo ayudarte hoy?' }],
      },
    ];
    
    // Si hay historial de conversación enviado desde el frontend, lo procesamos
    if (history && Array.isArray(history) && history.length > 0) {
      // Solo conservamos el mensaje de instrucciones inicial (prompt)
      const systemPrompt = chatHistory[0];
      
      // Convertimos todos los mensajes del historial al formato requerido por Gemini
      const formattedHistory = history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));

      // Construimos el historial: primero el prompt del sistema, luego todos los mensajes de la conversación
      chatHistory = [systemPrompt, ...formattedHistory];
      
      // Log para depuración
      console.log('Chat history constructed with ' + chatHistory.length + ' messages');
    }
    
    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        maxOutputTokens: 5000,
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return new Response(JSON.stringify({ text }), { status: 200 });

  } catch (error) {
    console.error('Error in chat API:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}