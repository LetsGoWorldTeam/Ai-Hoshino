import {googleImage} from '@bochilteam/scraper';

const handler = async (m, {conn, text, usedPrefix, command}) => {
if (!text) return conn.reply(m.chat, `*🌙 Uso Correcto: ${usedPrefix + command} ${botname}*`, m, rcanal, );
await m.react(rwait)
const res = await googleImage(text);
const image = await res.getRandom();
const link = image;
const messages = [[${botname}, await res.getRandom(),
[[]], [[]], [[]], [[]]], [${botname}, await res.getRandom(), [[]], [[]], [[]], [[]]], [${botname}, await res.getRandom(), [[]], [[]], [[]], [[]]], [${botname}, await res.getRandom(), [[]], [[]], [[]], [[]]]]
await conn.sendCarousel(m.chat, `✨ Resultado de ${text}`, '🍃 Imagen - Descargas', null, messages, m);
await m.react(done)
};
handler.help = ['imagen <query>'];
handler.tags = ['img'];
handler.command = ['image', 'gimage', 'imagen'];
handler.register = true
export default handler;
