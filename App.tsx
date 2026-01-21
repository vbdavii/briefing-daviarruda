import React, { useState } from 'react';
import { FormInput } from './components/FormInput';
import { Button } from './components/Button';
import { FormData, FormErrors, SERVICE_TYPES, LOGO_OPTIONS } from './types';

const DESTINATION_NUMBER = '5511936200509';

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    segment: '',
    location: '',
    serviceType: SERVICE_TYPES[0],
    whatsapp: '',
    email: '',
    hours: '',
    tagline: '',
    services: '',
    differential: '',
    hasLogo: LOGO_OPTIONS[0],
    colors: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.companyName.trim()) newErrors.companyName = 'Nome da empresa é obrigatório';
    if (!formData.whatsapp.trim()) newErrors.whatsapp = 'WhatsApp é obrigatório';
    if (!formData.services.trim()) newErrors.services = 'Serviços são obrigatórios';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendToWhatsApp = (text: string) => {
    const url = `https://wa.me/${DESTINATION_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsProcessing(true);

    try {
      const finalMessage = `Olá, realizei a assinatura da minha estrutura e preenchi o formulário. Aqui estão os resultados:

*1. Nome da Empresa:*
${formData.companyName}

*2. Segmento:*
${formData.segment}

*3. Cidade/Estado:*
${formData.location}

*4. Tipo de Atendimento:*
${formData.serviceType}

*5. WhatsApp:*
${formData.whatsapp}

*6. E-mail:*
${formData.email}

*7. Horário:*
${formData.hours}

*8. O que faz (1 frase):*
${formData.tagline}

*9. Principais Serviços:*
${formData.services}

*10. Diferencial:*
${formData.differential}

*11. Possui Logotipo?*
${formData.hasLogo}

*12. Cores Preferidas:*
${formData.colors}`;

      sendToWhatsApp(finalMessage);
      
    } catch (error) {
      console.error("Erro ao enviar", error);
      alert("Ocorreu um erro ao processar.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-black">
      
      <div className="w-full max-w-2xl bg-black rounded-2xl shadow-2xl overflow-hidden border border-neutral-800">
        
        {/* Header - Dark Gray Background */}
        <div className="bg-neutral-950 px-8 py-10 text-white text-center border-b border-neutral-800">
          <div className="flex justify-center mb-6">
            <img 
              src="https://i.ibb.co/1YsZ3JNG/icon-y-w.png" 
              alt="Logo" 
              className="h-20 w-auto object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold mb-2 text-white">Briefing Inicial</h1>
          <p className="text-neutral-400 text-sm">Preencha os dados abaixo para iniciarmos a configuração da sua estrutura.</p>
        </div>

        {/* Form - Black Background */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          
          <div className="space-y-6">
            <h2 className="text-xs uppercase tracking-widest text-neutral-500 font-bold border-b border-neutral-800 pb-2">Sobre a Empresa</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput 
                  label="1. Nome da empresa (como no site)" 
                  name="companyName" 
                  value={formData.companyName}
                  onChange={handleChange}
                  error={errors.companyName}
                  placeholder="Ex: Tech Solutions"
              />
              <FormInput 
                  label="2. Segmento / Nicho" 
                  name="segment" 
                  value={formData.segment}
                  onChange={handleChange}
                  placeholder="Ex: Odontologia, Moda..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput 
                  label="3. Cidade e Estado" 
                  name="location" 
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Ex: São Paulo - SP"
              />
              <FormInput 
                  label="4. Tipo de Atendimento" 
                  name="serviceType"
                  as="select"
                  options={SERVICE_TYPES}
                  value={formData.serviceType}
                  onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xs uppercase tracking-widest text-neutral-500 font-bold border-b border-neutral-800 pb-2 mt-8">Contato e Horários</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput 
                  label="5. WhatsApp Principal (com DDD)" 
                  name="whatsapp" 
                  type="tel"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  error={errors.whatsapp}
                  placeholder="(00) 00000-0000"
              />
              <FormInput 
                  label="6. E-mail de Contato" 
                  name="email" 
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="contato@empresa.com"
              />
            </div>
            
            <FormInput 
                label="7. Horário de Atendimento" 
                name="hours" 
                value={formData.hours}
                onChange={handleChange}
                placeholder="Ex: Seg a Sex das 9h às 18h"
            />
          </div>

          <div className="space-y-6">
            <h2 className="text-xs uppercase tracking-widest text-neutral-500 font-bold border-b border-neutral-800 pb-2 mt-8">Detalhes do Negócio</h2>

            <FormInput 
                label="8. Em uma frase: o que sua empresa faz?" 
                name="tagline" 
                value={formData.tagline}
                onChange={handleChange}
                placeholder="Ex: Ajudamos pessoas a sorrir com mais confiança."
            />

            <FormInput 
                label="9. Principais serviços ou soluções?" 
                name="services" 
                as="textarea"
                value={formData.services}
                onChange={handleChange}
                error={errors.services}
                placeholder="Liste os principais serviços..."
            />

            <FormInput 
                label="10. Diferencial / Tempo de mercado" 
                name="differential" 
                as="textarea"
                className="min-h-[80px]"
                value={formData.differential}
                onChange={handleChange}
                placeholder="Ex: Atendimento humanizado, 10 anos de mercado..."
            />
          </div>

          <div className="space-y-6">
            <h2 className="text-xs uppercase tracking-widest text-neutral-500 font-bold border-b border-neutral-800 pb-2 mt-8">Identidade Visual</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput 
                  label="11. Possui Logotipo?" 
                  name="hasLogo" 
                  as="select"
                  options={LOGO_OPTIONS}
                  value={formData.hasLogo}
                  onChange={handleChange}
              />
              <FormInput 
                  label="12. Cores preferidas para o site" 
                  name="colors" 
                  value={formData.colors}
                  onChange={handleChange}
                  placeholder="Ex: Azul marinho e Branco"
              />
            </div>
          </div>

          <div className="pt-6">
            <Button 
              type="submit" 
              isLoading={isProcessing}
              variant="primary"
              className="bg-green-600 hover:bg-green-700 text-lg py-4 border border-green-500/30"
              icon={
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-8.68-2.031-.967-.272-.099-.47-.149-.669.198-.198.347-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              }
            >
              Enviar Respostas
            </Button>
            <p className="text-center text-xs text-neutral-500 mt-4">
               Ao clicar, seu WhatsApp será aberto com as respostas preenchidas.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;