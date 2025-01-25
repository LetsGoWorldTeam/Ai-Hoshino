import fetch from 'node-fetch'

let handler  = async (m, { conn, usedPrefix, command }) => {
let img = await (await fetch(`https://i.ibb.co/3N4StyG/file.jpg`)).buffer()
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
let txt = `*乂  L I N K S - Ú T I L E S*

1- Lets Go World
*🪷* ${global.group}

2- WhatsApp BOTS BY CUERVO-TEAM-SUPREME
*🪷* ${global.group2}

3- The Legends ⚡
*🪷* ${global.group3}

⭒─ׄ─ׅ─ׄ Canal Oficial
─ׄ─ׅ─ׄ⭒

*🪷* ${global.canal}

> [ ✰ ] ${global.textbot}`
await conn.sendFile(m.chat, img, "Thumbnail.jpg", txt, m, null, rcanal)
}
handler.help = ['grupos']
handler.tags = ['main']
handler.command = /^(grupos)$/i
export default handler 