import fetch from 'node-fetch';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw '[ ✰ ] Ingresa el enlace del vídeo de *YouTube* junto al comando.\n\n`» Ejemplo :`\n' + `> *${usedPrefix + command}* https://youtu.be/NPpELzyP4rw`, m, rcanal)}

  await m.react('🕓');

  try {
    const apiKey = 'xenzpedo';
    const response = await fetch(`https://api.botcahx.eu.org/api/dowloader/yt?url=${encodeURIComponent(text)}&apikey=${apiKey}`);
    const result = await response.json();

    if (result.status && result.result && result.result.mp3) {
      await conn.sendMessage(
        m.chat,
        { 
          audio: { url: result.result.mp3 }, 
          mimetype: 'audio/mpeg' 
        },
        { quoted: m }
      );

      await m.react('✅');
    } else {
      throw new Error('Resultado no Encontrado.');
    }
  } catch (error) {
    await m.react('✖');
    m.reply(`Resultado no Encontrado. ${error.message || 'An unknown error occurred'}`);
  }
};

handler.help = ['ytmp3 *<link yt>*']
handler.tags = ['downloader']
handler.command = ['ytmp3', 'yta', 'fgmp3']

export default handler;
