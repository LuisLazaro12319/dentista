import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Phone,
  Clock,
  ExternalLink,
  Settings,
  Sparkles,
  CheckCheck,
  Calendar,
} from 'lucide-react';
import { ChatMessage } from '../types/dental';
import { CLINIC_INFO, INITIAL_CHAT_MESSAGES } from '../data/mockDentalData';

interface WhatsAppChatWidgetProps {
  onOpenBooking: () => void;
}

export const WhatsAppChatWidget: React.FC<WhatsAppChatWidgetProps> = ({ onOpenBooking }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState(CLINIC_INFO.whatsappNumber);
  const [showConfig, setShowConfig] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');

    // Trigger clinic response
    setIsTyping(true);
    setTimeout(() => {
      let replyText = '¡Muchas gracias por tu mensaje! Para darte una respuesta detallada e inmediata, te atendemos directamente por WhatsApp con nuestro equipo.';
      let replyOptions: string[] | undefined = undefined;

      const lower = text.toLowerCase();
      if (lower.includes('cita') || lower.includes('reservar') || lower.includes('hora')) {
        replyText = 'Puedes agendar tu cita 100% online en nuestro sistema de reserva en solo 1 minuto, o si lo prefieres, podemos coordinarla ahora mismo por WhatsApp.';
        replyOptions = ['🗓️ Abrir sistema de citas web', '💬 Seguir por WhatsApp'];
      } else if (lower.includes('urgencia') || lower.includes('dolor') || lower.includes('muela')) {
        replyText = '🚨 Si sientes dolor agudo o has sufrido una rotura dental, atendemos urgencias prioritarias en el día. Te recomendamos contactarnos de inmediato por WhatsApp o llamar al 900 890 123.';
      } else if (lower.includes('ortodoncia') || lower.includes('invisalign') || lower.includes('alineador')) {
        replyText = 'En NovaSmile contamos con escaneado 3D iTero gratuito en tu 1ª consulta para simular tu sonrisa antes de empezar. Los tratamientos de ortodoncia invisible parten desde 1.890€ con financiación hasta 24 meses sin intereses.';
      } else if (lower.includes('precio') || lower.includes('presupuesto') || lower.includes('financi')) {
        replyText = 'Ofrecemos 1ª visita y radiografía panorámica de diagnóstico 100% sin coste. Además, disponemos de financiación a tu medida al 0% de interés hasta 24 meses.';
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'clinic',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        options: replyOptions,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 800);
  };

  const getDirectWhatsAppUrl = (customText?: string) => {
    const text = customText || inputValue || 'Hola NovaSmile, me pongo en contacto desde su página web para consultar sobre...';
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const handleOptionClick = (option: string) => {
    if (option.includes('Abrir sistema de citas') || option.includes('Reservar una cita')) {
      onOpenBooking();
      setIsOpen(false);
    } else {
      handleSendMessage(option);
    }
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
        {!isOpen && (
          <div className="hidden sm:flex items-center gap-2 bg-white text-slate-800 text-xs font-medium py-1.5 px-3.5 rounded-full shadow-md border border-slate-200 animate-fade-in pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            <span>¿Dudas? Chatea con nosotros por WhatsApp</span>
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-center rounded-full shadow-lg transition-all duration-200 cursor-pointer ${
            isOpen
              ? 'w-12 h-12 bg-slate-800 text-white hover:bg-slate-900'
              : 'w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white hover:scale-105 ring-4 ring-emerald-500/20'
          }`}
          aria-label={isOpen ? 'Cerrar chat de WhatsApp' : 'Abrir chat de WhatsApp'}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <svg
              className="w-8 h-8 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          )}
        </button>
      </div>

      {/* WhatsApp Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[380px] max-h-[580px] h-[550px] bg-slate-50 rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header styled like WhatsApp */}
          <div className="bg-[#075E54] text-white p-3.5 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm text-white">
                  NS
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#075E54]" />
              </div>
              <div>
                <h4 className="text-sm font-bold leading-tight">NovaSmile Dental</h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span>Laura · Atención al Paciente</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setShowConfig(!showConfig)}
                title="Configuración de número"
                className="p-1.5 text-emerald-100 hover:text-white rounded-md transition-colors"
              >
                <Settings className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-emerald-100 hover:text-white rounded-md transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick config banner (collapsible) */}
          {showConfig && (
            <div className="bg-slate-100 border-b border-slate-200 p-2.5 text-xs text-slate-700">
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Número de WhatsApp para enlaces directos:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="34600123456"
                  className="w-full px-2 py-1 text-xs border rounded bg-white font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowConfig(false)}
                  className="px-2.5 py-1 bg-slate-800 text-white rounded text-[11px] font-medium"
                >
                  Guardar
                </button>
              </div>
            </div>
          )}

          {/* WhatsApp Encrypted Security Notice */}
          <div className="py-1.5 px-3 bg-amber-50 text-amber-800 text-[10px] text-center border-b border-amber-100 flex items-center justify-center gap-1">
            <span>🔒 Las consultas médicas son confidenciales. Horario de atención: 08:30 - 20:30h.</span>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-[#E5DDD5]/30">
            {messages.map((msg) => {
              const isClinic = msg.sender === 'clinic';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isClinic ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg p-3 text-xs leading-relaxed shadow-xs ${
                      isClinic
                        ? 'bg-white text-slate-800 rounded-tl-none'
                        : 'bg-[#DCF8C6] text-slate-900 rounded-tr-none'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                    <div className="flex items-center justify-end gap-1 text-[10px] text-slate-400 mt-1">
                      <span>{msg.time}</span>
                      {!isClinic && <CheckCheck className="w-3.5 h-3.5 text-sky-600" />}
                    </div>
                  </div>

                  {/* Quick Options / Buttons */}
                  {msg.options && msg.options.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                      {msg.options.map((opt, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleOptionClick(opt)}
                          className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-sky-50 hover:text-sky-800 hover:border-sky-300 text-[11px] font-medium transition-all shadow-2xs text-left"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-2 bg-white rounded-lg w-fit text-[11px] text-slate-500 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                <span className="ml-1">Laura está escribiendo...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Primary WhatsApp Link Button */}
          <div className="px-3 py-1.5 bg-slate-100 border-t border-slate-200 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">¿Prefieres chatear en tu app?</span>
            <a
              href={getDirectWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 hover:text-emerald-800"
            >
              <span>Abrir WhatsApp Web / App</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Input Bar */}
          <div className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              placeholder="Escribe tu consulta aquí..."
              className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-full focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <button
              type="button"
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim()}
              className="p-2 rounded-full bg-[#075E54] text-white hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              aria-label="Enviar mensaje"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
