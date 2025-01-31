import fetch from 'node-fetch';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const handler = async (m, { text, conn }) => {
    if (!text) throw `🚩 Ingresa el nombre del video que deseas buscar en TikTok.\n\nEjemplo:\n> *${usedPrefix + command}* Paulo Londra`, m, rcanal)

    const searchQuery = encodeURIComponent(text);
    const apiUrl = `https://apis-starlights-team.koyeb.app/starlight/tiktoksearch?text=${searchQuery}`;

    try {
        const response = await fetch(apiUrl);
        const result = await response.json();

        if (result.status !== 200) throw 'Resultados no encontrados.';

        const videos = result.data;
        if (!videos.length) throw 'Resultados no encontrados.';

        const randomVideo = videos[Math.floor(Math.random() * videos.length)];

        const videoMessage = `
*» Título* : ${randomVideo.title}
*» Creador* : ${randomVideo.creator}
*» Vistas* : ${randomVideo.views}
*» Likes* : ${randomVideo.likes}
*» Comentarios* : ${randomVideo.comments}
        `;

        const videoUrl = randomVideo.nowm; 
        const videoPath = path.join(__dirname, 'video.mp4');

        const responseVideo = await axios({
            method: 'get',
            url: videoUrl,
            responseType: 'stream',
        });

        responseVideo.data.pipe(fs.createWriteStream(videoPath)).on('finish', async () => {
            const media = fs.readFileSync(videoPath);
            await conn.sendMessage(m.chat, { video: media, caption: videoMessage });

            fs.unlinkSync(videoPath);
        });
    } catch (error) {
        console.error(error);
        m.reply('Resultados no encontrados.');
    }
};

handler.command = ['tiktoksearch', 'tiktoks'];
handler.register = true

export default handler;
