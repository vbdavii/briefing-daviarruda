import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const summarizeMessage = async (
  name: string,
  category: string,
  originalMessage: string
): Promise<string> => {
  if (!apiKey) {
    console.warn("API Key is missing. Returning original message.");
    return originalMessage;
  }

  try {
    const prompt = `
      Atue como um assistente pessoal eficiente.
      Reescreva a seguinte mensagem de contato para um formato de lista resumida e profissional para WhatsApp.
      
      Dados do remetente:
      Nome: ${name}
      Categoria: ${category}
      
      Mensagem original:
      "${originalMessage}"
      
      Regras de formatação:
      - Use emojis adequados.
      - Mantenha o tom profissional mas direto.
      - O formato deve ser:
        *Novo Contato* 🔔
        👤 *Nome:* [Nome]
        📂 *Assunto:* [Categoria]
        📝 *Resumo:* [Resumo em tópicos ou parágrafo curto]
      
      Não adicione introduções ou conclusões fora desse formato.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text?.trim() || originalMessage;
  } catch (error) {
    console.error("Error summarizing message with Gemini:", error);
    return originalMessage;
  }
};