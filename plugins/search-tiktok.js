
import axios from 'axios';
const baileys = (await import("@whiskeysockets/baileys")).default;
const { proto } = baileys;
const { generateWAMessageFromContent } = baileys;
const { generateWAMessageContent } = baileys;

let handler = async (message, { conn, text }) => {
    if (!text) {
        return conn.reply(message.chat, ' *驴Qu茅 video de TikTok quieres descargar?*', message);
    }
    async function createVideoMessage(url) {
        const { videoMessage } = await generateWAMessageContent(
            { video: { url } },
            { upload: conn.waUploadToServer }
        );
        return videoMessage;
    }
    try {
        const { data: response } = await axios.get(`https://rembotapi.vercel.app/api/tiktoksearch?text=${encodeURIComponent(text)}`);

        if (!response.status) {
            return conn.reply(message.chat, ' *No se pudo descargar el video de TikTok.*', message);
        }
        const videos = response.resultado; 
        if (videos.length < 4) {
            return conn.reply(message.chat, ' *No se encontraron suficientes videos.*', message);
        }
        const responseMessages = await Promise.all(videos.slice(0, 8).map(async (video) => {
            const videoMessage = await createVideoMessage(video.videoUrl);
            return {
                body: proto.Message.InteractiveMessage.Body.fromObject({
                    text: null
                }),
                footer: proto.Message.InteractiveMessage.Footer.fromObject({
                    text: `饾殐饾殥饾殱饾殲饾殨饾殬: ${video.description}`
                }),
                header: proto.Message.InteractiveMessage.Header.fromObject({
                    hasMediaAttachment: true,
                    videoMessage
                }),
                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                    buttons: []
                })
            };
        }));

        const carouselMessage = proto.Message.InteractiveMessage.CarouselMessage.fromObject({
            cards: responseMessages
        });

        const responseMessage = generateWAMessageFromContent(
            message.chat,
            {
                viewOnceMessage: {
                    message: {
                        messageContextInfo: {
                            deviceListMetadata: {},
                            deviceListMetadataVersion: 2
                        },
                        interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                            body: proto.Message.InteractiveMessage.Body.create({
                                text: null
                            }),
                            footer: proto.Message.InteractiveMessage.Footer.create({
                                text: ' `饾檹 饾檮 饾檰 饾檹 饾檴 饾檰  饾檸饾檧饾樇饾檷饾樉饾檭`'
                            }),
                            header: proto.Message.InteractiveMessage.Header.create({
                                title: null,
                                hasMediaAttachment: false
                            }),
                            carouselMessage
                        })
                    }
                }
            },
            { quoted: message }
        );

        await conn.relayMessage(message.chat, responseMessage.message, { messageId: responseMessage.key.id });

    } catch (error) {
        await conn.reply(message.chat, error.toString(), message);
    }
};

handler.help = ['tiktokdl <url>'];
handler.tags = ['downloader'];
handler.command = ['tiktoksearch','tts','ttsearch'];
handler.register = true

export default handler;
